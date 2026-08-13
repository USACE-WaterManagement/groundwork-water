import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AuthProvider, AuthMethod } from "../AuthProvider";
import { useAuth } from "../useAuth";

function Consumer() {
  const auth = useAuth();

  return (
    <>
      <button onClick={() => auth.login()}>login</button>
      <div data-testid="is-auth">{String(auth.isAuth)}</div>
    </>
  );
}

describe("AuthProvider", () => {
  it("refetches auth status immediately after a successful login", async () => {
    const method: AuthMethod = {
      login: vi.fn().mockResolvedValue(undefined),
      logout: vi.fn().mockResolvedValue(undefined),
      isAuth: vi.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true),
    };

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider method={method}>
          <Consumer />
        </AuthProvider>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("is-auth").textContent).toBe("false");
    });

    screen.getByText("login").click();

    await waitFor(() => {
      expect(screen.getByTestId("is-auth").textContent).toBe("true");
    });

    expect(method.login).toHaveBeenCalledTimes(1);
    expect(method.isAuth).toHaveBeenCalledTimes(2);
  });
});
