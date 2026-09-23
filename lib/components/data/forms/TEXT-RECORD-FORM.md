# CWMSTextRecordForm

Use this form when one submission should append a complete application-defined JSON object to a CWMS Text time series. Existing CWMSInput, CWMSDropdown and CWMSTextarea fields register named values; they need no numeric time-series binding.

```jsx
<CWMSTextRecordForm
  office="SWT"
  cdaUrl={cdaUrl}
  tsid="Example.Text-Record.Inst.0.0.Operations"
  showCalendar={false}
  resetOnSubmit={false}
  prepareRecord={(fields) => ({
    dateTime: new Date().toISOString(),
    value: { schemaVersion: 1, id: crypto.randomUUID(), fields },
  })}
  beforeStore={async (record) => {
    // Optional: check current state or recognize this UUID after a lost response.
    // Return false only when this exact record has already been stored.
    return true;
  }}
  onSaved={(record) => refreshView(record)}
  onError={(error) => showError(error.message)}
>
  <CWMSInput name="notes" required />
</CWMSTextRecordForm>
```

Requires the existing AuthProvider. Uses its current token and includes cookies.
The caller owns schema validation, timezone conversion, permissions, inventory, and concurrency policy. prepareRecord returns an effective timestamp and JSON object.
Objects are limited to 16 KB UTF-8; top-level arrays/primitives are rejected.
The helper posts one regular-text-values row to CDA with replace-all=false and UTC, with no numeric inference or automatic retry. On an unchanged retry, the mounted form reuses the prepared record so beforeStore can recognize a receipt. Changing fields produces a new record; after an uncertain response, reconcile existing records before changing the submission.

onSaved runs after successful storage and should handle refresh errors itself. Do not tell users a completed write failed merely because a follow-up refresh failed. The generic form cannot guarantee idempotency across remounts or provide atomic compare-and-swap; these require application/server support.

appendCwmsTextRecord and readCwmsTextRecords can also be used directly. The reader requires complete inline JSON values and fails on malformed or indirect text records rather than silently omitting them. Supply the full needed read window. This is suitable for small application records, not arbitrary large CLOB documents. Do not use it on a mixed numeric/text series or overwrite unrelated series.
