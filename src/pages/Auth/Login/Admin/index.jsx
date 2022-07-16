import React, { useState } from "react";
import { Navbar } from "../../../../Components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import axiosInstance from "../../../../network/apis";
import adminLogin from "../../../../../src/assets/images/admin-login.png";

function AdminLogin() {
  const [loginValue, setLoginValue] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginValue;
  const [usernameErrMsg, setUsernameErrMsg] = useState("");
  const [usernameOrPassIncorrectMsg, setUsernameOrPassIncorrectMsg] = useState("");
  const [passErrMsg, setPassErrMsg] = useState("");

  const navigate = useNavigate();

  const handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginValue({
      ...loginValue,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUsernameErrMsg("");
    setPassErrMsg("");
    setUsernameOrPassIncorrectMsg("");
    if (username === "" && password === "") {
      setUsernameErrMsg("Username Tidak Boleh Kosong");
      setPassErrMsg("Password Tidak Boleh Kosong");
    } else if (username === "") {
      setUsernameErrMsg("Username Tidak Boleh Kosong");
    } else if (password === "") {
      setPassErrMsg("Password Tidak Boleh Kosong");
    } else {
      if (passErrMsg !== "" || usernameErrMsg !== "") return;
      else {
        axiosInstance
          .post("/api/v1/admin/login", {
            username,
            password,
          })
          .then(function (response) {
            localStorage.setItem("accessToken", response.data.data.accessToken);
            navigate("/dashboard");
          })
          .catch(function (error) {
            if (error.response.data.message === "INVALID_CREDENTIALS") {
              setUsernameOrPassIncorrectMsg("Username atau Password Salah");
            }
          });
      }
    }
  };
  return (
    <>
      <Navbar path="login" />
      <div className="h-[790px] flex justify-center items-center">
        <div className="w-[60%] h-[100%] flex justify-center items-center">
          <div className="w-[435px] h-[456px]">
            <h1 className="text-[32px] font-bold text-center">Selamat Datang</h1>
            <p className="mt-[8.2px] font-bold text-neutral-400 text-center">Masukan email dan password anda untuk masuk</p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mt-[36.89px]">
                <label>Username</label>
                <input
                  className={`${
                    usernameErrMsg === "" ? "border-[#E2E8F0]" : "border-[#F4511E] bg-red-200"
                  } h-[51.24px] rounded-[15px] border-solid border-2 border-[#E2E8F0] pl-[20px]`}
                  placeholder="Masukkan Username Anda"
                  type="text"
                  name="username"
                  maxLength={16}
                  value={username}
                  onChange={handleInput}
                  autoComplete="off"
                />
                <span className="text-red-500 text-xs">{usernameErrMsg}</span>
              </div>
              <div className="flex flex-col mt-[27.67px]">
                <label>Password</label>
                <input
                  className={`${
                    passErrMsg === "" ? "border-[#E2E8F0]" : "border-[#F4511E] bg-red-200"
                  } h-[51.24px] rounded-[15px] border-solid border-2 border-[#E2E8F0] pl-[20px]`}
                  placeholder="Masukkan Password Anda"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleInput}
                />
              </div>
              <span className="text-xs text-red-500">
                {passErrMsg}
                {usernameOrPassIncorrectMsg}
              </span>
              <div className="mt-[22px]">
                <label className="inline-flex relative items-center cursor-pointer">
                  <input type="checkbox" value="" id="default-toggle" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Ingat Saya</span>
                </label>
              </div>
              <div className="mt-[18.89px]">
                <input className="h-[46.12px] w-[100%] bg-slate-900 text-white rounded-[8px] cursor-pointer" type="submit" value="MASUK" />
              </div>
            </form>
          </div>
        </div>
        <div className="w-[40%] h-[100%]">
          <div className="relative w-[100%] h-[85%] rounded-bl-[25px] bg-cover bg-center" style={{ backgroundImage: `url(${adminLogin})` }}>
            <div className="absolute bg-[#4FAEE5] w-[100%] h-[100%] rounded-bl-[25px] opacity-40 z-10"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
