import { createContext } from "react";

/**
 * Shared context for CWMSForm and its inputs.
 *
 * Lives in its own module so hooks that inputs consume (e.g. the nearest-value
 * orchestrator) can read the context without importing CWMSForm, which would
 * create a circular import.
 *
 * Re-exported from CWMSForm for backwards compatibility - `import { FormContext }
 * from "../CWMSForm"` keeps working.
 */
export const FormContext = createContext();

export default FormContext;
