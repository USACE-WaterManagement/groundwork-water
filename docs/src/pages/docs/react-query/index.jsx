import { UsaceBox, Text, H4 } from "@usace/groundwork";
import { Code } from "../../components/code";
import CopyButton from "../../../components/CopyButton";
import DocsPage from "../_docs-wrapper";


export default function Docs() {
  return (
    <DocsPage
      nextUrl="/docs/plots"
      prevUrl="/docs/add-components"
      middleText="React Query"
      prevText="Return to Add Components"
      nextText="Go to Plots Page"
    >
        <H4>Installation</H4>
        <Code className="gw-block gw-p-1 gw-px-2" language="bash">
          npm install @tanstack/react-query
        </Code>

        <H4>Setup Query Client</H4>
        <Code className="gw-block gw-p-1 gw-px-2" language="jsx">
            {"import { QueryClient, QueryClientProvider } from \"@tanstack/react-query\""}
        </Code>

          <Code className="gw-block gw-p-1 gw-px-2" language="bash">
            {`import { SiteWrapper } from "@usace/groundwork"`}
          </Code>
         
        
          <Code className="gw-block gw-p-1 gw-px-2" language="bash">
            import "@usace/groundwork/dist/style.css"
          </Code>
        <Text>
          Make sure to import style.css from Groundwork into your top-level
          component (i.e. App.jsx), then go build stuff with the components
        </Text>
    </DocsPage>
  );
}
