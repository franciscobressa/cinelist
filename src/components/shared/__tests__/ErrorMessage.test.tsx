import { fireEvent, render } from "@testing-library/react";

import ErrorMessage from "@/components/shared/ErrorMessage";

describe("ErrorMessage", () => {
  it("should render provided title and message", () => {
    const { getByText } = render(
      <ErrorMessage title="Falha" message="Não carregou" />
    );

    expect(getByText("Falha")).toBeInTheDocument();
    expect(getByText("Não carregou")).toBeInTheDocument();
  });

  it("should call retry callback when button clicked", () => {
    const onRetry = jest.fn();
    const { getByText } = render(<ErrorMessage onRetry={onRetry} />);

    fireEvent.click(getByText("Tentar Novamente"));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});

