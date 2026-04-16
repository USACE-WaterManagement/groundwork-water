import { Code, Link, Text } from "@usace/groundwork";
import { Code as CodeBlock } from "../../components/code";
import PropsTable from "../../components/props-table";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import Alert from "../../components/alert";

const BASE_URL = import.meta.env.BASE_URL;

const componentProps = [
  {
    name: "host",
    type: "string",
    default: "undefined",
    desc: "The Keycloak base URL for your environment. Include '/auth' when your realm endpoints are served under that path.",
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
    desc: "The authentication flow to use. Use 'authorization-code-pkce' for the redirect-based OIDC flow, or 'direct-grant' for the legacy password grant flow.",
  },
  {
    name: "redirectUri",
    type: "string",
    default: "current page URL without query params",
    desc: "Optional - Redirect URI used by the PKCE flow.",
  },
  {
    name: "postLogoutRedirectUri",
    type: "string",
    default: "redirectUri",
    desc: "Optional - Redirect URI used after PKCE logout.",
  },
  {
    name: "scope",
    type: "string",
    default: '"openid profile"',
    desc: "Optional - OIDC scopes requested by the PKCE flow.",
  },
  {
    name: "providerHint",
    type: "string",
    default: "undefined",
    desc: "Optional - Keycloak identity provider hint sent as kc_idp_hint.",
  },
  {
    name: "username",
    type: "string",
    default: '""',
    desc: "(DIRECT-GRANT ONLY) The username to use for login. Defaults to blank.",
  },
  {
    name: "password",
    type: "string",
    default: '""',
    desc: "(DIRECT-GRANT ONLY) The password to use for login. Defaults to blank.",
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
  <Link href={`${BASE_URL}#/docs/auth/auth-method`} className="hover:underline">
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
          for refresh token requests. The recommended flow is Auth Code + PKCE.
        </Text>
        <Text className="mt-4">
          Use the exact Keycloak base path that serves your realm endpoints. For the
          CWBI test environment used by <Code>cwms-cli</Code>, that is
          <Code> https://identity-test.cwbi.us/auth</Code> rather than the stripped root
          URL.
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
            title={"Flow Guidance"}
            status={"info"}
            message={"Prefer the PKCE flow so credential entry stays within Keycloak."}
          >
            The legacy direct-grant flow remains available, but PKCE is the preferred
            path. Direct username/password values should be treated as a compatibility
            option rather than the default.
          </Alert>
        </Text>
      </div>
      <Divider text="Example Usage" className="mt-6 mb-4" />
      <CodeBlock language="jsx">
        {`import { createKeycloakAuthMethod } from "@usace-watermanagement/groundwork-water";
      
// Set authHost from environment variables

const authMethod = createKeycloakAuthMethod({
  host: "https://identity-test.cwbi.us/auth",
  realm: "cwbi",
  client: "cwms",
  flow: "authorization-code-pkce",
  redirectUri: window.location.origin,
  providerHint: "federation-eams",
});`}
      </CodeBlock>
      <Divider text="API Reference" className="mt-6" />
      <div className="font-bold text-lg pt-6">
        config - <Code className="p-2">{`createKeycloakAuthMethod(config)`}</Code>
      </div>
      <PropsTable propsList={componentProps} />
    </DocsPage>
  );
}

export { KeycloakDocs };
export default KeycloakDocs;
