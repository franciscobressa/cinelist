import { Link } from "react-router-dom";

type RouteItem = {
    path: string;
    label: string;
};

export default function HeaderNav({ routes, activeRouteLabel }: { routes: RouteItem[]; activeRouteLabel?: string }) {
    return (
        <nav>
            <ul className="flex items-center gap-4">
                {routes.map((route) => (
                    <li key={route.path} className={`font-bold text-white hover:text-gray-300 hover:border-b-2 hover:border-blue-500 ${activeRouteLabel === route.label ? "border-b-2 border-blue-500" : ""}`}><Link to={route.path}>{route.label}</Link></li>
                ))}
            </ul>
        </nav>
    );
}


