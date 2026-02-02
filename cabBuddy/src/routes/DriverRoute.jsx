import { Navigate } from "react-router-dom";

const DriverRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user || user.role !== "DRIVER") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default DriverRoute;
