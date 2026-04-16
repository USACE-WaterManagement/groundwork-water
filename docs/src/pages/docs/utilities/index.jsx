import DocsPage from "../_docs-wrapper";
import { Text } from "@usace/groundwork";

const UtilitiesDocs = () => {
  return (
    <DocsPage middleText="Utilities">
      <Text>
        Utilities in groundwork-water are generally offered as a way to interface with
        or modify the configuration of existing components, rather than being directly
        utilized as components themselves. For example, a utility might allow you to set
        a default URL source for a set of wrapped data components.
      </Text>
    </DocsPage>
  );
};

export { UtilitiesDocs };
export default UtilitiesDocs;
