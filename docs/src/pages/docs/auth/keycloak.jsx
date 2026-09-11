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
    default: '"https://identity.cwbi.mil/auth"',
    desc: "The Keycloak base URL for your environment. Defaults to CWBI production; specify https://identity-test.cwbi.mil/auth for CWBI development and test applications.",
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
    default: '"authorization-code-pkce"',
    desc: "The authentication flow to use. Use 'authorization-code-pkce' for the redirect-based OIDC flow (recommended), or 'direct-grant' for the legacy password grant flow.",
  },
  {
    name: "redirectUri",
    type: "string",
    default: "current page URL without query or hash params",
    desc: "Optional - Stable redirect URI used by the PKCE callback flow.",
  },
  {
    name: "postLogoutRedirectUri",
    type: "string",
    default: "redirectUri",
    desc: "Optional - Stable redirect URI used after PKCE logout.",
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
          The function must be passed a configuration object identifying the realm and
          client. It targets CWBI production by default. Pass a host to use another
          environment. The recommended flow is Auth Code + PKCE.
        </Text>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="border p-2">Environment</th>
                <th className="border p-2">Keycloak host</th>
                <th className="border p-2">Configuration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-semibold">Production (default)</td>
                <td className="border p-2">
                  <Code>https://identity.cwbi.mil/auth</Code>
                </td>
                <td className="border p-2">Omit host or set it explicitly</td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold">Development and test</td>
                <td className="border p-2">
                  <Code>https://identity-test.cwbi.mil/auth</Code>
                </td>
                <td className="border p-2">Set host explicitly</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Text className="mt-4">
          Keep the <Code>/auth</Code> base path shown above. The production and test
          identity services are separate; match the Keycloak host to the environment
          where your application is registered.
        </Text>
        <Text className="mt-4">
          This authentication method uses refresh tokens and will automatically manage
          requests and updates for the current access token. Call
          <Code> getValidToken(minValiditySeconds)</Code> immediately before an API
          request to refresh an expired or soon-to-expire token on demand. Concurrent
          callers share a single refresh request. The interval between background
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
import { useAuth } from "@usace-watermanagement/groundwork-water";

const authMethod = createKeycloakAuthMethod({
  realm: "cwbi",
  client: "cwms",
  flow: "authorization-code-pkce",
  redirectUri: window.location.origin,
  postLogoutRedirectUri: window.location.origin,
  providerHint: "federation-eams",
});

// Development/test applications must override the production default:
const testAuthMethod = createKeycloakAuthMethod({
  host: "https://identity-test.cwbi.mil/auth",
  realm: "cwbi",
  client: "cwms",
  flow: "authorization-code-pkce",
});

function LoginButton() {
  const auth = useAuth();

  return (
    <button onClick={() => auth.login({ redirectUri: window.location.href })}>
      Login
    </button>
  );
}`}
      </CodeBlock>
      <Text className="mt-4">
        If you need the login flow to return users to the page that initiated sign-in,
        pass that page URL into <Code>auth.login(&#123; redirectUri &#125;)</Code>.
        Groundwork-Water stores that URL and restores it after Keycloak returns to the
        configured callback URI.
      </Text>
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
