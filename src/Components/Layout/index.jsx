import React from "react";
import { Sidebar } from "../";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className=" w-full ">
        <div className="relative h-[100vh] py-12 overflow-y-auto bg-[#DBF5FE]">
          <div className="relative z-50 px-8">{children}</div>
          <div className="bg-[#0A6C9D] w-full h-[100px] rounded-lg absolute top-0"></div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
