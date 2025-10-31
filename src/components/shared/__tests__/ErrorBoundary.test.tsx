import { render, screen } from "@testing-library/react";

import ErrorBoundary from "@/components/shared/ErrorBoundary";

const ThrowError = ({ message }: { message: string }) => {
  throw new Error(message);
};

describe("ErrorBoundary", () => {
  const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it("should render children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <div data-testid="content">Hello</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("should display fallback component when provided", () => {
    const fallbackText = "Custom fallback";

    render(
      <ErrorBoundary fallback={<div>{fallbackText}</div>}>
        <ThrowError message="boom" />
      </ErrorBoundary>
    );

    expect(screen.getByText(fallbackText)).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("should render default error UI when no fallback is provided", () => {
    render(
      <ErrorBoundary>
        <ThrowError message="default boom" />
      </ErrorBoundary>
    );

    expect(screen.getByText("Ops! Algo deu errado")).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});

