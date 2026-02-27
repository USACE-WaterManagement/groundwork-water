import { Code, Link, Text } from "@usace/groundwork";
import PropsTable from "../../components/props-table";
import { Code as CodeBlock } from "../../components/code";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import QueryClientWarning from "../../../components/QueryClientWarning";

const BASE_URL = import.meta.env.BASE_URL;

const componentProps = [
  {
    name: "method",
    type: "AuthMethod",
    default: "undefined",
    desc: "An authentication method with configuration options appropriate for your environment.",
  },
  {
    name: "cdaUrl",
    type: "string",
    default: "undefined",
    desc: "The base CDA URL to use within the AuthProvider for profile retrieval. If the AuthProvider is within a CdaUrlProvider, the CdaUrlProvider is used by default.  Prop will override. If no cdaUrl is found then profile details will not be available.",
  },
  {
    name: "refreshInterval",
    type: "number",
    default: "undefined",
    desc: "Optional - Time between refresh token requests, in seconds. Will override authMethod setting.",
  },
];

const authProvider = <Code>AuthProvider</Code>;
const authMethod = (
  <Link href={`${BASE_URL}#/docs/auth/auth-method`} className="hover:underline">
    <Code>AuthMethod</Code>
  </Link>
);
const useAuth = (
  <Link href={`${BASE_URL}#/docs/auth/use-auth`} className="hover:underline">
    <Code>useAuth()</Code>
  </Link>
);

function AuthProviderDocs() {
  return (
    <DocsPage middleText="{componentCode}">
      <div>
        <Text>
          The {authProvider} is a wrapper that provides your authentication context to
          the rest of your application.
        </Text>
        <Text className="mt-4">
          Configuration of your authentication environment is handled by an {authMethod}{" "}
          that is passed into the {authProvider}.
        </Text>
        <Text className="mt-4">
          Within the {authProvider}, access to your authentication context is provided
          through the {useAuth} hook.
        </Text>
        <QueryClientWarning />
      </div>
      <Divider text="Example Usage" className="mt-6 mb-4" />
      <Text>Import the AuthProvider at the top of your application with:</Text>
      <CodeBlock language="jsx">
        {`import { AuthProvider } from "@usace-watermanagement/groundwork-water";`}
      </CodeBlock>
      <Text className="mb-4">Create an appropriate {authMethod}.</Text>
      <Text>Wrap your application with an {authProvider}:</Text>
      <CodeBlock language="jsx">
        {`<React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <AuthProvider method={authMethod}>
      <RouterProvider router={router} />
    </AuthProvider>
  </QueryClientProvider>
</React.StrictMode>
`}
      </CodeBlock>
      <Divider text="API Reference" />
      <div className="font-bold text-lg pt-6">
        Component API - <Code className="p-2">{`<CdaUrlProvider />`}</Code>
      </div>
      <PropsTable propsList={componentProps} />
    </DocsPage>
  );
}

export { AuthProviderDocs };
export default AuthProviderDocs;
