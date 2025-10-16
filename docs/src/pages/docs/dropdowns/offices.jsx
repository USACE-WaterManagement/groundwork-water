import { H3, Text, Card, Code, Badge, Link } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import QueryClientWarning from "../../../components/QueryClientWarning";
import ParamsTable from "../../components/params-table";
import { Code as CodeBlock } from "../../components/code";
import { OfficeDropdown } from "@usace-watermanagement/groundwork-water";
import { useState } from "react";

const propsList = [
  {
    name: "hasData",
    type: "boolean",
    required: false,
    desc: "If true, only includes offices that currently have data in CDA.",
  },
  {
    name: "typeFilters",
    type: "string[]",
    required: false,
    desc: "Filters offices by their type (case-insensitive). Options: ['DIS', 'MSC', 'MSCR']. Provides all types if not set.",
  },
  {
    name: "excludeOffices",
    type: "string[]",
    required: false,
    desc: "Array of office names to exclude from the dropdown (case-insensitive). Example: ['SWT', 'SPK']",
  },
  {
    name: "includeBlank",
    type: "boolean",
    required: false,
    desc: "If true, includes a blank option in the dropdown. Default: false",
  },
  {
    name: "initOverrides",
    type: "RequestInit | InitOverrideFunction",
    required: false,
    desc: "Overrides fetch init for the underlying CDA request (headers, credentials, etc.).",
  },
  {
    name: "queryOptions",
    type: "UseQueryOptions<Office[], Error> (partial)",
    required: false,
    desc: "Passed through to React Query for caching/behavior (e.g., staleTime, retry, enabled).",
  },
  {
    name: "onChange",
    type: "function",
    required: false,
    desc: "Called when the selected office changes. Receives the selected office short name (e.g., 'SWT').",
  },
  {
    name: "…rest",
    type: "Dropdown props",
    required: false,
    desc: (
      <div>
        Any additional props are forwarded to the underlying Groundwork {"<Dropdown />"}
        . See{" "}
        <Link
          href="https://usace.github.io/#/docs/forms/dropdown"
          className="underline"
        >
          Groundwork Dropdown documentation
        </Link>{" "}
        for more details.
      </div>
    ),
  },
];

const LiveExample = () => {
  const [allSelected, setAllSelected] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("SWT");

  return (
    <div className="flex flex-col gap-6">
      <Card className="w-full max-w-[720px]">
        <H3>All Offices</H3>
        <p className="text-sm mb-2">Filters to offices that currently have data.</p>
        <OfficeDropdown
          includeBlank
          hasData
          onChange={(e) => {
            setAllSelected(e.target.value);
          }}
        />
        <div className="mt-3">
          <Code>selected:</Code>{" "}
          {allSelected ? (
            <Badge color="green">{allSelected}</Badge>
          ) : (
            <Badge color="gray">none</Badge>
          )}
        </div>
      </Card>

      <Card className="w-full max-w-[720px]">
        <H3>Filtered by Type (DIS) and Has Data</H3>
        <p className="text-sm mb-2">
          Only shows offices with the 3 letter type for district.
        </p>
        <OfficeDropdown
          includeBlank
          hasData
          typeFilters={["DIS"]}
          defaultValue={selectedDistrict}
          onChange={(e) => {
            setSelectedDistrict(e.target.value);
          }}
        />
        <div className="mt-3 inline-block">
          <Code>selected:</Code>{" "}
          {selectedDistrict ? (
            <Badge color="green">{selectedDistrict}</Badge>
          ) : (
            <Badge color="gray">none</Badge>
          )}
        </div>
      </Card>
    </div>
  );
};

export default function OfficeDropdownDocs() {
  return (
    <DocsPage middleText="OfficeDropdown Component">
      <div>
        <Text>
          <Code className="px-1 py-0.5">OfficeDropdown</Code> renders a Groundwork{" "}
          <Code className="px-1 py-0.5">&lt;Dropdown /&gt;</Code> populated by offices
          from the CWMS Data API (CDA). Use <Code>hasData</Code> to limit to offices
          with current data and <Code>typeFilters</Code> (e.g., <Code>{'["MSC"]'}</Code>
          ) to restrict by office type.
          <em>For a full list of available props, see the API Reference below.</em>
        </Text>
        <Divider className="my-4" />
        <Text className="mt-2">
          The component internally uses the <Code>useCdaOffices</Code> hook and forwards{" "}
          <Code>queryOptions</Code> to React Query, letting you adjust caching and
          request behavior.
        </Text>
        <QueryClientWarning />
      </div>

      <Divider text="Live Example" className="mt-8" />
      <LiveExample />

      <Divider text="Example Usage" className="mt-8" />
      <CodeBlock language="jsx">
        {`import { OfficeDropdown } from "@usace-watermanagement/groundwork-water";
import { useState } from "react";

export default function Example() {
  // Default office, must match a valid return value from CDA.
  const [office, setOffice] = useState("SWT");

  return (
    <div className="space-y-2">
      <OfficeDropdown
        hasData
        // excludeOffices={["NAE", "MVP"]}
        typeFilters={["DIS"]}
        value={office}
        onChange={setOffice}
        // React Query options (optional)
        queryOptions={{ staleTime: 24 * 60 * 60 * 1000 }} // Set to cache in memory for 1 day
      />
      <div>Selected: {office || "none"}</div>
    </div>
  );
}`}
      </CodeBlock>

      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Component Props - <Code className="p-2">{"<OfficeDropdown {...} />"}</Code>
      </div>
      <ParamsTable paramsList={propsList} />

      <Divider text="Notes" className="mt-8" />
      <ul className="list-disc pl-6 space-y-2">
        <li>
          If <Code>onChange</Code> is NOT provided, a console warning is given. Provide{" "}
          <Code>onChange</Code> to the Dropdown component to trigger events with the
          selected office.
        </li>
        <li>
          Inclusions and exclusions are additive. For example, if both{" "}
          <Code>typeFilters</Code> and <Code>excludeOffices</Code> are set, the
          resulting office list will include only offices that match the type filters
          and do not match the excluded offices.
        </li>
      </ul>
    </DocsPage>
  );
}
