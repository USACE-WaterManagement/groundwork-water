import { Code, Link, Text } from "@usace/groundwork";
import { Code as CodeBlock } from "../../components/code";
import PropsTable from "../../components/props-table";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const BASE_URL = import.meta.env.BASE_URL;

const componentProps = [
  {
    name: "authUrl",
    type: "string",
    default: "undefined",
    desc: "The URL for the CWMSLogin provider, e.g. https://host:8243/CWMSLogin",
  },
  {
    name: "authCheckUrl",
    type: "string",
    default: "undefined",
    desc: "The URL for a GET endpoint that can be used to check authentication status, e.g. https://host:8243/cwms-data/auth/keys",
  },
];

const cwmsLogin = <Code>createCwmsLoginAuthMethod()</Code>;
const authMethod = (
  <Link href={`${BASE_URL}/#/docs/auth/auth-method`} className="hover:underline">
    <Code>AuthMethod</Code>
  </Link>
);

function CwmsLoginDocs() {
  return (
    <DocsPage middleText="{componentCode}">
      <div>
        <Text>
          The {cwmsLogin} function returns an {authMethod} configured to authenticate
          using a CWMSLogin provider.
        </Text>
        <Text className="mt-4">
          The function must be passed a configuration object with two values: the host
          URL for the CWMSLogin instance and the URL for an API endpoint that can be
          used to check authentication status.
        </Text>
        <Text className="mt-4">
          This authentication method expects that the access token will be handled using
          cookies. Therefore, the token string itself is managed by the browser and will
          not be directly available to the application.
        </Text>
        <Text className="mt-4">
          When making requests using this authentication method, be sure to set{" "}
          <Code>credentials: `include`</Code> in the request headers. This will ensure
          that the authentication cookie is included with the request.
        </Text>
      </div>
      <Divider text="Example Usage" className="mt-6 mb-4" />
      <CodeBlock language="jsx">
        {`import { createCwmsLoginAuthMethod } from "@usace-watermanagement/groundwork-water";

// Set authHost and cdaUrl from environment variables

const authMethod = createCwmsLoginAuthMethod({
  authUrl: authHost,
  authCheckUrl: \`\${cdaUrl}/auth/keys
});`}
      </CodeBlock>
      <Divider text="API Reference" className="mt-6" />
      <div className="font-bold text-lg pt-6">
        config - <Code className="p-2">{`createCwmsLoginAuthMethod(config)`}</Code>
      </div>
      <PropsTable propsList={componentProps} />
    </DocsPage>
  );
}

export { CwmsLoginDocs };
export default CwmsLoginDocs;
