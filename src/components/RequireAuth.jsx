// src/components/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children, allowedPlans }) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const plan = localStorage.getItem("plan"); // We'll store this on login

  const location = useLocation();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (allowedPlans && !allowedPlans.includes(plan)) {
    return <Navigate to="/dashboard/free" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
