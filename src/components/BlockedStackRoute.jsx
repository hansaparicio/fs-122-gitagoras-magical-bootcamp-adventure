import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BlockedStackRoute({ onBlocked }) {
    const navigate = useNavigate();

    useEffect(() => {
        onBlocked();
        navigate("/stacks", { replace: true });
    }, []);

    return null;
}
