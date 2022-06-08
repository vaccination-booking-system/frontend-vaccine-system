import React, { useState } from "react";
import Navbar from "../../../Components/Navbar";

function Login() {
  const emptyLoginForm = {
    nik: "",
    password: "",
  };
  const [data, setData] = useState(emptyLoginForm);
  const regex = /^[0-9]*$/;
  const [errMsg, setErrMsg] = useState("");
  const handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "nik") {
      if (regex.test(value)) {
        setErrMsg("");
      } else {
        setErrMsg("NIK harus berupa angka ya mniez !!!!");
      }
    }
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (errMsg !== "") {
      alert("ada data yang tidak sesuai");
    } else {
      alert("Login berhasil");
      console.log(data);
    }
  };

  return (
    <>
      <Navbar path="login" />
      <div className="h-[100vh] flex justify-center items-center">
        <div className="w-[60%] h-[100%] flex justify-center items-center">
          <div className="w-[435px] h-[456px]">
            <h1 className="text-[32px] font-bold">Welcome Back</h1>
            <p className="mt-[8.2px] font-bold text-neutral-400">Enter your NIK and Password to sign in</p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mt-[36.89px]">
                <label>NIK</label>
                <input
                  className="h-[51.24px] rounded-[15px] border-solid border-2 border-[#E2E8F0] pl-[20px]"
                  placeholder="Your NIK"
                  type="text"
                  name="nik"
                  maxLength={16}
                  required
                  value={data.nik}
                  onChange={handleInput}
                  autoComplete="off"
                ></input>
              </div>
              <div className="flex flex-col mt-[27.67px]">
                <label>Password</label>
                <input
                  className="h-[51.24px] rounded-[15px] border-solid border-2 border-[#E2E8F0] pl-[20px]"
                  placeholder="Your password"
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleInput}
                  required
                ></input>
              </div>
              <div className="mt-[22px]">
                <label className="inline-flex relative items-center cursor-pointer">
                  <input type="checkbox" value="" id="default-toggle" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Remember Me</span>
                </label>
              </div>
              <div className="mt-[18.89px]">
                <span className="text-red-500">{errMsg}</span>
                <br />
                <input className="h-[46.12px] w-[100%] bg-slate-900 text-white rounded-[8px]" type="submit" value="SIGN IN" />
              </div>
              <div className="mt-[22.55px]">
                <p className="text-center text-neutral-300">
                  Don't have an account ?
                  <a className="font-bold text-neutral-400" href="#">
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="w-[40%] h-[100%]">
          <div className="bg-[url('https://img.freepik.com/free-photo/smiling-young-female-doctor-holding-clipboard-hospital_231208-13041.jpg?w=740&t=st=1654606849~exp=1654607449~hmac=34b2675bebad072295fb6a7ec5e3084ff03e8cc43f85c5e11202b217634d9b15')] w-[100%] h-[85%] rounded-bl-[25px] bg-cover bg-center">
            <div className="absolute bg-[#4FAEE5] w-[40%] h-[85%] rounded-bl-[25px] opacity-40 z-10"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
