import { Text } from "@usace/groundwork";
import { H4 } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";

function PlotsDocs() {
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
          The groundwork-water plotting components are intended to create
          consistently-styled water management plots while handling as much of
          the data retrieval as possible for the user.
        </Text>
      </div>
      <H4>Components</H4>
      <ul>
        <li>
          <a href="/docs/plots/cwms-plot">
            CMWSPlot - A generic plot for displaying CWMS data
          </a>
        </li>
      </ul>
      <br />
    </DocsPage>
  );
}

export { PlotsDocs as DataHooks };
export default PlotsDocs;
