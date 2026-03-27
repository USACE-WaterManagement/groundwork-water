import { Badge, Card, Code, H3, Link, Text } from "@usace/groundwork";
import { useEffect, useMemo, useRef, useState } from "react";

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
    name: "onQueryChange",
    type: "(query: string) => void",
    required: false,
    desc: "Called on every keystroke with the raw input value.",
  },
  {
    name: "onSearch",
    type: "(query: string) => void",
    required: false,
    desc: "Debounced callback fired after debounceMs. Consumer code should fetch or filter results here.",
  },
  {
    name: "results",
    type: "T[]",
    required: false,
    desc: "Search results to render in the dropdown. The component does not fetch data by itself.",
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
    desc: "Shows loading skeleton rows while results are being fetched.",
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
    desc: "Error text shown instead of the results list.",
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
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [office, setOffice] = useState("SWT");
  const timeoutRef = useRef();
  const abortRef = useRef();

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current);
      abortRef.current?.abort();
    };
  }, []);

  const selectedLabel = useMemo(() => {
    if (!selected) return "none";
    return `${selected.name} (${selected.office})`;
  }, [selected]);

  return (
    <div className="flex flex-col gap-6">
      <Card className="w-full max-w-[720px]">
        <H3>Async Search Pattern</H3>
        <p className="mb-3 text-sm">
          This example uses the live CDA catalog endpoint that Lauren's MVP search is
          built on. Pick an office with data, then search for a location like{" "}
          <Code>KEYS</Code>.
        </p>
        <div className="mb-4">
          <OfficeDropdown
            hasData
            value={office}
            onChange={(event) => {
              setOffice(event.target.value);
              setSelected(null);
              setResults([]);
              setErrorMessage("");
            }}
          />
        </div>
        <SearchInput
          label={`Search ${office} locations`}
          query={query}
          onQueryChange={setQuery}
          results={results}
          isLoading={isLoading}
          errorMessage={errorMessage}
          minQueryLength={3}
          onSearch={(nextQuery) => {
            window.clearTimeout(timeoutRef.current);
            abortRef.current?.abort();
            if (nextQuery.trim().length < 3) {
              setResults([]);
              setIsLoading(false);
              setErrorMessage("");
              return;
            }

            setIsLoading(true);
            setErrorMessage("");
            timeoutRef.current = window.setTimeout(() => {
              const controller = new AbortController();
              abortRef.current = controller;
              fetch(
                `${CDA_URL}/catalog/LOCATIONS?office=${office}&like=${encodeURIComponent(nextQuery)}`,
                {
                  method: "GET",
                  headers: { Accept: "application/json" },
                  signal: controller.signal,
                },
              )
                .then(async (response) => {
                  if (!response.ok) {
                    throw new Error(
                      `CDA search failed: ${response.status} ${response.statusText}`,
                    );
                  }
                  return response.json();
                })
                .then((data) => {
                  const entries = Array.isArray(data?.entries) ? data.entries : [];
                  setResults(entries.filter((item) => !item?.name?.includes("-")));
                })
                .catch((error) => {
                  if (error.name === "AbortError") return;
                  setResults([]);
                  setErrorMessage(error.message);
                })
                .finally(() => {
                  setIsLoading(false);
                });
            }, 350);
          }}
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
          . It handles the search-box interaction pattern, while each district controls
          the actual result source, routing, and filtering rules.
        </Text>
        <Divider className="my-4" />
        <Text className="mt-2">
          This keeps the library generic: districts can feed in CDA-backed results,
          local project lists, or any other search provider without copying Lauren's
          original Redux bundles and app-specific navigation code. Lauren's current MVP
          implementation queries the CDA <Code>catalog/LOCATIONS</Code> endpoint for a
          single district office.
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
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSearch(nextQuery) {
    if (nextQuery.trim().length < 3) {
      setResults([]);
      setErrorMessage("");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        \`https://cwms-data.usace.army.mil/cwms-data/catalog/LOCATIONS?office=\${office}&like=\${encodeURIComponent(nextQuery)}\`,
        { headers: { Accept: "application/json" } },
      );
      const data = await response.json();
      setResults(data.entries ?? []);
    } catch (error) {
      setResults([]);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <OfficeDropdown
        hasData
        value={office}
        onChange={(event) => setOffice(event.target.value)}
      />
      <SearchInput
        label="Search locations"
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        results={results}
        isLoading={loading}
        errorMessage={errorMessage}
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
          <Code>SearchInput</Code> does not fetch from CDA or any district API on its
          own. It intentionally separates input behavior from data ownership.
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
