import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedStackRoute({
    children,
    allowed,
    onBlocked
}) {
    const location = useLocation();

    if (!allowed) {
        onBlocked();
        return <Navigate to="/stacks" replace state={{ from: location }} />;
    }

    return children;
}
