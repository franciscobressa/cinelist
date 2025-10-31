import { act, render, screen } from "@testing-library/react";

import { ToastProvider, useToast } from "@/context/ToastContext";

function TestComponent() {
  const { showToast } = useToast();

  return (
    <button onClick={() => showToast("Olá!", "success")}>Show</button>
  );
}

describe("ToastProvider", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should display and auto-dismiss toast", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    act(() => {
      screen.getByText("Show").click();
    });

    expect(screen.getByText("Olá!")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(screen.queryByText("Olá!")).not.toBeInTheDocument();
  });
});

