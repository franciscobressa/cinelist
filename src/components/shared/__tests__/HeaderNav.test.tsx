import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import HeaderNav from "@/components/shared/HeaderNav";

const HomeIcon = () => <svg data-testid="icon-home" />;
const FavoritesIcon = () => <svg data-testid="icon-favorites" />;

const routes = [
  { path: "/", label: "Início", icon: HomeIcon },
  { path: "/favorites", label: "Favoritos", icon: FavoritesIcon },
];

describe("HeaderNav", () => {
  it("should render navigation links with text variant", () => {
    const { getByText } = render(
      <MemoryRouter>
        <HeaderNav routes={routes} variant="text" />
      </MemoryRouter>
    );

    expect(getByText("Início")).toHaveAttribute("href", "/");
    expect(getByText("Favoritos")).toHaveAttribute("href", "/favorites");
  });

  it("should highlight the active route in text variant", () => {
    const { getByText } = render(
      <MemoryRouter>
        <HeaderNav routes={routes} activeRouteLabel="Favoritos" variant="text" />
      </MemoryRouter>
    );

    const activeLink = getByText("Favoritos").parentElement;
    expect(activeLink?.className).toContain("border-b-2 border-blue-500");
  });

  it("should render icons in icon variant", () => {
    const { getByLabelText, getByTestId } = render(
      <MemoryRouter>
        <HeaderNav routes={routes} variant="icons" />
      </MemoryRouter>
    );

    expect(getByLabelText("Início")).toHaveAttribute("href", "/");
    expect(getByTestId("icon-home")).toBeInTheDocument();
    expect(getByTestId("icon-favorites")).toBeInTheDocument();
  });
});

