import React, { useState } from "react";
import BackgroundRegister from "../../../assets/images/background-register.jpg";
import Navbar from "../../../Components/Navbar";
import Card from "../../../Components/Card";

const Register = () => {
  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = event => {
    const { name, value } = event.target;
    //console.log(event);
    /* name = name atribut yang ada pada tag input */
    /* value = value atribut pada tag input */

    if (name === "nameForm") {
      setName(value);
    }
    if (name === "nikForm") {
      setNik(value);
    }
    if (name === "number_phoneForm") {
      setPhoneNumber(value);
    }
    if (name === "passwordForm") {
      setPassword(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(name);
    console.log(nik);
    console.log(phoneNumber);
    console.log(password);
  };

  return (
    <>
      <div>
        {/* ini div navbar atau header */}
        <Navbar path="register" />
      </div>
      <div className="flex flex-col justify-center items-center h-[790px] p-6">
        {/* ini div table form */}
        <div className="h-[50%] w-[100%] bg-cover rounded-[15px] bg-bottom relative" style={{ backgroundImage: `url(${BackgroundRegister})` }}>
          <div className="absolute bg-[#4FAEE5] w-[100%] h-[100%] opacity-40 rounded-[15px] z-10"></div>
          <div className="flex justify-center z-20">
            <div className="my-[65px] z-30">
              <div className="text-white text-center">
                <div className="font-bold text-[32px]">Welcome!</div>
                <div className="w-[333px]">
                  <div className="text-[14px]">Silahkan Masukkan data pribadi anda untuk melakukan pendaftaran vaksin.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[50%] bg-white w-[100%]"></div>
        <div className="z-20 drop-shadow-md absolute mt-[130px]">
          <Card>
            <div className="">
              <div className="font-bold px-[50px] pt-[75px] text-[25px]">Buat Akun Baru</div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className="flex gap-x-12 px-[50px] pt-[42px]">
                      <div>
                        <div>
                          <label htmlFor="nameForm">Name</label>
                        </div>
                        <div className="pt-[6px]">
                          <input
                            type="text"
                            placeholder="Your Full Name"
                            name="nameForm"
                            className="rounded-[15px] pl-[20px] border-2 border-[#E2E8F0]"
                            style={{ width: "370px", height: "50px" }}
                            value={name}
                            title="Isikan Nama Lengkap Anda"
                            onChange={event => handleInputChange(event)}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div>
                        <div>
                          <label htmlFor="nikForm">Nomor Induk Kependudukan</label>
                        </div>
                        <div className="pt-[6px]">
                          <input
                            type="text"
                            placeholder="Your NIK"
                            name="nikForm"
                            className="rounded-[15px] pl-[20px] border-2 border-[#E2E8F0]"
                            style={{ width: "370px", height: "50px" }}
                            value={nik}
                            title="Isikan NIK Anda"
                            onChange={event => handleInputChange(event)}
                            maxLength={16}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-x-12 pl-[50px] pt-[24px]">
                      <div>
                        <div>
                          <label htmlFor="number_phoneForm">Nomor Telepon</label>
                        </div>
                        <div className="pt-[6px]">
                          <input
                            type="text"
                            placeholder="Your Phone Number"
                            name="number_phoneForm"
                            className="rounded-[15px] pl-[20px] border-2 border-[#E2E8F0]"
                            style={{ width: "370px", height: "50px" }}
                            value={phoneNumber}
                            title="Isikan Nomor Telepon Anda"
                            onChange={event => handleInputChange(event)}
                            maxLength={13}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div>
                        <div>
                          <label htmlFor="passwordForm">Password</label>
                        </div>
                        <div className="pt-[6px]">
                          <input
                            type="password"
                            placeholder="Your Password"
                            name="passwordForm"
                            className="rounded-[15px] pl-[20px] border-2 border-[#E2E8F0]"
                            style={{ width: "370px", height: "50px" }}
                            value={password}
                            title="Isikan Password Anda"
                            onChange={event => handleInputChange(event)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center pt-[50px]">
                    <button className="bg-black w-[370px] h-[45px] rounded-[12px] border-2 border-[#E2E8F0]" type="submit">
                      <div className="text-white text-[10px] font-bold">DAFTAR</div>
                    </button>
                  </div>
                </form>
                <div className="text-[14px] flex justify-center gap-1 pt-6">
                  <div className="text-[#A0AEC0]">Already have an account? </div>
                  <div className="font-bold text-[#C4C4C4]">
                    <a href="#">Sign In</a>
                  </div>
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
