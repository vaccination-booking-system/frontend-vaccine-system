import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PathContext = createContext();

const usePath = () => useContext(PathContext);

const PathContextProvider = ({ children }) => {
  const { pathname } = useLocation();

  const [anchorPath, setAnchorPath] = useState("");

  const [pathArr, setPathArr] = useState([]);

  const splitPathname = () => {
    let pathNameArr = pathname.split("/");
    pathNameArr.shift();
    setPathArr(pathNameArr);
  };

  useEffect(() => {
    splitPathname();
  }, [pathname]);

  useEffect(() => {
    if (pathArr !== []) {
      setAnchorPath(
        pathArr.find(
          path => path === "dashboard" || path === "booking-vaccine" || path === "family-member" || path === "ticket-vaccine" || path === "profile"
        )
      );
    }
  }, [pathArr]);

  const value = {
    anchorPath,
    setAnchorPath,
    pathArr,
    setPathArr,
  };

  return <PathContext.Provider value={value}>{children}</PathContext.Provider>;
};

export { usePath, PathContextProvider };
