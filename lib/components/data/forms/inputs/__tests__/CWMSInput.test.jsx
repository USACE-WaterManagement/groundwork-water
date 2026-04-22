import { render, screen, fireEvent } from "@testing-library/react";
import { FormContext } from "../../CWMSForm";
import { CWMSInput } from "../CWMSInput";

describe("CWMSInput", () => {
  it("registers with the form context and propagates value changes", () => {
    const registerInput = vi.fn(() => vi.fn());
    const handleChange = vi.fn();

    render(
      <FormContext.Provider value={{ registerInput }}>
        <CWMSInput
          name="gage-height"
          label="Gage Height"
          defaultValue="12"
          onChange={handleChange}
        />
      </FormContext.Provider>,
    );

    const input = screen.getByDisplayValue("12");
    fireEvent.change(input, { target: { value: "15" } });

    expect(handleChange).toHaveBeenCalledWith("15");
    expect(screen.getByDisplayValue("15")).toBeTruthy();
    expect(registerInput).toHaveBeenCalled();

    const registration = registerInput.mock.calls.at(-1)?.[0];
    expect(registration.name).toBe("gage-height");
    expect(registration.label).toBe("Gage Height");
    expect(registration.getValues()).toEqual(["15"]);
  });
});
