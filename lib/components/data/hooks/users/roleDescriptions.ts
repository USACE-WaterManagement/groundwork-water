/**
 * CWMS role descriptions from cwms-database's `cwms_sec_user_groups` seed data.
 *
 * TODO: Replace this map with descriptions returned by CDA when the roles endpoint
 * exposes `user_group_desc`.
 */
export const CWMS_USER_ROLE_DESCRIPTIONS: Readonly<Record<string, string>> = {
  "CWMS DBA Users":
    "Super CWMS Users - able to assign privileges and read/write to all objects in the database.",
  "CWMS PD Users": "Users that can write to all objects in the database.",
  "Data Exchange Mgr": "Users that will be editing/adding data exchange sets.",
  "Data Acquisition Mgr":
    "Users that will be editing/changing/managing data streams and time series identifiers.",
  "TS ID Creator":
    "Users that can add a time series identifier. This privilege does not automatically give the user read or write access to the newly created time series identifier.",
  "VT Mgr": "Users that will manage the validation/alarms/transformation of data.",
  "SHOW STACK TRACE":
    "Users allowed to receive server stack traces in explicitly enabled debug responses.",
  "CWMS User Admins": "User who administrates CWMS Users.",
  "All Users": "General CWMS Users.",
  "CWMS Users": "Routine CWMS Users.",
  "Viewer Users": "Limited Access CWMS Users.",
  "CCP Proc":
    "Intended for service accounts that run CCP daemon services in the background, such as compproc.",
  "CCP Mgr":
    "Users that manage, add, or modify CCP computations. This privilege is intended for real people and user accounts.",
  "CCP Reviewer": "Users allowed to review an office's CCP computations read-only.",
  "RDL Reviewer": "Users allowed to review an office's RDL configurations read-only.",
  "RDL Mgr": "Users that manage, add, or modify RDL configurations.",
};
