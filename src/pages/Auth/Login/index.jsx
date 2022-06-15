import React, { useState } from "react";
import { Navbar } from "../../../Components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function Login() {
  const [loginValue, setLoginValue] = useState({
    nik: "",
    password: "",
  });

  const { nik, password } = loginValue;

  const [errMsg, setErrMsg] = useState("");
  const [nikOrPassIncorrectMsg, setNikOrPassIncorrectMsg] = useState("");

  const navigate = useNavigate();

  const handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginValue({
      ...loginValue,
      [name]: value,
    });
    if (name === "nik") {
      const regexNik = /^[0-9]*$/;
      if ((value.length > 0 && value.length < 16) || !regexNik.test(value)) {
        setErrMsg("NIK Tidak Valid");
      } else {
        if (value.length === 0 || value.length === 16) {
          setErrMsg("");
        }
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (errMsg !== "" || nik.length !== 16) {
      alert("ada data yang tidak sesuai");
    } else {
      axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
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
  };
  useEffect(() => {
    if (nik !== "" || password !== "") {
      setNikOrPassIncorrectMsg("");
    }
  }, [nik, password]);

  useEffect(() => {
    if (nikOrPassIncorrectMsg !== "") {
      setTimeout(() => {
        setNikOrPassIncorrectMsg("");
      }, 5000);
    }
  }, [nikOrPassIncorrectMsg]);

  return (
    <>
      <Navbar path="login" />
      <div className="h-[790px] flex justify-center items-center">
        <div className="w-[60%] h-[100%] flex justify-center items-center">
          <div className="w-[435px] h-[456px]">
            <h1 className="text-[32px] font-bold">Welcome Back</h1>
            <p className="mt-[8.2px] font-bold text-neutral-400">Enter your NIK and Password to sign in</p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mt-[36.89px]">
                <label>NIK</label>
                <input
                  className={`${
                    errMsg === "" ? "border-[#E2E8F0]" : "border-[#F4511E] bg-red-200"
                  } h-[51.24px] rounded-[15px] border-solid border-2 border-[#E2E8F0] pl-[20px]`}
                  placeholder="Your NIK"
                  type="text"
                  name="nik"
                  maxLength={16}
                  required
                  value={nik}
                  onChange={handleInput}
                  autoComplete="off"
                />
                <span className="text-red-500 text-xs">{errMsg}</span>
              </div>
              <div className="flex flex-col mt-[27.67px]">
                <label>Password</label>
                <input
                  className="h-[51.24px] rounded-[15px] border-solid border-2 border-[#E2E8F0] pl-[20px]"
                  placeholder="Your password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleInput}
                  required
                />
              </div>
              <span className="text-xs text-red-500">{nikOrPassIncorrectMsg}</span>
              <div className="mt-[22px]">
                <label className="inline-flex relative items-center cursor-pointer">
                  <input type="checkbox" value="" id="default-toggle" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Remember Me</span>
                </label>
              </div>
              <div className="mt-[18.89px]">
                <input className="h-[46.12px] w-[100%] bg-slate-900 text-white rounded-[8px] cursor-pointer" type="submit" value="SIGN IN" />
              </div>
              <div className="mt-[22.55px]">
                <p className="text-center text-neutral-300">
                  Don't have an account ?
                  <span className="font-bold text-neutral-400">
                    <Link to="/register">Sign Up</Link>
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
