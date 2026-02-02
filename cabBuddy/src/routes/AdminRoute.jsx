import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token") || localStorage.getItem("authToken");
  const userJson = localStorage.getItem("user");
  const user = userJson ? (() => { try { return JSON.parse(userJson); } catch { return null; } })() : null;

  if (!token) return <Navigate to="/login" replace />;
  if (!user || user.role !== "ADMIN") return <Navigate to="/home" replace />;

  return children;
};

export default AdminRoute;
