import { UsaceBox, Text, H4, Link } from "@usace/groundwork";
import { Code } from "../components/code";
import CopyButton from "../../components/CopyButton";
import DocsPage from "./_docs-wrapper";

const BASE_URL = import.meta.env.BASE_URL;

export default function Docs() {
  return (
    <DocsPage
      nextUrl="/docs/quick-start"
      middleText="Getting Started"
      prevText="Return to Quick Start"
      nextText="Go to Quick Start Page"
    >
      <UsaceBox title="Getting Started">
        <H4>Project Setup</H4>
        <div className="gw-mt-3 gw-mb-3">
          <Text>
            Similar to{" "}
            <a className="gw-underline" href="https://usace.github.io/groundwork">
              Groundwork
            </a>
            , <b>Groundwork-Water </b>is a set of React <b>DATA</b> components that are
            designed to be used by USACE Developers building internal and externally
            facing web pages and web apps. If you are just getting started with
            Groundwork for the first time we suggest you start with the{" "}
            <a className="gw-underline" href="https://usace.github.io/groundwork">
              Groundwork
            </a>{" "}
            documentation. If you are ready to start creating data components for your
            site you are in the right place! See the{" "}
            <a
              className="gw-underline"
              href="https://vitejs.dev/guide/"
              target="_blank"
              rel="noreferrer"
            >
              Vite documentation
            </a>{" "}
            for more details on getting started or visit the{" "}
            <Link className="gw-underline" href={`${BASE_URL}#/docs/quick-start`}>
              quick start guide
            </Link>{" "}
            for a step by step guide for getting set up using Vite with Groundwork.
          </Text>
          <Text className="gw-mt-3">
            Set up a new project with Vite using the following command:
          </Text>
        </div>

        <H4>Installation</H4>
        <Code className="gw-block gw-p-1 gw-px-2" language="bash">
          npm install @usace-watermanagement/groundwork-water
        </Code>
      </UsaceBox>
    </DocsPage>
  );
}
