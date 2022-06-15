import React from "react";
import { PathContextProvider } from "../context/PathContext";
import PrivateRoute from "./PrivateRoute";

const AuthRoute = ({ children }) => {
  return (
    <PrivateRoute>
      <PathContextProvider>{children}</PathContextProvider>
    </PrivateRoute>
  );
};

export default AuthRoute;
