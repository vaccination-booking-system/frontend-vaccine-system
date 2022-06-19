import React from "react";
import { Button, Card, Layout, Sidebar } from "../../../Components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const AddMembers = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isFocus, setIfFocus] = useState(false);

  const handleClickedContent = () => {
    setIsClicked(true);
  };

  useEffect(() => {
    if (isClicked === true) {
      setTimeout(() => {
        setIsClicked(false);
      }, 1500);
    }
  }, [isClicked]);

  const handleOnFocus = () => {
    setIfFocus(true);
    if (isFocus === true) {
      setIfFocus(false);
    }
  };

  return (
    <>
      <Layout>
        <div className="bg-white rounded-[15px]">
          <div className="pl-[15px]">
            {/* Ini Div Header */}
            <div className="pb-[5px] pt-[20px]">
              <span className="text-xs font-normal leading-[1.4] text-[#718096]">
                <Link to="/add-family-member">Add Family Member</Link>
                <span className="text-[#0A6C9D] cursor-pointer" onClick={handleClickedContent}>
                  / Identitas
                </span>
              </span>
            </div>
            <div className="pb-[25px]">
              <span className="text-lg font-bold">Add Family Members</span>
            </div>
          </div>
        </div>
        <div className="mt-[100px]">
          <Card padding="24px 45px 0px 45px">
            <div className={`${isClicked ? "animate-pulse" : ""}`}>
              <div>
                <span className="font-bold text-[25px] leading-[32.5px]">Add Family Members</span>
                <form action="" method="">
                  <div className="pb-[50px] flex justify-between mt-[22px]">
                    {/* ini div utama contain all konten */}
                    <div className="flex-auto pr-[15px]">
                      {/* ini nampung sisi kiri */}
                      <div className="py-[15px] px-[11px]">
                        <div className="pb-[32px]">
                          {/* nampung nama lengkap */}
                          <div className="pb-[6px]">
                            <label htmlFor="nama">Nama Lengkap (sesuai KTP)</label>
                          </div>
                          <div>
                            <input
                              type="text"
                              name="nama"
                              placeholder="Masukkan Nama (sesuai KTP)"
                              className="border-2 border-[black] rounded-[15px] py-[15px] px-[20px]"
                              style={{ height: 50, width: "100%" }}
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="pb-[32px]">
                          {/* nampung NIK */}
                          <div className="pb-[6px]">
                            <label htmlFor="nik">Nomor Induk Kependudukan</label>
                          </div>
                          <div>
                            <input
                              type="text"
                              name="nik"
                              placeholder="Masukkan NIK"
                              className="border-2 border-[black] rounded-[15px] py-[15px] px-[20px]"
                              style={{ height: 50, width: "100%" }}
                            />
                          </div>
                        </div>
                        <div className="pb-[32px]">
                          {/* nampung gender*/}
                          <div className="pb-[6px]">
                            <label htmlFor="gender">Jenis Kelamin</label>
                          </div>
                          <div>
                            <select
                              name="gender"
                              className="text-[#777777] border-2 border-[black] rounded-[15px] px-[20px]"
                              style={{ height: 50, width: "100%" }}
                            >
                              <option value="">Jenis Kelamin Anda</option>
                              <option value="">Pilih</option>
                              <option value="">Pilih</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-auto pl-[15px]">
                      {/* ini nampung sisi kanan */}
                      <div className="py-[15px] px-[11px]">
                        <div className="pb-[32px]">
                          {/* nampung tanggal lahir */}
                          <div className="pb-[6px]">
                            <label htmlFor="nama">Tanggal Lahir</label>
                          </div>
                          <div>
                            <input
                              type="date"
                              name="nama"
                              className={`${isFocus ? "text-[#777777]" : "text-black"} border-2 border-[black] rounded-[15px] px-[20px]`}
                              onFocus={handleOnFocus}
                              style={{ height: 50, width: "100%" }}
                            />
                          </div>
                        </div>
                        <div className="pb-[32px]">
                          {/* nampung no hp */}
                          <div className="pb-[6px]">
                            <label htmlFor="nik">Nomor Telepon</label>
                          </div>
                          <div>
                            <input
                              type="text"
                              name="nik"
                              placeholder="Masukkan NIK"
                              className="border-2 border-[black] rounded-[15px] py-[15px] px-[20px]"
                              style={{ height: 50, width: "100%" }}
                            />
                          </div>
                        </div>
                        <div className="pb-[32px]">
                          {/* nampung hubungan*/}
                          <div className="pb-[6px]">
                            <label htmlFor="hubungan">Hubungan</label>
                          </div>
                          <div>
                            <select
                              name="hubungan"
                              className="border-2 border-[black] rounded-[15px] py-[10px] px-[20px] text-[#777777]"
                              style={{ height: 50, width: "100%" }}
                            >
                              <option value="">Pilih</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="flex justify-center items-center pb-[54.5px]">
                  <Link to="">
                    <Button btnSize="lg" fontSize="12px" bg="#0A6C9D" color="white" type="submit">
                      TAMBAHKAN ANGGOTA
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default AddMembers;
