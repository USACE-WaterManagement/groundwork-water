import { render, screen } from "@testing-library/react";
import { CdaLatestValueCard } from "../CdaLatestValueCard";

vi.mock("../../hooks/useCdaLatestValue", () => ({
  default: vi.fn(),
}));

import useCdaLatestValue from "../../hooks/useCdaLatestValue";

const mockedUseCdaLatestValue = vi.mocked(useCdaLatestValue);

describe("CdaLatestValueCard", () => {
  it("renders formatted data returned by the hook", () => {
    mockedUseCdaLatestValue.mockReturnValue({
      data: {
        value: 1234.56,
        units: "ft",
        datetime: "2026-04-01T12:00:00Z",
      },
      isPending: false,
      isError: false,
    } as ReturnType<typeof useCdaLatestValue>);

    render(
      <CdaLatestValueCard
        label="Pool Elevation"
        tsId="TEST.Elev.Inst.1Hour.0"
        office="SWT"
        digits={1}
      />,
    );

    expect(screen.getByText("Pool Elevation")).toBeTruthy();
    expect(screen.getByText("1,234.6")).toBeTruthy();
    expect(screen.getByText("ft")).toBeTruthy();
  });

  it("renders a no-data message when the hook returns no value", () => {
    mockedUseCdaLatestValue.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: false,
    } as ReturnType<typeof useCdaLatestValue>);

    render(<CdaLatestValueCard tsId="TEST.Elev.Inst.1Hour.0" office="SWT" />);

    expect(screen.getByText("No data found")).toBeTruthy();
  });
});
