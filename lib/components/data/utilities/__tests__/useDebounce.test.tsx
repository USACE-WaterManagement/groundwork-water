import { act, render, screen } from "@testing-library/react";
import { useDebounce } from "../useDebounce";
import { useEffect, useState } from "react";

function DebounceHarness({ value, delay }: { value: string; delay: number }) {
  const debounced = useDebounce(value, delay);
  return <div data-testid="debounced-value">{debounced}</div>;
}

function DebounceStateHarness({ delay }: { delay: number }) {
  const [value, setValue] = useState("alpha");
  const debounced = useDebounce(value, delay);

  useEffect(() => {
    setValue("beta");
  }, []);

  return <div data-testid="debounced-state-value">{debounced}</div>;
}

describe("useDebounce", () => {
  it("returns the current value on first render", () => {
    render(<DebounceHarness value="initial" delay={200} />);

    expect(screen.getByTestId("debounced-value").textContent).toBe("initial");
  });

  it("updates after the debounce delay", async () => {
    vi.useFakeTimers();
    const { rerender } = render(<DebounceHarness value="alpha" delay={200} />);

    rerender(<DebounceHarness value="beta" delay={200} />);
    expect(screen.getByTestId("debounced-value").textContent).toBe("alpha");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);
    });
    expect(screen.getByTestId("debounced-value").textContent).toBe("beta");
    vi.useRealTimers();
  });

  it("debounces state updates triggered after mount", async () => {
    vi.useFakeTimers();
    render(<DebounceStateHarness delay={150} />);

    expect(screen.getByTestId("debounced-state-value").textContent).toBe("alpha");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(150);
    });
    expect(screen.getByTestId("debounced-state-value").textContent).toBe("beta");
    vi.useRealTimers();
  });
});
