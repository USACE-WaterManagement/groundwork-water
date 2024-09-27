import { Code, Text } from "@usace/groundwork";
import PropsTable from "../../components/props-table";
import { Code as CodeBlock } from "../../components/code";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const componentProps = [
  {
    name: "url",
    type: "string",
    default: "undefined",
    desc: "The CDA URL to provide to any compatible wrapped CDA requests.",
  },
];

const cdaUrlProvider = <Code>CdaUrlProvider</Code>;
const cdaUrl = <Code>cdaUrl</Code>;

function CdaUrlProviderDocs() {
  return (
    <DocsPage middleText="{componentCode}">
      <div>
        <Text>
          The {cdaUrlProvider} is offered as a mechanism to adjust the CDA URL
          used by any contained (and compatible) CDA requests. While the CDA URL
          could be changed for each request individually (e.g. by using a data
          hook {cdaUrl} parameter), it is often desirable to use a custom URL
          for an entire application or for a subset of an application such as a
          page.
        </Text>
        <Text className="mt-4">
          This component is utilized by wrapping any it around any CDA requests
          that are intended to use the custom CDA URL. A user could wrap their
          entire application in a single {cdaUrlProvider} to use a custom CDA
          URL for all requests, or could alternatively wrap a small group of
          components or even a single component. For a single component,
          however, it is often simpler to use a directly attached {cdaUrl}
          property or parameter if available.
        </Text>
        <Text className="mt-4">
          It is important to note that the {cdaUrlProvider} will only affect
          components and/or requests that are configured to utilize it. This
          ideally includes all groundwork-water components, but at a minimum
          will include the provided data hooks and any components that integrate
          them. If a groundwork-water component does not support the{" "}
          {cdaUrlProvider}, please submit an issue to the{" "}
          <a
            href="https://github.com/USACE-WaterManagement/groundwork-water/"
            className="underline"
          >
            GitHub repo
          </a>
          .
        </Text>
        <Text className="mt-4">
          If components or data hooks within the {cdaUrlProvider} utilize a
          custom CDA URL (e.g. the {cdaUrl} parameter) it will override the URL
          provided by this component. For reference, the CDA URL will use this
          priority list:
        </Text>
        <Text className="mt-4">
          <ol className="list-decimal ml-12">
            <li>
              {cdaUrl} parameter assigned directly to the component and/or data
              hook
            </li>
            <li>url property provided by a wrapping {cdaUrlProvider}</li>
            <li>default url used by the cwmsjs package</li>
          </ol>
        </Text>
      </div>
      <Divider text="Example Usage" className="mt-8" />
      <Text>An entire application wrapped within a {cdaUrlProvider}:</Text>
      <CodeBlock language="jsx">
        {`<React.StrictMode>
  <CdaUrlProvider url="https://cwms-data.usace.army.mil/cwms-data">
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </CdaUrlProvider>
</React.StrictMode>
`}
      </CodeBlock>
      <Text>A single component wrapped within a {cdaUrlProvider}:</Text>
      <CodeBlock language="jsx">
        {`<CdaUrlProvider url="https://cwms-data.usace.army.mil/cwms-data">
  <CdaLatestValueCard
    label="Buckhorn Outflow"
    tsId="Buckhorn.Flow-Outflow.Ave.1Hour.1Hour.lrldlb-comp"
    office="LRL"
  />
</CdaUrlProvider>
`}
      </CodeBlock>
      <Divider text="API Reference" className="mt-8" />
      <div className="font-bold text-lg pt-6">
        Component API - <Code className="p-2">{`<CdaUrlProvider />`}</Code>
      </div>
      <PropsTable propsList={componentProps} />
    </DocsPage>
  );
}

export { CdaUrlProviderDocs };
export default CdaUrlProviderDocs;
