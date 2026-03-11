import React from "react";
import { Navigate, Outlet, replace } from "react-router-dom";
import Cookies from "js-cookie";
const PublicRoute = () => {
      const cookieToken = Cookies.get("auth_token");
  
  if (cookieToken) {
    return <Navigate to="/updateProfile" replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
