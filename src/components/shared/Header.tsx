import SearchBar from "./SearchBar";
import Logo from "./Logo";
import HeaderNav from "./HeaderNav";

export default function Header() {
    const routes = [
        { path: "/", label: "Home" },
        { path: "/favorites", label: "Favoritos" },
    ];
    const activeRoute = routes.find((route) => route.path === window.location.pathname);
    const activeRouteLabel = activeRoute?.label;
    return (
        <header
            className="
                bg-gray-800 py-4 px-6
                flex flex-col gap-4 items-center justify-center
                md:flex-row md:justify-between md:gap-6
                shadow-lg"
        >
            <Logo />
            <SearchBar />
            <HeaderNav routes={routes} activeRouteLabel={activeRouteLabel} />
        </header>
    );
}