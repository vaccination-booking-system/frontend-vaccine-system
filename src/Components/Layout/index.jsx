import React, { useEffect } from "react";
import { useJwt } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../";
import { fetchUserById } from "../../store/slice/users/GetUsers";
import Footer from "../Footer";

const Layout = ({ children }) => {
  const { getUserByIdLoading, getUserByIdResult, getUserByIdError } = useSelector(state => state.userId);
  const dispatch = useDispatch();

  const { decodedToken, isExpired } = useJwt(localStorage.getItem("accessToken"));

  console.log({ decodedToken, isExpired });

  useEffect(() => {
    console.log({ decodedToken });
    if (decodedToken !== null) {
      const userId = decodedToken.user_id;
      dispatch(fetchUserById({ token: localStorage.getItem("accessToken"), userId }));
    }
  }, [decodedToken]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <div className="relative h-[100vh] overflow-y-auto bg-[#DBF5FE]">
          <div className="relative z-50 px-8 py-12">{children}</div>
          <div className="bg-[#0A6C9D] w-full h-[100px] rounded-lg absolute mt-[17px] top-0"></div>
          {getUserByIdResult ? <Footer /> : ""}
        </div>
      </div>
    </div>
  );
};

export default Layout;
