import { useConnect } from "redux-bundler-hook";
import { getNavHelper } from "internal-nav-helper";
import {
  SiteWrapper,
  Container,
  Sidebar,
  Breadcrumbs,
  BreadcrumbItem,
} from "@usace/groundwork";
import "@usace/groundwork/dist/style.css";
import links from "./links/nav-links";
import footerLinks from "./links/footer-links";
import externalLinks from "./links/external-links";
import sidebarLinks from "./links/sidebar-links";
import { useEffect, useState } from "react";
// npm run dev - starts the development server

const currentPath = document.location.pathname;

function WMContainer({
  office,
  longName,
  props,
  autoBreadCrumbs = true,
  sideBarVisible = true,
  sideBarTitle,
}) {
  const {
    route: Route,
    doUpdateUrlWithBase,
    pathname,
  } = useConnect(
    "selectRoute",
    "doUpdateUrlWithBase",
    "selectPathname" // Add selectPathname to monitor URL changes
  );

  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  // Update breadcrumbs when pathname changes
  useEffect(() => {
    if (!autoBreadCrumbs) return;
    const pathSegments = pathname
      .split("/")
      .filter(Boolean) // Remove empty paths
      .filter((p) => p !== office); // Remove duplicate office id

    setBreadcrumbItems(pathSegments);
  }, [pathname, office]);

  return (
    <SiteWrapper
      links={links}
      usaBanner={true}
      subtitle={`${longName} District Water Management`}
      missionText={`Disseminate information on the current and forecasted status of water resources managed by the ${longName} District Water Management team.`}
      aboutText={`This is the official public website of ${longName} District Water Management, U.S. Army Corps of Engineers.`}
      usaceLinks={footerLinks}
      externalLinks={externalLinks}
      facebookUrl={`https://www.facebook.com/usace${office}`}
      twitterUrl={`https://x.com/usace${office}`}
      youtubeUrl={`https://www.youtube.com/usace${office}`}
      flickrUrl={`https://www.flickr.com/photos/usace${office}`}
      {...props}
    >
      <Container>
        {autoBreadCrumbs && (
          <Breadcrumbs className="px-5">
            {breadcrumbItems.map((path) => (
              <BreadcrumbItem key={path} href={`/${path}`} text={path} />
            ))}
          </Breadcrumbs>
        )}
        <div className="md:grid grid-cols-12 gap-6">
          <div className={`md:block ${sideBarVisible ? "md:col-span-2" : ""}`}>
            {sideBarVisible && (
              <Sidebar
                title={sideBarTitle || "Water Management Data System Menu"}
                selectedPath={currentPath}
                sidebarLinks={sidebarLinks}
              />
            )}
          </div>
          <div
            className={`col-span-12 md:col-span-${sideBarVisible ? 10 : 12}`}
          >
            <Route />
          </div>
        </div>
      </Container>
    </SiteWrapper>
  );
}

export default WMContainer;
