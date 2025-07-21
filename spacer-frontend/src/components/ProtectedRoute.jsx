import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("spacer_user");
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
