import { CWMS_USER_ROLE_DESCRIPTIONS } from "../roleDescriptions";

describe("CWMS user role descriptions", () => {
  it("includes definitions copied from cwms-database", () => {
    expect(CWMS_USER_ROLE_DESCRIPTIONS["Data Acquisition Mgr"]).toContain(
      "data streams and time series identifiers",
    );
    expect(CWMS_USER_ROLE_DESCRIPTIONS["SHOW STACK TRACE"]).toContain(
      "explicitly enabled debug responses",
    );
    expect(CWMS_USER_ROLE_DESCRIPTIONS["TS ID Creator"]).toContain(
      "does not automatically give the user read or write access",
    );
  });
});
