import React from "react";
import { Card, Layout, Sidebar } from "../../../Components";
import { AiOutlineEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const AddFamilyMemberPage = () => {
  return (
    <>
      <div className="bg-[#9CE3FF] h-[790px]">
        <div>
          <Layout>
            <div className="bg-[#DBF5FE] rounded-[15px]">
              <div className="pl-[15px]">
                {" "}
                {/* Ini Div Header */}
                <div className="pb-[5px] pt-[20px]">
                  <span className="text-xs font-semibold text-[#B3B3B3]">Booking Vaccine / Status </span>
                </div>
                <div className="pb-[25px]">
                  <span className="text-lg font-bold">Add Family Members</span>
                </div>
              </div>
            </div>
            <div className="mt-[130px]">
              <div className="">
                <Card>
                  <div className="pt-2 px-[45px]">
                    {" "}
                    {/* ini div tampung semua konten */}
                    <div className="bg-[#9ED7F9] h-[128px] rounded-[18px]">
                      {" "}
                      {/* ini div untuk profil anda */}
                      <div className="pl-[21px]">
                        {" "}
                        {/* ini div wrap semua isi profil */}
                        <div className="pt-[23px]">
                          <span className="font-bold text-lg">Profil Anda</span>
                        </div>
                        <div className="pt-[17px]">
                          <div className="text-[#817F7F] text-base leading-[1.3]">
                            <p className="font-semibold">Muhammad Faidhorrahman</p>
                            <p className="font-normal">Akun Anda</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-[22px] p-">
                      {" "}
                      {/* ini div mulai dari profil anggota */}
                      <div className="pb-[23.5px]">
                        <p className="font-bold text-[25px] leading-[1.3]">Profil Anggota</p>
                      </div>
                      <div>
                        {" "}
                        {/* ini div tampung list nama */}
                        <ul className="list-decimal pl-[15px]">
                          <li className="pb-[25px]">
                            <div className="flex justify-between">
                              <span>Muhammad Faidhorrahman</span>
                              <div className="flex gap-x-5 cursor-pointer pr-2">
                                <div className="">
                                  <Link to="/dashboard/add-family-member/view">
                                    <AiOutlineEye size={22} />
                                  </Link>
                                </div>
                                <div>
                                  <Link to="/dashboard/add-family-member/edit">
                                    <BiEdit size={22} />
                                  </Link>
                                </div>
                                <div>
                                  <MdDelete size={22} />
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="pb-[25px]">
                            <div className="flex justify-between">
                              <span>Muhammad Faidhorrahman</span>
                              <div className="flex gap-x-5 cursor-pointer pr-2">
                                <div className="">
                                  <Link to="/view">
                                    <AiOutlineEye size={22} />
                                  </Link>
                                </div>
                                <div>
                                  <Link to="/edit">
                                    <BiEdit size={22} />
                                  </Link>
                                </div>
                                <div>
                                  <MdDelete size={22} />
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex justify-center mt-[50px]">
                      {" "}
                      {/* ini div button */}
                      <button className="bg-black w-[370px] h-[45px] rounded-[12px]">
                        <div className="text-white font-bold text-xs">+ TAMBAH ANGGOTA</div>
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Layout>
        </div>
      </div>
    </>
  );
};

export default AddFamilyMemberPage;
