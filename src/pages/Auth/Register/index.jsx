import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackgroundRegister from "../../../assets/images/background-register.jpg";
import { Button, Navbar } from "../../../Components";
import { Card } from "../../../Components";
import axios from "axios";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../../../network/apis";

const Register = () => {
  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [nikErrorMsg, setNikErrorMsg] = useState("");
  const [phoneNumberErrorMsg, setPhoneNumberErrorMsg] = useState("");
  const [nameErrorMsg, setNameErroMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const checkIsFormError = () => {
    return (
      name === "" ||
      nik === "" ||
      phoneNumber === "" ||
      password === "" ||
      nikErrorMsg !== "" ||
      phoneNumberErrorMsg !== "" ||
      nameErrorMsg !== "" ||
      passwordErrorMsg !== ""
    );
  };

  const handleInputChange = event => {
    const { name, value } = event.target;

    if (name === "nameForm") {
      checkNama(value);
      setName(value);
    }
    if (name === "nikForm") {
      checkNikLength(value);
      setNik(value);
    }
    if (name === "number_phoneForm") {
      checkNumberPhone(value);
      setPhoneNumber(value);
    }
    if (name === "passwordForm") {
      checkPassword(value);
      setPassword(value);
    }
  };

  const checkNikLength = value => {
    const regexNik = /^[0-9]*$/;
    if ((value.length > 0 && value.length < 16) || !regexNik.test(value)) {
      setNikErrorMsg("NIK Tidak Valid");
    } else if ((value.length === 16 || value.length === 0) && nikErrorMsg !== "") {
      setNikErrorMsg("");
    }
  };

  const checkNama = value => {
    /* const regexNama = /^[a-zA-Z ]*$/gim;
    /* const regexTest = /^[^-\s][a-zA-Z\s-]+$/gim; */
    const regexNama = /^[^-\0-9][a-zA-Z ]*$/gim;

    if (value.length > 0 && regexNama.test(value)) {
      setNameErroMsg("");
    } /* else if (value > 0 && !regexNama.test(value)) {
      setNameErroMsg("Nama tidak boleh ada angka");
    } */ else if (value.length > 0 && !regexNama.test(value)) {
      setNameErroMsg("Nama tidak sesuai format");
    }

    if (value.length === 0) {
      setNameErroMsg("");
    }
  };

  const checkNumberPhone = value => {
    const regexPhone = /^08+[0-9]*$/;
    const regexNumber = /[0-9]/gim;

    if (value.length > 0 && !regexPhone.test(value)) {
      setPhoneNumberErrorMsg("Input dimulai dengan 08 & harus berupa angka");
    } else if (value.length > 1 && regexPhone.test(value)) {
      setPhoneNumberErrorMsg("");
      if (value.length < 12) {
        setPhoneNumberErrorMsg("Nomor HP kurang");
      }
    }
    if (value.length === 0) {
      setPhoneNumberErrorMsg("");
    }
  };

  const checkPassword = value => {
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$-_*#?&\s])[A-Za-z\d@$!#-_?&\s]{0,}$/gm;
    if (value.length < 8) {
      setPasswordErrorMsg("minimal 8 karakter");
      if (!regexPassword.test(value)) {
        setPasswordErrorMsg("Minimal 1 Huruf besar, dan terdapat 1 Angka");
      }
      if (regexPassword.test(value)) {
        setPasswordErrorMsg(" ");
      }
    } else if (value.length > 7 && regexPassword.test(value)) {
      setPasswordErrorMsg("");
    }
    if (value.length === 0) {
      setPasswordErrorMsg("");
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosInstance
      .post("/api/v1/auth/register", {
        name,
        phone_number: phoneNumber,
        nik,
        password,
      })
      .then(function (response) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        navigate("/dashboard");
      })
      .catch(function (error) {
        if (error.response.data.message === "ALREADY_EXIST") {
          setNikErrorMsg("NIK sudah terdaftar.");
        }
        if (error.response.data.message === "INVALID_NIK") {
          setNikErrorMsg("NIK Tidak Valid.");
        }
      });
  };

  return (
    <>
      {/* ini div navbar atau header */}
      <Navbar path="register" />
      <div className="flex flex-col justify-center items-center h-[720px] p-6">
        {/* ini div table form */}
        <div className="h-[50%] w-[100%] bg-cover rounded-[15px] bg-bottom relative" style={{ backgroundImage: `url(${BackgroundRegister})` }}>
          <div className="absolute bg-[#4FAEE5] w-[100%] h-[100%] opacity-40 rounded-[15px] z-10"></div>
          <div className="flex justify-center z-20">
            <div className="my-[65px] z-30">
              <div className="text-white text-center">
                <div className="font-bold text-[32px]">Selamat Datang!</div>
                <div className="w-[333px]">
                  <div className="text-[14px]">Silahkan Masukkan data pribadi anda untuk melakukan pendaftaran vaksin.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[50%] bg-white w-[100%]"></div>
        <div className="z-20 drop-shadow-md absolute mt-[180px]">
          <Card padding="48px 0px">
            <div>
              <h1 className="font-bold px-[50px] text-[25px]">Buat Akun Baru</h1>
              <form onSubmit={handleSubmit}>
                <div className="flex gap-x-12 px-[50px] pt-[42px]">
                  <div>
                    <label htmlFor="nameForm">Nama</label>
                    <div className="pt-[6px]">
                      <input
                        type="text"
                        placeholder="Masukkan Nama Lengkap Anda"
                        name="nameForm"
                        className={`${
                          nameErrorMsg === "" ? "border-[#E2E8F0]" : "border-[#F4511E] bg-red-200"
                        } rounded-[15px] pl-[20px] border-2 border-[#E2E8F0]`}
                        style={{ width: "370px", height: "50px" }}
                        value={name}
                        title="Isikan Nama Lengkap Anda"
                        onChange={event => handleInputChange(event)}
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className="pl-2 pt-1">
                      <div className="text-xs text-red-700">{nameErrorMsg}</div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="nikForm">Nomor Induk Kependudukan</label>
                    <div className="pt-[6px]">
                      <input
                        type="text"
                        placeholder="Masukkan NIK Anda"
                        name="nikForm"
                        className={`${
                          nikErrorMsg === "" ? "border-[#E2E8F0]" : "border-[#F4511E] bg-red-200"
                        } rounded-[15px] pl-[20px] border-2 border-[#E2E8F0]`}
                        style={{ width: "370px", height: "50px" }}
                        value={nik}
                        title="Isikan NIK Anda"
                        onChange={event => handleInputChange(event)}
                        maxLength={16}
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className="pl-2 pt-1">
                      <div className="text-xs text-red-700">{nikErrorMsg}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-x-12 pl-[50px] pt-[24px]">
                    <div>
                      <label htmlFor="number_phoneForm">Nomor Telepon</label>
                      <div className="pt-[6px]">
                        <input
                          type="text"
                          placeholder="Masukkan Nomor Telepon Anda"
                          name="number_phoneForm"
                          className={`${
                            phoneNumberErrorMsg === "" ? "border-[#E2E8F0]" : "border-[#F4511E] bg-red-200"
                          } rounded-[15px] pl-[20px] border-2 border-[#E2E8F0]`}
                          style={{ width: "370px", height: "50px" }}
                          value={phoneNumber}
                          title="Isikan Nomor Telepon Anda"
                          onChange={event => handleInputChange(event)}
                          maxLength={13}
                          autoComplete="off"
                          required
                        />
                      </div>
                      <div className="pl-2 pt-1">
                        <div className="text-xs text-red-700">{phoneNumberErrorMsg}</div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="passwordForm">Password</label>
                      <div className="pt-[6px] relative ">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Masukkan Password Anda"
                          name="passwordForm"
                          className={`${
                            passwordErrorMsg === "" ? "border-[#E2E8F0]" : "border-[#F4511E] bg-red-200"
                          } rounded-[15px] pl-[20px] border-2 border-[#E2E8F0]`}
                          style={{ width: "370px", height: "50px" }}
                          value={password}
                          title="Isikan Password Anda"
                          onChange={event => handleInputChange(event)}
                          minLength={8}
                          autoComplete="off"
                          required
                        />
                        <div className="absolute inset-y-[40%] right-5 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
                        </div>
                      </div>
                      <div className="pl-2 pt-1">
                        <div className="text-xs text-red-700">{passwordErrorMsg}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center pt-[50px]">
                  <Button
                    btnSize="lg"
                    cursor={checkIsFormError() ? "not-allowed" : null}
                    bg={checkIsFormError() ? "#CACACA" : "black"}
                    color={checkIsFormError() ? "black" : "white"}
                    fontSize="12px"
                  >
                    DAFTAR
                  </Button>
                </div>
              </form>
              <div className="text-[14px] flex justify-center gap-1 pt-6">
                <div className="text-[#A0AEC0]">Already have an account? </div>
                <div className="font-bold text-[#C4C4C4]">
                  <Link to="/login">Sign In</Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Register;
