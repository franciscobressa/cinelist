import type { ComponentType, SVGProps } from "react";
import { Link } from "react-router-dom";

type RouteItem = {
    path: string;
    label: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type HeaderNavProps = {
    routes: RouteItem[];
    activeRouteLabel?: string;
    variant?: "icons" | "text";
};

export default function HeaderNav({ routes, activeRouteLabel, variant = "text" }: HeaderNavProps) {
    if (variant === "icons") {
        return (
            <nav className="w-auto">
                <ul className="flex items-center gap-3">
                    {routes.map((route) => {
                        const Icon = route.icon;
                        const isActive = activeRouteLabel === route.label;
                        return (
                            <li key={route.path}>
                                <Link
                                    to={route.path}
                                    aria-label={route.label}
                                    className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                                        isActive
                                            ? "border-blue-500 bg-blue-500 text-white"
                                            : "border-transparent text-gray-200 hover:border-blue-400 hover:text-white"
                                    }`}
                                >
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                    <span className="sr-only">{route.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }

    return (
        <nav>
            <ul className="flex items-center gap-6 text-sm font-bold text-white">
                {routes.map((route) => {
                    const isActive = activeRouteLabel === route.label;
                    return (
                        <li
                            key={route.path}
                            className={`transition-colors ${
                                isActive
                                    ? "border-b-2 border-blue-500"
                                    : "hover:border-b-2 hover:border-blue-500 hover:text-gray-300"
                            }`}
                        >
                            <Link to={route.path} className="block px-1 py-0.5">
                                {route.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}


