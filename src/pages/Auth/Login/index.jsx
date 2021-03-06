import React, { useState } from "react";
import { Navbar } from "../../../Components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import axiosInstance from "../../../network/apis";

function Login() {
  const [loginValue, setLoginValue] = useState({
    nik: "",
    password: "",
  });

  const { nik, password } = loginValue;
  const regexNik = /^[0-9]*$/;
  const [nikErrMsg, setNikErrMsg] = useState("");
  const [nikOrPassIncorrectMsg, setNikOrPassIncorrectMsg] = useState("");
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
    setNikErrMsg("");
    setPassErrMsg("");
    setNikOrPassIncorrectMsg("");
    if (nik === "" && password === "") {
      setNikErrMsg("NIK Tidak Boleh Kosong");
      setPassErrMsg("Password Tidak Boleh Kosong");
    } else if (nik === "") {
      setNikErrMsg("NIK Tidak Boleh Kosong");
    } else if ((nik.length > 0 && nik.length < 16) || !regexNik.test(nik)) {
      setNikErrMsg("NIK Tidak Valid");
    } else if (password === "") {
      setPassErrMsg("Password Tidak Boleh Kosong");
    } else {
      if (passErrMsg !== "" || nikErrMsg !== "" || nik.length !== 16) return;
      else {
        axiosInstance
          .post("/api/v1/auth/login", {
            nik,
            password,
          })
          .then(function (response) {
            localStorage.setItem("accessToken", response.data.data.accessToken);
            navigate("/dashboard");
          })
          .catch(function (error) {
            if (error.response.data.message === "INVALID_CREDENTIALS") {
              setNikOrPassIncorrectMsg("NIK atau Password Salah");
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
            <p className="mt-[8.2px] font-bold text-neutral-400 text-center">Masukan NIK dan Password anda untuk masuk</p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mt-[36.89px]">
                <label>NIK</label>
                <input
                  className={`${
                    nikErrMsg === "" ? "border-[#E2E8F0]" : "border-[#F4511E] bg-red-200"
                  } h-[51.24px] rounded-[15px] border-solid border-2 border-[#E2E8F0] pl-[20px]`}
                  placeholder="NIK anda"
                  type="text"
                  name="nik"
                  maxLength={16}
                  value={nik}
                  onChange={handleInput}
                  autoComplete="off"
                />
                <span className="text-red-500 text-xs">{nikErrMsg}</span>
              </div>
              <div className="flex flex-col mt-[27.67px]">
                <label>Password</label>
                <input
                  className={`${
                    passErrMsg === "" ? "border-[#E2E8F0]" : "border-[#F4511E] bg-red-200"
                  } h-[51.24px] rounded-[15px] border-solid border-2 border-[#E2E8F0] pl-[20px]`}
                  placeholder="Password anda"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleInput}
                />
              </div>
              <span className="text-xs text-red-500">
                {passErrMsg}
                {nikOrPassIncorrectMsg}
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
              <div className="mt-[22.55px]">
                <p className="text-center text-neutral-300">
                  Belum memiliki akun ?
                  <span className="font-bold text-neutral-400">
                    <Link to="/register">Daftar</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="w-[40%] h-[100%]">
          <div className=" relative bg-[url('https://img.freepik.com/free-photo/smiling-young-female-doctor-holding-clipboard-hospital_231208-13041.jpg?w=740&t=st=1654606849~exp=1654607449~hmac=34b2675bebad072295fb6a7ec5e3084ff03e8cc43f85c5e11202b217634d9b15')] w-[100%] h-[85%] rounded-bl-[25px] bg-cover bg-center">
            <div className="absolute bg-[#4FAEE5] w-[100%] h-[100%] rounded-bl-[25px] opacity-40 z-10"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
