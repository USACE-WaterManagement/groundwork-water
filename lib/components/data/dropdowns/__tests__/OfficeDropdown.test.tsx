import { render, screen } from "@testing-library/react";
import { OfficeDropdown } from "../OfficeDropdown";

vi.mock("../../hooks/useCdaOffices", () => ({
  default: vi.fn(),
}));

import useCdaOffices from "../../hooks/useCdaOffices";

const mockedUseCdaOffices = vi.mocked(useCdaOffices);

describe("OfficeDropdown", () => {
  it("renders filtered office options from the hook", () => {
    mockedUseCdaOffices.mockReturnValue({
      data: [
        { name: "SWT", longName: "Tulsa", type: "District" },
        { name: "MVD", longName: "Mississippi Valley", type: "Division" },
      ],
      isLoading: false,
      isPending: false,
      isError: false,
    } as ReturnType<typeof useCdaOffices>);

    render(<OfficeDropdown typeFilters={["district"]} onChange={vi.fn()} />);

    expect(screen.getByLabelText("Select an office")).toBeTruthy();
    expect(screen.getByText("Tulsa")).toBeTruthy();
    expect(screen.queryByText("Mississippi Valley")).toBeNull();
  });

  it("shows an error state from the hook", () => {
    mockedUseCdaOffices.mockReturnValue({
      data: [],
      isLoading: false,
      isPending: false,
      isError: true,
      error: new Error("network"),
    } as ReturnType<typeof useCdaOffices>);

    render(<OfficeDropdown onChange={vi.fn()} />);

    expect(screen.getByText(/Error loading office dropdown: network/i)).toBeTruthy();
  });
});
