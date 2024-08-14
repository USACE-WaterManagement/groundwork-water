import { UsaceBox, H4, H1 } from "@usace/groundwork";
import DocsPage from "../_docs-wrapper";
import Alert from "../../components/alert";
import Divider from "../../components/divider";
export default function HelpPage() {
  return (
    <DocsPage>
      <UsaceBox
        title="When should you use one library over another?"
        className="gw-mt-3 gw-mb-3"
      >
        <div className="p-3">
          <article>
            There are many libraries available or options for how you could get
            started or update your existing React website. This page is intended
            to help you decide which library to use. <br />
            <br />
            If you are just getting started with Groundwork for the first time
            we suggest you start with the{" "}
            <a href="https://usace.github.io/groundwork">Groundwork</a>{" "}
            documentation.
          </article>
          <article>
            The blocks below provide you with a flow chart to help you decide.{" "}
            Start with the first option and work your way down as you determine
            what you need. If something is missing, please request it.
            <br />
            <Alert
              className="my-3"
              status="warning"
              title="NOTE"
              message={
                <span>
                  The `Groundwork` library is a collection of React components
                  that are primarily for{" "}
                  <b>Design, Layout, Branding, and Styling</b> of your React
                  website to match the USACE standards. Read more here:{" "}
                  <a
                    className="underline text-blue-500"
                    href="https://usace.github.io/groundwork"
                  >
                    Groundwork
                  </a>
                </span>
              }
            />
          </article>
        </div>
      </UsaceBox>
      <UsaceBox title="Groundwork-Water">
        <em>
          Wraps everything below and provides components to build the plots,
          tables, maps, and more for you given metadata.
        </em>
        <div className="p-3">
          <article>
            Read more here:{" "}
            <a
              className="underline text-blue-500"
              href="https://github.com/USACE-WaterManagement/groundwork-water"
            >
              Groundwork-Water
            </a>{" "}
            <br />
            See the Plots, Tables, and Maps tabs in the header for examples.{" "}
            <Divider text="Requests / Issues" className="mt-8 mb-5" />
            Please make requests for new components or features you would like
            to see on the issues page: <br />
            <a
              className="underline text-blue-500"
              href="https://github.com/USACE-WaterManagement/groundwork-water/issues"
            >
              Groundwork-Water Issues/Requests
            </a>
          </article>
        </div>
      </UsaceBox>
      <UsaceBox title="Groundwork-Water + React Query">
        <em>State Management + Fetch + CDA wrapper</em>
        <div className="p-3">
          <article>
            Read more here:{" "}
            <a
              className="underline text-blue-500"
              href="https://usace-watermanagement.github.io/groundwork-water/#/docs/hooks/use-cda-catalog"
            >
              GW-Water Catalog Hook
            </a>{" "}
            <br />
            See the &quot;Data Hooks&quot; tab in the header for examples.{" "}
            <Divider text="Requests / Issues" className="mt-8 mb-5" />
            Please make requests for new components or features you would like
            to see on the issues page: <br />
            <a
              className="underline text-blue-500"
              href="https://github.com/USACE-WaterManagement/groundwork-water/issues"
            >
              Groundwork-Water Issues/Requests
            </a>
          </article>
        </div>
      </UsaceBox>
      <UsaceBox title="CWMSjs">
        <em>fetch + CDA wrapper</em>
        <div className="p-3">
          <article>
            <div>
              CWMSjs is a wrapper for the CWMS API. It provides a simple way to
              fetch data from the CWMS API and parse the response into a
              JavaScript object. It also provides a way to make requests to the
              CWMS API using the HTTP protocol.
            </div>
            <div>
              These are automatically generated using the Swagger Specification
              provided by CDA.
            </div>
            <div>
              The intent is to keep the latest version of this library current
              with the version of CDA and it&apos;s available endpoints provided
              here:{" "}
              <a
                className="underline text-blue-500"
                href="https://cwms-data.usace.army.mil/cwms-data/swagger-ui.html"
              >
                CWMS Data API - CDA - Swagger Docs
              </a>{" "}
            </div>
            <Divider text="Developer Docs" className="mt-8 mb-5" />
            View Examples and Developer Documentation here:{" "}
            <a
              className="underline text-blue-500"
              href="https://hydrologicengineeringcenter.github.io/cwms-data-api-client-javascript/"
            >
              CWMSjs
            </a>{" "}
            <br />
            Examples that are tested are found in the center of the page.
            <Divider text="Site Navigation" className="mt-8 mb-5" />
            The sidebar provides you navigation through all the return and
            request types. As well as the class definitions for the CWMSjs
            library.
            <br />
            To report a bug, please make a request on the issues page: <br />
            <a
              className="underline text-blue-500"
              href="https://github.com/hydrologicengineeringcenter/cwms-data-api-client-javascript/issues"
            >
              CWMSjs Issues/Requests
            </a>
          </article>
        </div>
      </UsaceBox>
      <UsaceBox title="fetch / Vanilla JS">
        <em>
          fetch is a JavaScript method build into the browser for making HTTP
          requests
        </em>
        <div className="p-3">
          <article>
            Fetch provides a low level way for you to make HTTP requests to any
            endpoint you would like. You could use it to dynamically load a
            config file, make requests another API endpoint, or even make a
            request to a local server. Fetch is a very powerful tool and is used
            in many modern applications.
            <Alert
              title="Note"
              status="info"
              message={
                <span>
                  <b>fetch</b> is not a part of the <b>React Query</b> library.
                  It is a browser API that is available in all modern browsers.
                  If you are using <b>React Query</b> consider{" "}
                  <a
                    className="underline text-blue-500"
                    href="https://tanstack.com/query/latest/docs/framework/react/quick-start"
                  >
                    useQuery
                  </a>{" "}
                  instead.
                </span>
              }
            />
            <div>
              {" "}
              Read the MDN doc here:{" "}
              <a
                className="underline text-blue-500"
                href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"
              >
                Getting started with Fetch
              </a>
            </div>
          </article>
        </div>
      </UsaceBox>
    </DocsPage>
  );
}
