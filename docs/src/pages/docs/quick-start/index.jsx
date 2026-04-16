import { UsaceBox, Text, H4 } from "@usace/groundwork";
import { Code } from "../../components/code";
import CopyButton from "../../../components/CopyButton";
import DocsPage from "../_docs-wrapper";

export default function Docs() {
  return (
    <DocsPage
      nextUrl="/docs/add-components"
      middleText="Quick Start"
      nextText="Go to Add Components Page"
    >
      <div className="gw-mt-3 gw-mb-3">
        <Text>
          Similar to{" "}
          <a className="gw-underline" href="https://usace.github.io/groundwork">
            Groundwork
          </a>
          , <b>Groundwork-Water</b>
          is a set of React <b>DATA</b> components that are designed to be used by USACE
          Developers building internal and externally facing web pages and web apps. If
          you are just getting started with Groundwork for the first time we suggest you
          start with the{" "}
          <a className="gw-underline" href="https://usace.github.io/groundwork">
            Groundwork
          </a>{" "}
          documentation. If you are ready to start creating data components for your
          site you are in the right place! See the{" "}
        </Text>
      </div>

      <H4>Installation</H4>
      <Code className="gw-block gw-p-1 gw-px-2" language="bash">
        npm install @usace-watermanagement/groundwork-water
      </Code>
    </DocsPage>
  );
}
