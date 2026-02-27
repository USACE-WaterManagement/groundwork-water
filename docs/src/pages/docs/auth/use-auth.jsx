import { Code, Link, Text } from "@usace/groundwork";
import ParamsTable from "../../components/params-table";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import QueryClientWarning from "../../../components/QueryClientWarning";
import { AuthHookExample } from ".";

const BASE_URL = import.meta.env.BASE_URL;

const returnParams = [
  {
    name: "login",
    type: "() => Promise<void>",
    default: "undefined",
    desc: "A function that handles user login with the authentication platform.",
  },
  {
    name: "logout",
    type: "() => Promise<void>",
    default: "undefined",
    desc: "A function that logs the user out of authentication platform.",
  },
  {
    name: "isAuth",
    type: "boolean",
    default: "undefined",
    desc: "True if user is authenticated, else false.",
  },
  {
    name: "isLoading",
    type: "boolean",
    default: "undefined",
    desc: "True if auth status is currently processing, else false.",
  },
  {
    name: "profile",
    type: "CdaUserProfile",
    default: "undefined",
    desc: "CDA user profile for the authenticated user. Profile is only available if a cdaUrl is provided to the AuthProvider (prop or CdaUrlProvider), else undefined.",
  },
  {
    name: "token",
    type: "string",
    default: "undefined",
    desc: "A string containing the user's access token, when available.",
  },
];

const authProvider = (
  <Link href={`${BASE_URL}#/docs/auth/auth-provider`} className="hover:underline">
    <Code>&lt;AuthProvider&gt;</Code>
  </Link>
);
const authMethod = (
  <Link href={`${BASE_URL}#/docs/auth/auth-method`} className="hover:underline">
    <Code>AuthMethod</Code>
  </Link>
);
const useAuth = <Code>useAuth()</Code>;

function UseAuthDocs() {
  return (
    <DocsPage middleText="{componentCode}">
      <div>
        <Text>
          The {useAuth} hook provides access to your current authentication context.
        </Text>
        <Text className="mt-4">
          Any components that require access to authentication can tie in to the{" "}
          {useAuth} hook. For example, these are some potential use cases:
        </Text>
        <ul className="list-disc mt-2 ml-8 text-gray-500">
          <li>
            a LoginButton component could attach the <Code>login</Code> function to its
            onClick property
          </li>
          <li>
            a component displayed only to authenticated users could toggle its display
            based on the <Code>isAuth</Code> boolean
          </li>
          <li>
            a component that fires a POST request could retrieve the <Code>token</Code>{" "}
            string for inclusion in the request
          </li>
        </ul>
        <Text className="mt-4">
          In order for the {useAuth} hook to function correctly, it must be used within
          a <Code>&lt;QueryClientProvider&gt;</Code> AND an {authProvider}. The{" "}
          {authProvider} must be configured with an appropriate {authMethod}.
        </Text>
        <QueryClientWarning />
      </div>
      <Divider text="Example Usage" className="mt-6 mb-4" />
      <Text className="mt-2">
        The following example expands upon the{" "}
        <a
          href="https://usace.github.io/groundwork/#/docs/buttons/login-button"
          className="underline"
        >
          Groundwork LoginButton example
        </a>{" "}
        by incorporating our built-in authentication handling:
      </Text>
      <AuthHookExample />
      <Divider text="API Reference" />
      <div className="font-bold text-lg pt-6">
        Return Parameters - <Code className="p-2">{`const {...} = useAuth()`}</Code>
      </div>
      <ParamsTable paramsList={returnParams} showReq={false} />
    </DocsPage>
  );
}

export { UseAuthDocs };
export default UseAuthDocs;
