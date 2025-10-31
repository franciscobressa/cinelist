import { HomeIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";

import HeaderNav from "./HeaderNav";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function Header() {
    const routes = [
        { path: "/", label: "Home", icon: HomeIcon },
        { path: "/favorites", label: "Favoritos", icon: HeartIcon },
    ];
    const location = useLocation();
    const activeRoute = routes.find((route) => route.path === location.pathname);
    const activeRouteLabel = activeRoute?.label;

    return (
        <header className="bg-gray-800 py-4 px-4 shadow-lg">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
                <div className="flex w-full items-center justify-between md:w-auto md:flex-none md:justify-start">
                    <Logo />
                    <div className="md:hidden">
                        <HeaderNav routes={routes} activeRouteLabel={activeRouteLabel} variant="icons" />
                    </div>
                </div>
                <div className="w-full md:flex-1 md:max-w-lg">
                    <SearchBar />
                </div>
                <div className="hidden md:block md:flex-none">
                    <HeaderNav routes={routes} activeRouteLabel={activeRouteLabel} variant="text" />
                </div>
            </div>
        </header>
    );
}