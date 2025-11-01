import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import Title from "@/components/shared/Title";
import ActionButton from "@/components/shared/ActionButton";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <MainLayout>
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
                <Title className="text-3xl">404 - Página não encontrada</Title>
                <p className="max-w-xl text-gray-300">
                    A página que você está procurando pode ter sido removida, renomeada ou está temporariamente indisponível.
                </p>
                <ActionButton onClick={() => navigate("/")}>
                    Voltar para a página inicial
                </ActionButton>
            </div>
        </MainLayout>
    );
}
