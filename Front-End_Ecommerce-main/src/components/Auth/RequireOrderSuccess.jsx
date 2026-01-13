import { Navigate, useLocation } from "react-router-dom";

const RequireOrderSuccess = ({ children }) => {
    const location = useLocation();

    if (!location.state?.orderData) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RequireOrderSuccess;
