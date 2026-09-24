import { Link, Text } from "@usace/groundwork";
import { H4 } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";

const BASE_URL = import.meta.env.BASE_URL;

function GraphicsDocs() {
  return (
    <DocsPage
      nextUrl="/docs/tables"
      prevUrl="/docs/react-query"
      middleText="Plots"
      nextText="Go to Tables"
      prevText="Return to React Query"
    >
      <div>
        <Text className="pb-6">
          The groundwork-water graphics components are intended to create
          consistently-styled water management graphics without being opinonated on the
          source of the data,
        </Text>
      </div>
      <H4>Components</H4>
      <ul>
        <li>
          <Link href={`${BASE_URL}#/docs/graphics/dam-profile`}>
            Dam Profile Graphic - A graphic for displaying levels and timeseries values
            at a project.
          </Link>
        </li>
      </ul>
      <br />
      ``
    </DocsPage>
  );
}

export { GraphicsDocs as DataHooks };
export default GraphicsDocs;
