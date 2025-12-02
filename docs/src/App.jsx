import { SiteWrapper, Button, Breadcrumbs, BreadcrumbItem } from "@usace/groundwork";
import { getNavHelper } from "internal-nav-helper";
import { useConnect } from "redux-bundler-hook";
import links from "./nav-links";
import { FaGithub } from "react-icons/fa";
import "@usace-watermanagement/groundwork-water/dist/style.css";
import DevWarning from "./components/DevWarning";
const version = import.meta.env.PKG_VERSION;

import externalLinks from "./external-links";
import usaceLinks from "./usace-links";

function App() {
  const {
    route: Route,
    hash,
    doUpdateHash,
  } = useConnect("selectRoute", "selectHash", "doUpdateHash");

  if (hash === "") {
    window.setTimeout(() => {
      doUpdateHash("/");
    }, 100);
    return null;
  }

  return (
    <div
      onClick={getNavHelper((url) => {
        if (url.includes("/#")) url = url.replace("/#", "");
        doUpdateHash(url);
      })}
    >
      <SiteWrapper
        fluidNav={true}
        links={links}
        usaBanner={true}
        subtitle={`Groundwork Water React Components v${version}`}
        missionText="Creating React Components for the USACE Water Management Community."
        aboutText="Created by the Water Management Community of Practice (WM COP) to provide a consistent look and feel for USACE Water Management applications."
        navRight={
          <>
            {/* <SearchDotGov
              affiliate="groundwork"
              accessKey=""
            /> */}
            <Button
              style="plain"
              color="white"
              size="lg"
              href="https://github.com/USACE-WaterManagement/groundwork-water"
              title="Check out the source code on GitHub"
            >
              <FaGithub />
            </Button>
          </>
        }
        usaceLinks={usaceLinks}
        externalLinks={externalLinks}
        facebookUrl="#"
        twitterUrl="#"
        youtubeUrl="#"
        flickrUrl="#"
      >
        <DevWarning />
        <Breadcrumbs className="px-5">
          {hash
            .split("/")
            .filter(Boolean) // Remove empty paths
            .map((path) => (
              <BreadcrumbItem key={path} href={path} text={path} />
            ))}
        </Breadcrumbs>
        <div className="p-4">
          <Route />
        </div>
      </SiteWrapper>
    </div>
  );
}

export default App;
