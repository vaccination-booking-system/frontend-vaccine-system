import React from "react";
import { Sidebar } from "../";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="h-[100vh] overflow-y-scroll py-12 px-8 flex-1">{children}</div>
    </div>
  );
};

export default Layout;
