import React from "react";

import { Navigate } from "react-router-dom";

// Helper
import JWTHelper from "../utils/JWTHelper";

const PublicRoute = ({ children }) => {
  const { checkIsJWTValid } = JWTHelper;
  return checkIsJWTValid(localStorage.getItem("accessToken")) ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
