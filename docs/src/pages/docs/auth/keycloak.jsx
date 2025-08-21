import { Code, Link, Text } from "@usace/groundwork";
import { Code as CodeBlock } from "../../components/code";
import PropsTable from "../../components/props-table";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import Alert from "../../components/alert";

const componentProps = [
  {
    name: "host",
    type: "string",
    default: "undefined",
    desc: "The URL for the Keycloak instance",
  },
  {
    name: "realm",
    type: "string",
    default: "undefined",
    desc: "The Keycloak realm to use for authentication.",
  },
  {
    name: "client",
    type: "string",
    default: "undefined",
    desc: "The Keycloak client to use for authentication.",
  },
  {
    name: "flow",
    type: "string",
    default: "undefined",
    desc: "The authentication flow to use.  Currently only 'direct-grant' is supported.",
  },
  {
    name: "username",
    type: "string",
    default: '""',
    desc: "(DEVELOPMENT-USE ONLY) The username to use for login. Defaults to blank.",
  },
  {
    name: "flow",
    type: "string",
    default: '""',
    desc: "(DEVELOPMENT-USE ONLY) The password to use for login. Defaults to blank.",
  },
  {
    name: "refreshInterval",
    type: "number",
    default: "undefined",
    desc: "Optional - The time between refresh token requests, in seconds",
  },
];

const keycloak = <Code>createKeycloakAuthMethod()</Code>;
const authMethod = (
  <Link href="/#/docs/auth/auth-method" className="hover:underline">
    <Code>AuthMethod</Code>
  </Link>
);

function KeycloakDocs() {
  return (
    <DocsPage middleText="{componentCode}">
      <div>
        <Text>
          The {keycloak} function returns an {authMethod} configured to authenticate
          using a Keycloak instance.
        </Text>
        <Text className="mt-4">
          The function must be passed a configuration object identifying the host URL,
          realm, client, authentication flow, and optionally a custom refresh interval
          for refresh token requests.
        </Text>
        <Text className="mt-4">
          This authentication method uses refresh tokens and will automatically manage
          requests and updates for the current access token. The interval between
          refresh requests can be controlled by the refreshInterval option.
        </Text>
        <Text className="mt-4">
          When making requests using this authentication method, the access token string
          will typically be included directly in the request headers. For example,
          requests to CDA will require the following header to be set:{" "}
          <Code>Authorization: `Bearer *token*`</Code>
        </Text>
        <Text className="mt-4">
          <Alert
            title={"Warning"}
            status={"warning"}
            message={
              "A username and password can optionally be provided directly to the auth handler, but are intended for development purposes and should not be used in production."
            }
          >
            A username and password can optionally be provided directly to the auth
            handler, but this is intended for development purposes and should not be
            used in production.
          </Alert>
        </Text>
      </div>
      <Divider text="Example Usage" className="mt-6 mb-4" />
      <CodeBlock language="jsx">
        {`import { createKeycloakAuthMethod } from "@usace-watermanagement/groundwork-water";
      
// Set authHost from environment variables

const authMethod = createKeycloakAuthMethod({
  host: authHost,
  realm: "cwms",
  client: "cwms",
  flow: "direct-grant",
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

export { KeycloakDocs };
export default KeycloakDocs;
