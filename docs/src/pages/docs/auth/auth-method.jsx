import { Code, Link, Text } from "@usace/groundwork";
import PropsTable from "../../components/props-table";
import DocsPage from "../_docs-wrapper";
import Divider from "../../components/divider";

const BASE_URL = import.meta.env.BASE_URL;

const componentProps = [
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
    type: "() => Promise<boolean>",
    default: "undefined",
    desc: "A function that returns the authentication status of the user.",
  },
  {
    name: "refresh",
    type: "() => Promise<void>",
    default: "undefined",
    desc: "Optional - A function that refreshes the user's access token.",
  },
  {
    name: "refreshInterval",
    type: "number",
    default: "undefined",
    desc: "Optional - Time between refresh token requests, in seconds.",
  },
  {
    name: "token",
    type: "string",
    default: "undefined",
    desc: "Optional - A string containing the user's access token.",
  },
];

const authProvider = (
  <Link href={`${BASE_URL}#/docs/auth/auth-provider`} className="hover:underline">
    <Code>&lt;AuthProvider&gt;</Code>
  </Link>
);
const authMethod = <Code>AuthMethod</Code>;

function AuthMethodDocs() {
  return (
    <DocsPage middleText="{componentCode}">
      <div>
        <Text>
          An {authMethod} is an interface for linking an authentication platform with an{" "}
          {authProvider}.
        </Text>
        <Text className="mt-4">
          Constructor functions are available in Groundwork-Water to create an{" "}
          {authMethod} for authentication platforms that are commonly used within the
          water management community. These functions require the user to provide only a
          configuration (url, user details, etc.) and will handle the nuts and bolts
          internally. The following constructor functions are currently available:
        </Text>
        <ul className="list-disc mt-2 ml-8 text-gray-500">
          <li>
            <Link href={`${BASE_URL}#/docs/auth/keycloak`} className="hover:underline">
              createKeycloakAuthMethod()
            </Link>
          </li>
          <li>
            <Link
              href={`${BASE_URL}#/docs/auth/cwms-login`}
              className="hover:underline"
            >
              createCwmsLoginAuthMethod()
            </Link>
          </li>
        </ul>
        <Text className="mt-4">
          While use of the provided functions is recommended where applicable, custom{" "}
          {authMethod} objects can be created for advanced use cases. The interface
          shape is provided here for reference.
        </Text>
      </div>
      <Divider text="API Reference" className="mt-6" />
      <div className="font-bold text-lg pt-6">
        interface <Code className="p-2">{`AuthMethod`}</Code>
      </div>
      <PropsTable propsList={componentProps} />
    </DocsPage>
  );
}

export { AuthMethodDocs };
export default AuthMethodDocs;
