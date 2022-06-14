import React, { createContext, useContext, useEffect, useState } from "react";

const PathContext = createContext();

const usePath = () => useContext(PathContext);

const PathContextProvider = ({ children }) => {
  const [anchorPath, setAnchorPath] = useState("");

  const [pathArr, setPathArr] = useState([]);

  const value = {
    anchorPath,
    setAnchorPath,
    pathArr,
    setPathArr,
  };

  return <PathContext.Provider value={value}>{children}</PathContext.Provider>;
};

export { usePath, PathContextProvider };
