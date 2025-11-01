import type { ButtonHTMLAttributes, ReactNode } from "react";

const baseClasses = "rounded-lg px-6 py-2.5 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300";
const variants: Record<"primary" | "outline", string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-600/10",
};

export type ActionButtonProps = {
    children: ReactNode;
    variant?: "primary" | "outline";
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function ActionButton({
    children,
    variant = "primary",
    className = "",
    type = "button",
    ...rest
}: ActionButtonProps) {
    return (
        <button
            type={type}
            className={`${baseClasses} ${variants[variant]} ${className}`.trim()}
            {...rest}
        >
            {children}
        </button>
    );
}
