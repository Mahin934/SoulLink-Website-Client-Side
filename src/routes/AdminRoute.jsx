import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    // Show a loading indicator while checking authentication or admin status
    if (loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>;
    }

    // If the user is authenticated and is an admin, render the children (protected route)
    if (user && isAdmin) {
        return children;
    }

    // Redirect to the home page or desired route if not authorized
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
