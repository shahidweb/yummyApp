import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../shared/constants/routePaths";

type Props = {
    children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {
    const { user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    if (user?.role === "admin") {
        return <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;