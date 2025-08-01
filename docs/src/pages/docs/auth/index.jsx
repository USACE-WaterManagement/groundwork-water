import { Code, H4, Text } from "@usace/groundwork";
import { Code as CodeBlock } from "../../components/code";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";
import QueryClientWarning from "../../../components/QueryClientWarning";

const authMethod = (
  <a href="/docs/auth/auth-method" className="hover:underline">
    <Code>AuthMethod</Code>
  </a>
);
const authProvider = (
  <a href="/docs/auth/auth-provider" className="hover:underline">
    <Code>&lt;AuthProvider&gt;</Code>;
  </a>
);
const useAuth = (
  <a href="/docs/auth/use-auth" className="hover:underline">
    <Code>useAuth()</Code>
  </a>
);

export const AuthHookExample = () => (
  <CodeBlock language="jsx">
    {`import { LoginButton, ProfileDropdown } from "@usace/groundwork";
import { useAuth } from "@usace-watermanagement/groundwork-water";

function Component() {
  const auth = useAuth();
  
  return (
    <div className="flex justify-between items-center bg-usace-black text-white rounded-2 p-2">
      {auth.isAuth ? (
        <ProfileDropdown
          showLogout
          onLogout={auth.logout}
          links={[
            {
              id: "profile",
              text: "View Profile",
              link: "#",
            },
          ]}
        />
      ) : (
        <LoginButton
          onClick={auth.login}
        />
      )}
      {auth.isAuth && (
        <span className="italic font-light text-sm">{"Logged in!"}</span>
      )}
    </div>
  )
}

export default Component;
`}
  </CodeBlock>
);

function AuthenticationDocs() {
  return (
    <DocsPage middleText="Authentication">
      <div>
        <Text>
          Authentication management in Groundwork-Water is designed to support common
          authentication platforms used by the water management community such as
          Keycloak and CWMSLogin. Authentication is handled using three main components:
        </Text>
        <ul className="list-disc ml-12 text-gray-500">
          <li>
            an {authMethod}, generally created using one of the provided constructors:
            <ul className="list-disc ml-8">
              <li>
                <a href="/docs/auth/keycloak" className="hover:underline">
                  createKeycloakAuthMethod()
                </a>
              </li>
              <li>
                <a href="/docs/auth/cwms-login" className="hover:underline">
                  createCwmsLoginAuthMethod()
                </a>
              </li>
            </ul>
          </li>
          <li>
            an {authProvider} that wraps your application (or at least the part
            requiring authentication)
          </li>
          <li>
            a {useAuth} hook that provides access to authentication functionality where
            needed
          </li>
        </ul>
        <QueryClientWarning />
      </div>
      <Divider text="Setup" className="mt-6 mb-4" />
      <Text>
        These examples provide a brief overview of authentication setup. Please refer to
        the individual component documentation pages for more detailed information.
      </Text>
      <H4 className="mt-4 mb-2">AuthMethod</H4>
      <Text>
        An {authMethod} object must be created to configure your authentication within
        the {authProvider}. Typically, this can be done at the top level of your
        application, e.g. App.jsx/tsx, using the provided constructor functions.
      </Text>
      <CodeBlock language="jsx">
        {`import { createCwmsLoginAuthMethod } from "@usace-watermanagement/groundwork-water";

const authMethod = createCwmsLoginAuthMethod({
  authUrl: "localhost:7000/CWMSLogin",
  authCheckUrl: "localhost:7000/cwms-data/auth/keys",
});
`}
      </CodeBlock>
      <H4 className="mb-2">AuthProvider</H4>
      <Text>
        Your application (or the parts of your application requiring authentication)
        must be wrapped in an {authProvider} component. The previously-created{" "}
        {authMethod} will be passed to the {authProvider} to apply the configuration
        within your application.
      </Text>
      <CodeBlock language="jsx">
        {`import {
  AuthProvider,
  createCwmsLoginAuthMethod,
} from "@usace-watermanagement/groundwork-water";

// queryClient setup, authMethod setup, etc...
        
<React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <AuthProvider method={authMethod}>
      <RouterProvider router={router} />
    </AuthProvider>
  </QueryClientProvider>
</React.StrictMode>
`}
      </CodeBlock>
      <H4 className="mb-2">useAuth()</H4>
      <Text>
        The {useAuth} hook provides access to your authentication context within your
        application. This includes features such as login/logout methods, an
        authentication status boolean, and, when applicable, a JWT token string.
      </Text>
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
      <useAuthExample />
    </DocsPage>
  );
}

export { AuthenticationDocs };
export default AuthenticationDocs;
