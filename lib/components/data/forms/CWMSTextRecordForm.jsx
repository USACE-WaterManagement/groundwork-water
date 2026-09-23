import React, { useRef } from "react";
import { CWMSForm } from "./CWMSForm";
import { useAuth } from "../utilities/auth/useAuth";
import { appendCwmsTextRecord, serializeCwmsTextRecord } from "./helpers/textRecords";

/**
 * Collect named CWMS fields and append one application-defined JSON text record.
 * prepareRecord returns { dateTime, value }. beforeStore can return false when
 * an application confirms this exact event was already persisted after a lost
 * response. The prepared record is reused on an unchanged retry.
 */
export function CWMSTextRecordForm({
  office,
  cdaUrl,
  tsid,
  prepareRecord,
  beforeStore,
  onSaved,
  children,
  ...formProps
}) {
  const auth = useAuth();
  const pending = useRef(null);
  return (
    <CWMSForm
      {...formProps}
      office={office}
      cdaUrl={cdaUrl}
      submissionMode="custom"
      onSubmit={async (fields) => {
        const fingerprint = JSON.stringify([office, tsid, fields]);
        if (pending.current?.fingerprint !== fingerprint) {
          const record = await prepareRecord(fields);
          serializeCwmsTextRecord(record.value);
          pending.current = { fingerprint, record };
        }
        const record = pending.current.record;
        const shouldStore = beforeStore ? await beforeStore(record) : true;
        if (shouldStore !== false)
          await appendCwmsTextRecord({
            office,
            cdaUrl,
            tsid,
            token: auth?.token,
            ...record,
          });
        pending.current = null;
        await onSaved?.(record);
        return record;
      }}
    >
      {children}
    </CWMSForm>
  );
}
