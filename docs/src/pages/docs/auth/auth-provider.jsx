import { Code, Text } from "@usace/groundwork";
import PropsTable from "../../components/props-table";
import { Code as CodeBlock } from "../../components/code";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import QueryClientWarning from "../../../components/QueryClientWarning";

const componentProps = [
  {
    name: "method",
    type: "AuthMethod",
    default: "undefined",
    desc: "An authentication method with configuration options appropriate for your environment.",
  },
];

const authProvider = <Code>AuthProvider</Code>;
const authMethod = (
  <a href="/docs/auth/auth-method" className="hover:underline">
    <Code>AuthMethod</Code>
  </a>
);
const useAuth = (
  <a href="/docs/auth/use-auth" className="hover:underline">
    <Code>useAuth()</Code>
  </a>
);

function AuthProviderDocs() {
  return (
    <DocsPage middleText="{componentCode}">
      <div>
        <Text>
          The {authProvider} is a wrapper that provides your authentication
          context to the rest of your application.
        </Text>
        <Text className="mt-4">
          Configuration of your authentication environment is handled by an{" "}
          {authMethod} that is passed into the {authProvider}.
        </Text>
        <Text className="mt-4">
          Within the {authProvider}, access to your authentication context is
          provided through the {useAuth} hook.
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
