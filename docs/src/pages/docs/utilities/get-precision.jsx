import { useMemo, useState } from "react";
import {
  H3,
  Text,
  Card,
  Input,
  Label,
  Fieldset,
  Code,
  Badge,
  Link,
} from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import { Code as CodeBlock } from "../../components/code";
import ParamsTable from "../../components/params-table";
import {
  getPrecision,
  PRECISION_BY_UNIT,
  DEFAULT_PRECISION,
} from "@usace-watermanagement/groundwork-water";

function GetPrecisionPage() {
  const [units, setUnits] = useState("ft");
  const [value, setValue] = useState("123.456789");

  const precision = useMemo(() => getPrecision(units), [units]);

  const formatted = useMemo(() => {
    const n = Number(value);
    if (!Number.isFinite(n)) return "—";
    return n.toFixed(precision);
  }, [value, precision]);

  const exampleCode = useMemo(
    () => `import { getPrecision } from "@usace-watermanagement/groundwork-water";

const units = "${units}";
const precision = getPrecision(units);

const raw = ${Number.isFinite(Number(value)) ? value : `"${value}"`};
const formatted = Number.isFinite(Number(raw))
  ? Number(raw).toFixed(precision)
  : null;

console.log({ units, precision, raw, formatted });
// yields: { units: "${units}", precision: ${precision}, raw: ${value}, formatted: "${formatted}" }`,
    [units, value, precision, formatted],
  );

  const getPrecisionParams = useMemo(
    () => [
      {
        name: "units",
        type: "string",
        required: false,
        desc: "Unit label used to determine display precision. Matching is case-insensitive.",
      },
    ],
    [],
  );

  const getPrecisionReturns = useMemo(
    () => [
      {
        name: "precision",
        type: "number",
        required: true,
        desc: "Decimal places to use when formatting values for the given unit.",
      },
    ],
    [],
  );
  const unitMappingParams = useMemo(() => {
    const base = Object.entries(PRECISION_BY_UNIT)
      .map(([unit, precision]) => ({
        name: unit,
        type: "number",
        required: true,
        desc: `returns ${precision}`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return [
      ...base,
      {
        name: "(default / unknown / undefined)",
        type: "number",
        required: true,
        desc: `Returns ${DEFAULT_PRECISION} for unknown units.`,
      },
    ];
  }, []);

  return (
    <DocsPage middleText="getPrecision Utility">
      <p className="mb-4">
        <Code>getPrecision</Code> maps a unit string to the recommended number of
        decimal places for displaying values in UI.
      </p>

      <Text className="mt-4">
        <Badge color="blue">Note</Badge>: Unit matching is case-insensitive.
      </Text>

      <Divider text="Live Example" className="mt-8" />

      <Card className="p-4 mt-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Fieldset>
            <Label htmlFor="units">Units</Label>
            <Input
              id="units"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              placeholder="e.g. ft, m, cfs, %, volt"
            />
            <Text className="mt-2 text-sm">
              Precision for <Code>{units || "—"}</Code>:{" "}
              <Code className="p-1">{String(precision)}</Code>
            </Text>
          </Fieldset>

          <Fieldset>
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. 123.456"
            />
            <Text className="mt-2 text-sm">
              Formatted: <Code className="p-1">{formatted}</Code>
            </Text>
          </Fieldset>
        </div>
      </Card>

      <Divider text="Usage Example" className="mt-8" />

      <Text>
        Example usage of <Code>getPrecision</Code> to format a numeric value:
      </Text>
      <CodeBlock language="js">{exampleCode}</CodeBlock>

      <Divider text="API Reference" className="mt-8" />

      <div className="font-bold text-lg pt-6">
        <Code className="p-2">getPrecision(units)</Code>
      </div>

      <div className="mt-4">
        <H3 className="text-base">Parameters</H3>
        <ParamsTable paramsList={getPrecisionParams} showReq={true} />
      </div>

      <div className="mt-6">
        <H3 className="text-base">Returns</H3>
        <ParamsTable paramsList={getPrecisionReturns} showReq={false} />
      </div>

      <Divider text="Unit Mapping" className="mt-8" />

      <Text className="mt-2">
        This list is generated at runtime from <Code>PRECISION_BY_UNIT</Code>.
      </Text>

      <div className="mt-4">
        <ParamsTable paramsList={unitMappingParams} showReq={false} />
      </div>

      <Divider text="Notes & Gotchas" className="mt-8" />
      <ul className="list-disc ms-6 text-sm space-y-2">
        <li>
          Unknown units fall back to{" "}
          <Code>{String(DEFAULT_PRECISION)} places of precision by default.</Code>.
        </li>
        <li>
          If you wish to have more units added to the library you can request them on
          the{" "}
          <Link
            href="https://github.com/usace-watermanagement/groundwork-water/issues"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            issue tracker
          </Link>
          .
        </li>
      </ul>
    </DocsPage>
  );
}

export { GetPrecisionPage };
export default GetPrecisionPage;
