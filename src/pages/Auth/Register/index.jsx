import React from "react";
import BackgroundRegister from "../../../assets/images/background-register.jpg";

const Register = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <div className="h-[50%] w-[96%] bg-cover rounded-[15px] my-6 bg-bottom" style={{ backgroundImage: `url(${BackgroundRegister})` }}></div>
        <div className="h-[50%] bg-white w-[100%]"></div>
        <div className="w-[896px] h-[563px] bg-white border-2 rounded-[15px] z-20 drop-shadow-md absolute">
          <div className="font-bold pl-[50px] pt-[75px] text-[25px]">Buat Akun Baru</div>
          <div>
            <form action="" method="post">
              <div>
                <div className="flex gap-x-12 pl-[50px] pt-[42px]">
                  <div>
                    <div>Name</div>
                    <div className="pt-[6px]">
                      <input
                        type="text"
                        placeholder="Your full name"
                        className="rounded-[15px] pl-[20px] border-2 border-[#E2E8F0]"
                        style={{ width: "370px", height: "50px" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div>Nomor Induk Kependudukan</div>
                    <div className="pt-[6px]">
                      <input
                        type="text"
                        placeholder="Your NIK"
                        className="rounded-[15px] pl-[20px] border-2 border-[#E2E8F0]"
                        style={{ width: "370px", height: "50px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex gap-x-12 pl-[50px] pt-[24px]">
                  <div>
                    <div>Nomor Telepon</div>
                    <div className="pt-[6px]">
                      <input
                        type="text"
                        placeholder="Your phone number"
                        className="rounded-[15px] pl-[20px] border-2 border-[#E2E8F0]"
                        style={{ width: "370px", height: "50px" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div>Password</div>
                    <div className="pt-[6px]">
                      <input
                        type="text"
                        placeholder="Your Password"
                        className="rounded-[15px] pl-[20px] border-2 border-[#E2E8F0]"
                        style={{ width: "370px", height: "50px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="flex justify-center pt-[50px]">
              <button className="bg-black w-[370px] h-[45px] rounded-[12px] border-2 border-[#E2E8F0]" type="submit">
                <div className="text-white text-[10px] font-bold">DAFTAR</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
