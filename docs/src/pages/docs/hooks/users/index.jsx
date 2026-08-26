import { Code, H2, H3, Text } from "@usace/groundwork";

import DocsPage from "../../_docs-wrapper";

export default function UserHooksDocs() {
  return (
    <DocsPage middleText="CDA User Management Hooks">
      <Text>
        These hooks support authenticated, office-scoped CWMS user administration. Pass
        the CDA base URL and the token supplied by <Code>useAuth()</Code>.
      </Text>

      <H2 className="mt-8">Available hooks</H2>
      <div className="mt-4 space-y-6">
        <section>
          <H3>useCdaUsers</H3>
          <Text>
            Loads every page of users active in the selected office and includes each
            user&apos;s current office roles.
          </Text>
          <Code className="mt-2 block whitespace-pre-wrap p-3">
            {`const users = useCdaUsers({
  cdaUrl,
  token,
  office: "SWT",
});`}
          </Code>
        </section>

        <section>
          <H3>useCdaRoles</H3>
          <Text>
            Loads the role catalog available to an authorized user administrator.
          </Text>
          <Code className="mt-2 block whitespace-pre-wrap p-3">
            {`const roles = useCdaRoles({ cdaUrl, token });`}
          </Code>
        </section>

        <section>
          <H3>useUpdateCdaUserRoles</H3>
          <Text>
            Compares the previous and selected roles, sends only the additions and
            removals, and refreshes the office user query after a successful update.
          </Text>
          <Code className="mt-2 block whitespace-pre-wrap p-3">
            {`await updateRoles.mutateAsync({
  userName,
  office,
  previousRoles,
  roles,
});`}
          </Code>
        </section>
      </div>
    </DocsPage>
  );
}
