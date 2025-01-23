export const cdaUrlParam = {
  name: "cdaUrl",
  type: "string",
  required: false,
  desc: (
    <>
      An alternative URL for the CDA instance if not using the default (e.g. for
      testing in a development environment).
      <hr />
      Default:{" "}
      <a
        href="https://cwms-data.usace.army.mil/cwms-data"
        className="underline"
      >
        https://cwms-data.usace.army.mil/cwms-data
      </a>
    </>
  ),
};

export const queryOptionsParam = {
  name: "queryOptions",
  type: "object",
  required: false,
  desc: (
    <>
      Additional options to configure the TanStack Query useQuery request. See
      the{" "}
      <a
        href="https://tanstack.com/query/latest/docs/framework/react/reference/useQuery"
        className="gw-underline"
      >
        TanStack Query Docs
      </a>
      .
    </>
  ),
};
