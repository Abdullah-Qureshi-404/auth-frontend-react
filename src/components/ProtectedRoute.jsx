import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
const ProtectedRoute = () => {
    const cookieToken = Cookies.get("auth_token");
  
  if (!cookieToken) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
