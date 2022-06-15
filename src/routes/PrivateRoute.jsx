import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// Helper
import JWTHelper from "../utils/JWTHelper";

const PrivateRoute = ({ children }) => {
  const { checkIsJWTValid } = JWTHelper;
  return checkIsJWTValid(localStorage.getItem("accessToken")) ? children : <Navigate to="/" />;
};

export default PrivateRoute;
