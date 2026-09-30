import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { SiteWrapper, Hero } from "@usace/groundwork";
import { SearchInput } from "@usace-watermanagement/groundwork-water";
import "@usace-watermanagement/groundwork-water/style.css";

function App() {
  const [query, setQuery] = useState("");
  return (
    <SiteWrapper
      links={[]}
      showFooter={false}
      navRight={
        <SearchInput
          query={query}
          onQueryChange={setQuery}
          config={[{ name: "Keystone", office: "SWT" }]}
          keysToSearch={["name"]}
          minQueryLength={1}
        />
      }
    >
      <Hero
        title="Header stacking regression"
        subtitle="Scroll this content beneath the header"
      />
      <div style={{ height: 1500, position: "relative", background: "#dbeafe" }}>
        Positioned page content
      </div>
    </SiteWrapper>
  );
}

createRoot(document.getElementById("root")).render(<App />);
