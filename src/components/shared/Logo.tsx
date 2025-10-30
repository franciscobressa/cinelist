import { useNavigate } from "react-router-dom";

export default function Logo() {
    const navigate = useNavigate();
    return (
        <img onClick={() => navigate("/")} src="/images/logo.png" alt="CineList" className="h-12 cursor-pointer" />
    );
}


