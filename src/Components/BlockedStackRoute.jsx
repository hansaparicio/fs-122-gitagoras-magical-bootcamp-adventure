import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BlockedStackRoute({ onBlocked }) {
    const navigate = useNavigate();

    useEffect(() => {
        onBlocked();              // abre el modal
        navigate("/stacks", { replace: true }); // vuelve al stack
    }, []);

    return null;
}
