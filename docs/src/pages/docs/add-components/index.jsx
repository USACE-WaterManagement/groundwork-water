import { UsaceBox, Text, H4 } from "@usace/groundwork";
import { Code } from "../../components/code";
import CopyButton from "../../../components/CopyButton";
import DocsPage from "../_docs-wrapper";

export default function Docs() {
  return (
    <DocsPage
      prevUrl={"/docs/quick-start"}
      nextUrl="/docs/plots"
      middleText="Add Components"
      prevText="Return to Quick Start"
      nextText="Go to Plots Page"
    >
      <UsaceBox title="Add Components">
        <H4>Project Setup</H4>
        <div className="gw-mt-3 gw-mb-3">
          <Text>
            Similar to{" "}
            <a
              className="gw-underline"
              href="https://usace.github.io/groundwork"
            >
              Groundwork
            </a>
            , <b>Groundwork-Water </b>
            is a set of React <b>DATA</b> components that are designed to be
            used by USACE Developers building internal and externally facing web
            pages and web apps. If you are just getting started with Groundwork
            for the first time we suggest you start with the{" "}
            <a
              className="gw-underline"
              href="https://usace.github.io/groundwork"
            >
              Groundwork
            </a>{" "}
            documentation. If you are ready to start creating data components
            for your site you are in the right place! See the{" "}
            <a
              className="gw-underline"
              href="https://vitejs.dev/guide/"
              target="_blank"
              rel="noreferrer"
            >
              Vite documentation
            </a>{" "}
            for more details on getting started or visit the{" "}
            <a className="gw-underline" href="/docs/quick-start">
              quick start guide
            </a>{" "}
            for a step by step guide for getting set up using Vite with
            Groundwork.
          </Text>
          <Text className="gw-mt-3">
            Set up a new project with Vite using the following command:
          </Text>
          <div className="gw-mt-3">
            <Code className="gw-block gw-p-1 gw-px-2" language="bash">
              {`npm create vite@latest <app-name> --template react`}
            </Code>
          </div>
        </div>

        <H4>Installation</H4>
        <Code className="gw-block gw-p-1 gw-px-2" language="bash">
          {`npm install @usace-watermanagement/groundwork-water`}
        </Code>
        <H4>Import Components and Styles</H4>
        <Code className="gw-block gw-p-1 gw-px-2" language="jsx">
          {`import { TSPlot } from "@usace-watermanagement/groundwork-water"`}
        </Code>
        <Code className="gw-block gw-p-1 gw-px-2" language="jsx">
          {`import "@usace-watermanagement/groundwork-water/dist/style.css";`}
        </Code>
        <Text>
          Make sure to import style.css from Groundwork-Water into your
          top-level component (i.e. App.jsx), then go build stuff with the
          components!
        </Text>
        <br />
        <Text>
          Note: The Groundwork-Water styles include all of the base Groundwork
          styles.
        </Text>
      </UsaceBox>
    </DocsPage>
  );
}
