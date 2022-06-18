import React from "react";
import { Sidebar } from "../";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="relative w-full">
        <div className="h-[100vh] overflow-y-auto py-12 px-8 flex-1 bg-[#DBF5FE]">{children}</div>
        <div className="bg-[#0A6C9D] w-full h-[100px] rounded-lg absolute top-0"></div>
      </div>
    </div>
  );
};

export default Layout;
