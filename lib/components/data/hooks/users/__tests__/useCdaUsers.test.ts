import { fetchAllCdaUsers } from "../useCdaUsers";

describe("fetchAllCdaUsers", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("loads every CDA page for an office and requests roles", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            users: [
              {
                "user-name": "FIRST",
                principal: "first",
                email: "first@example.com",
                roles: { SWT: ["CWMS Users"] },
              },
            ],
            "next-page": "next-token",
            total: 2,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            users: [
              {
                "user-name": "SECOND",
                principal: "second",
                email: "second@example.com",
                roles: { SWT: ["CWMS User Admins"] },
              },
            ],
            "next-page": null,
            total: 2,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
      );
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchAllCdaUsers({
      office: "SWT",
      cdaUrl: "https://example.test/cwms-data/",
      token: "test-token",
      pageSize: 1,
    });

    expect(result.users.map((user) => user["user-name"])).toEqual(["FIRST", "SECOND"]);
    expect(result.total).toBe(2);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][0]).toContain(
      "office=SWT&include-roles=true&page-size=1",
    );
    expect(fetchMock.mock.calls[1][0]).toContain("page=next-token");
    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBe("Bearer test-token");
  });
});
