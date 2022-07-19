import React, { useEffect } from "react";
import { useJwt } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { addMember, fetchUserById, setMemberOwner } from "../store/slice";

// Helper
import JWTHelper from "../utils/JWTHelper";

const PrivateRoute = ({ children }) => {
  const { checkIsJWTValid } = JWTHelper;

  const dispatch = useDispatch();

  const { decodedToken } = useJwt(localStorage.getItem("accessToken"));

  useEffect(() => {
    if (decodedToken !== null) {
      const id = decodedToken.is_admin ? decodedToken.admin_id : decodedToken.user_id;
      dispatch(fetchUserById({ token: localStorage.getItem("accessToken"), id, isAdmin: decodedToken.is_admin }));
    }
  }, [decodedToken]);

  return checkIsJWTValid(localStorage.getItem("accessToken")) ? children : <Navigate to="/" />;
};

export default PrivateRoute;
