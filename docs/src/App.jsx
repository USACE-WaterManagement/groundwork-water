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

const BASE_URL = import.meta.env.BASE_URL;

function App() {
  const {
    route: Route,
    hash,
    doUpdateUrl,
  } = useConnect("selectRoute", "selectHash", "doUpdateUrl");

  if (hash === "") {
    window.setTimeout(() => {
      doUpdateUrl("/#/");
    }, 100);
    return null;
  }

  return (
    <div
      onClick={getNavHelper((url) => {
        if (url.includes(`${BASE_URL}#`)) url = url.replace(`${BASE_URL}#`, "");
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
