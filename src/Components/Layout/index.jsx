import React from "react";
import { useSelector } from "react-redux";
import { Sidebar } from "../";
import Footer from "../Footer";

const Layout = ({ children }) => {
  const { getUserByIdLoading, getUserByIdResult, getUserByIdError } = useSelector(state => state.userId);
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <div className="relative h-[100vh] overflow-y-auto bg-[#DBF5FE]">
          <div className="relative z-50 px-8 py-12">{children}</div>
          <div className="bg-[#0A6C9D] w-full h-[100px] rounded-lg absolute top-0"></div>
          {getUserByIdResult ? <Footer /> : ""}
        </div>
      </div>
    </div>
  );
};

export default Layout;
