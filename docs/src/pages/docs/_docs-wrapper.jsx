import { useState } from "react";
import { Container } from "@usace/groundwork";
import { Next, Prev } from "../components/navigation";

function DocsPage({
  children,
  prevUrl,
  nextUrl,
  middleText = "Navigation",
  prevText = "Return to Last Page",
  nextText = "Go to next section",
}) {
  const [hoverText, setHoverText] = useState(middleText);

  const handlePrevMouseEnter = () => setHoverText(prevText);
  const handlePrevMouseLeave = () => setHoverText(middleText);

  const handleNextMouseEnter = () => setHoverText(nextText);
  const handleNextMouseLeave = () => setHoverText(middleText);
  const navigationButtons = () => {
    return <div className="select-none mb-5 flex flex-row justify-between items-center navigation-buttons relative">
        <div
          onMouseEnter={handlePrevMouseEnter}
          onMouseLeave={handlePrevMouseLeave}
        >
          { prevUrl ? <Prev url={prevUrl} className="relative z-10 hover:text-white" /> : null }
        </div>
        <span className="middle-text relative bg-white px-2 font-bold">
          {hoverText}
        </span>
        <div
          onMouseEnter={handleNextMouseEnter}
          onMouseLeave={handleNextMouseLeave}
        >
          { nextUrl ? <Next url={nextUrl} className="relative z-10 hover:text-white" /> : null }
        </div>
        <div className="absolute left-0 right-0 border-t border-gray-200 top-1/2 -z-10"></div>
      </div>
  }
  return (
    <Container>
      {navigationButtons()}
      <div className="flex flex-row flex-between mb-5">
        <div className="flex flex-col flex-grow">{children}</div>
      </div>
      {navigationButtons()}
    </Container>
  );
}

export default DocsPage;
export { DocsPage };
