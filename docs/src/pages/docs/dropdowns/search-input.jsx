import { Badge, Card, Code, H3, Link, Text } from "@usace/groundwork";
import { useMemo, useState } from "react";

import { Code as CodeBlock } from "../../components/code";
import Divider from "../../components/divider";
import ParamsTable from "../../components/params-table";
import DocsPage from "../_docs-wrapper";
import { OfficeDropdown, SearchInput } from "@usace-watermanagement/groundwork-water";

const CDA_URL = "https://cwms-data.usace.army.mil/cwms-data";

const propsList = [
  {
    name: "query",
    type: "string",
    required: false,
    desc: "Controlled query value for the input.",
  },
  {
    name: "defaultQuery",
    type: "string",
    required: false,
    desc: "Initial uncontrolled query value. Default: empty string.",
  },
  {
    name: "office",
    type: "string",
    required: false,
    desc: "Office used by the built-in CDA location search. Example: 'SWT'.",
  },
  {
    name: "cdaUrl",
    type: "string",
    required: false,
    desc: "Base URL for the built-in CDA location search.",
  },
  {
    name: "onQueryChange",
    type: "(query: string) => void",
    required: false,
    desc: "Called on every keystroke with the raw input value.",
  },
  {
    name: "onSearch",
    type: "(query: string) => void",
    required: false,
    desc: "Debounced callback fired after debounceMs. If provided, it overrides the built-in CDA search.",
  },
  {
    name: "results",
    type: "T[]",
    required: false,
    desc: "Optional externally managed results. When omitted, built-in CDA results can be used.",
  },
  {
    name: "onSelect",
    type: "(item: T) => void",
    required: false,
    desc: "Called when a result is selected by click or keyboard.",
  },
  {
    name: "getResultKey",
    type: "(item: T, index: number) => string | number",
    required: false,
    desc: "Returns a stable key for each result item.",
  },
  {
    name: "getResultLabel",
    type: "(item: T) => string",
    required: false,
    desc: "Controls the selected label shown in the input and the default result title.",
  },
  {
    name: "getResultDescription",
    type: "(item: T) => string | undefined",
    required: false,
    desc: "Optional secondary line used by the default result renderer.",
  },
  {
    name: "renderResult",
    type: "(item: T, state) => ReactNode",
    required: false,
    desc: "Overrides the default result layout for district-specific cards or badges.",
  },
  {
    name: "minQueryLength",
    type: "number",
    required: false,
    desc: "Minimum character count before results should be considered searchable. Default: 3.",
  },
  {
    name: "debounceMs",
    type: "number",
    required: false,
    desc: "Delay before onSearch fires. Default: 300.",
  },
  {
    name: "isLoading",
    type: "boolean",
    required: false,
    desc: "Optional external loading state. Useful when custom onSearch logic is supplied.",
  },
  {
    name: "idleMessage",
    type: "string",
    required: false,
    desc: "Message shown before the user has typed enough characters.",
  },
  {
    name: "emptyMessage",
    type: "string",
    required: false,
    desc: "Message shown when a search returns no matches.",
  },
  {
    name: "errorMessage",
    type: "string",
    required: false,
    desc: "Optional external error text. Useful when custom onSearch logic is supplied.",
  },
  {
    name: "label / placeholder / disabled / autoFocus",
    type: "standard input props",
    required: false,
    desc: "Common input behaviors forwarded to the search field.",
  },
  {
    name: "className / inputClassName / listClassName",
    type: "string",
    required: false,
    desc: "Classes applied to the wrapper, input, and dropdown listbox.",
  },
];

const LiveExample = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [office, setOffice] = useState("SWT");

  const selectedLabel = useMemo(() => {
    if (!selected) return "none";
    return `${selected.name} (${selected.office})`;
  }, [selected]);

  return (
    <div className="flex flex-col gap-6">
      <Card className="w-full max-w-[720px]">
        <H3>Default CDA Search</H3>
        <p className="mb-3 text-sm">
          This example uses the built-in CDA search path. Pick an office with data, then
          search for a location like <Code>KEYS</Code>.
        </p>
        <div className="mb-4">
          <OfficeDropdown
            hasData
            value={office}
            onChange={(event) => {
              setOffice(event.target.value);
              setSelected(null);
            }}
          />
        </div>
        <SearchInput
          label={`Search ${office} locations`}
          office={office}
          cdaUrl={CDA_URL}
          query={query}
          onQueryChange={setQuery}
          minQueryLength={3}
          onSelect={(item) => {
            setSelected(item);
          }}
          getResultKey={(item) => `${item.office}-${item.name}`}
          getResultLabel={(item) => item.name}
          getResultDescription={(item) =>
            `Office: ${item.office} | State: ${item.state ?? "n/a"}`
          }
          renderResult={(item) => (
            <div className="flex w-full items-center justify-between gap-3">
              <div>
                <div className="font-medium text-slate-900">{item.name}</div>
                <div className="mt-1 text-sm text-slate-600">
                  Office: {item.office} | State: {item.state ?? "n/a"}
                </div>
              </div>
              <Badge color={item.kind === "PROJECT" ? "blue" : "gray"}>
                {item.kind?.toLowerCase() ?? "location"}
              </Badge>
            </div>
          )}
        />

        <div className="mt-4">
          <Code>selected:</Code>{" "}
          <Badge color={selected ? "green" : "gray"}>{selectedLabel}</Badge>
        </div>
      </Card>
    </div>
  );
};

export default function SearchInputDocs() {
  return (
    <DocsPage middleText="SearchInput Component">
      <div>
        <Text>
          <Code className="px-1 py-0.5">SearchInput</Code> provides the reusable search
          bar requested in issue{" "}
          <Link
            href="https://github.com/USACE-WaterManagement/groundwork-water/issues/213"
            className="underline"
          >
            #213
          </Link>
          . It handles the search-box interaction pattern while still allowing districts
          to customize the data source when needed.
        </Text>
        <Divider className="my-4" />
        <Text className="mt-2">
          By default, the component can query CDA <Code>catalog/LOCATIONS</Code> for a
          selected office. If a district needs different behavior, passing{" "}
          <Code>onSearch</Code> overrides that default search.
        </Text>
      </div>

      <Divider text="Live Example" className="mt-8" />
      <LiveExample />

      <Divider text="Example Usage" className="mt-8" />
      <CodeBlock language="jsx">
        {`import { OfficeDropdown, SearchInput } from "@usace-watermanagement/groundwork-water";
import { useState } from "react";

export default function DistrictHeaderSearch() {
  const [query, setQuery] = useState("");
  const [office, setOffice] = useState("SWT");

  return (
    <>
      <OfficeDropdown
        hasData
        value={office}
        onChange={(event) => setOffice(event.target.value)}
      />
      <SearchInput
        label="Search locations"
        office={office}
        query={query}
        onQueryChange={setQuery}
        minQueryLength={3}
        getResultKey={(item) => \`\${item.office}-\${item.name}\`}
        getResultLabel={(item) => item.name}
        getResultDescription={(item) => \`Office: \${item.office} | State: \${item.state ?? "n/a"}\`}
        onSelect={(item) => {
          window.location.assign(item.kind === "PROJECT"
            ? \`/location/\${item.name}\`
            : \`/gage-location/\${item.name}\`);
        }}
      />
    </>
  );
}`}
      </CodeBlock>

      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Component Props - <Code className="p-2">{"<SearchInput {...} />"}</Code>
      </div>
      <ParamsTable paramsList={propsList} />

      <Divider text="Notes" className="mt-8" />
      <ul className="list-disc pl-6 space-y-2">
        <li>
          If <Code>office</Code> is provided and <Code>onSearch</Code> is not, the
          component uses the built-in CDA location search.
        </li>
        <li>
          The default renderer recognizes common fields such as <Code>name</Code>,{" "}
          <Code>label</Code>, <Code>publicName</Code>, <Code>office</Code>,{" "}
          <Code>state</Code>, and <Code>kind</Code>, but districts can fully override
          rendering with <Code>renderResult</Code>.
        </li>
        <li>
          Keyboard support is built in for arrow navigation, Enter to select, and Escape
          to dismiss the list.
        </li>
      </ul>
    </DocsPage>
  );
}
