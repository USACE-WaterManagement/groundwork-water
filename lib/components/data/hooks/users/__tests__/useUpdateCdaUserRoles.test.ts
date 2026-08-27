import { diffCdaUserRoles } from "../useUpdateCdaUserRoles";

describe("diffCdaUserRoles", () => {
  it("returns only additions and removable roles", () => {
    expect(
      diffCdaUserRoles(
        ["All Users", "CWMS Users", "CCP Mgr"],
        ["All Users", "CWMS Users", "TS ID Creator"],
      ),
    ).toEqual({ additions: ["TS ID Creator"], removals: ["CCP Mgr"] });
  });

  it("never attempts to remove the protected All Users role", () => {
    expect(diffCdaUserRoles(["All Users", "CWMS Users"], ["CWMS Users"])).toEqual({
      additions: [],
      removals: [],
    });
  });
});
