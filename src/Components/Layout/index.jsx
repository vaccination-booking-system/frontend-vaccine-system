import React from "react";
import { Sidebar } from "../";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="h-[100vh] overflow-y-auto py-6 px-8 flex-1 bg-[#DBF5FE]">{children}</div>
    </div>
  );
};

export default Layout;
