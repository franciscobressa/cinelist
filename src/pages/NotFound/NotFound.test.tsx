import { render, screen, fireEvent } from "@testing-library/react";
import NotFound from "./index";

const navigateMock = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigateMock,
}));

jest.mock("@/components/layouts/MainLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>,
}));

jest.mock("@/components/shared/Title", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <h1 data-testid="title">{children}</h1>,
}));

describe("NotFound page", () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it("should render not found message", () => {
    render(<NotFound />);

    expect(screen.getByTestId("title")).toHaveTextContent("404 - Página não encontrada");
    expect(screen.getByText(/A página que você está procurando/i)).toBeInTheDocument();
  });

  it("should navigate back to home when clicking button", () => {
    render(<NotFound />);

    fireEvent.click(screen.getByRole("button", { name: /Voltar para a página inicial/i }));

    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
