import { matchCwmsUserRolePreset, resolveCwmsUserRolePreset } from "../rolePresets";

describe("CWMS user role presets", () => {
  const catalog = [
    "All Users",
    "CWMS Users",
    "TS ID Creator",
    "CWMS User Admins",
    "CCP Mgr",
  ];

  it("resolves the same read-only, read/write, and admin groups as cwms-cli", () => {
    expect(resolveCwmsUserRolePreset("readonly", catalog).roles).toEqual([
      "All Users",
      "CWMS Users",
    ]);
    expect(resolveCwmsUserRolePreset("readwrite", catalog).roles).toEqual([
      "All Users",
      "CWMS Users",
      "TS ID Creator",
    ]);
    expect(resolveCwmsUserRolePreset("admin", catalog).roles).toEqual([
      "All Users",
      "CWMS Users",
      "TS ID Creator",
      "CWMS User Admins",
    ]);
  });

  it("reports preset roles that are not in the CDA catalog", () => {
    expect(resolveCwmsUserRolePreset("readwrite", ["All Users", "CWMS Users"])).toEqual(
      {
        roles: ["All Users", "CWMS Users"],
        unavailableRoles: ["TS ID Creator"],
      },
    );
  });

  it("matches only exact preset configurations", () => {
    expect(matchCwmsUserRolePreset(["CWMS Users", "All Users"])).toBe("readonly");
    expect(matchCwmsUserRolePreset(["All Users", "CWMS Users", "CCP Mgr"])).toBeNull();
  });
});
