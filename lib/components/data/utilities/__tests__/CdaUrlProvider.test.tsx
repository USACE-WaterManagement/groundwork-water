import { render, screen } from "@testing-library/react";
import { CdaUrlProvider } from "../CdaUrlProvider";
import { useCdaUrl } from "../useCdaUrl";

function Consumer() {
  const value = useCdaUrl();
  return <div data-testid="cda-url">{value}</div>;
}

describe("CdaUrlProvider", () => {
  it("provides the configured CDA URL to descendants", () => {
    render(
      <CdaUrlProvider url="https://example.test/cwms-data">
        <Consumer />
      </CdaUrlProvider>,
    );

    expect(screen.getByTestId("cda-url").textContent).toBe(
      "https://example.test/cwms-data",
    );
  });
});
