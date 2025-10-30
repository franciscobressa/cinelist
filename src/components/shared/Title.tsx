export default function Title({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <h1 className={`text-2xl font-bold mb-6 text-white ${className || ""}`}>
            {children}
        </h1>
    );
}

