import React, { useEffect } from "react";
import { Button, Card, Layout, LoadingAnimation, Sidebar } from "../../Components";
import { AiOutlineEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../network/apis";
import Swal from "sweetalert2";
import { decodeToken } from "react-jwt";

const AddFamilyMemberPage = () => {
  const [isClicked, setIsClicked] = useState(false);

  const [listFamilyMember, setListFamilyMember] = useState([]);

  const { getUserByIdLoading, getUserByIdResult, getUserByIdError } = useSelector(state => state.userId);

  useEffect(() => {
    console.log({ getUserByIdLoading, getUserByIdResult, getUserByIdError });
  }, [getUserByIdLoading, getUserByIdResult, getUserByIdError]);

  const handleClickedContent = () => {
    setIsClicked(true);
    setTimeout(isClicked => {
      if (isClicked === isClicked) {
        setIsClicked(false);
      }
    }, 1800);
  };

  const [isGetData, setIsGetData] = useState(false);

  //console.log(getUserByIdResult.id);
  const fetchData = () => {
    setIsGetData(true);
    const token = localStorage.getItem("accessToken");
    const claim = decodeToken(token);
    console.log("ini claim" + claim);
    axiosInstance
      .get("/api/v1/family-members?user_id=" + claim.user_id, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      .then(function (response) {
        let temp = [];
        response.data.data.forEach(element => {
          temp.push(element);
        });
        setListFamilyMember(temp);
        console.log(response);
        setIsGetData(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsGetData(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = id => {
    axiosInstance
      .delete("/api/v1/family-members/" + id, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(response => {
        console.log(response);
        if (response.data.message === "SUCCESS") {
          Swal.fire({
            title: "SUCCESS !",
            text: "Berhasil menghapus",
            icon: "success",
            confirmButtonText: "Close",
          });
          fetchData();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <>
      <Layout>
        {getUserByIdResult ? (
          <>
            <div className="bg-white rounded-[15px]">
              <div className="pl-[15px]">
                {/* Ini Div Header */}
                <div className="pb-[5px] pt-[20px]">
                  <span className="font-normal leading-[1.4] text-[#718096] cursor-pointer" onClick={handleClickedContent}>
                    Add Family Member{" "}
                  </span>
                </div>
                <div className="pb-[25px]">
                  <span className="text-[20px] font-bold">Add Family Members</span>
                </div>
              </div>
            </div>
            <div className="mt-[100px]">
              <Card>
                <div className={`${isClicked ? "animate-pulse" : ""} px-[45px] my-[30px]`}>
                  {/* ini div tampung semua konten */}
                  <div className="bg-[#0A6C9D] h-[128px] rounded-[18px]">
                    {/* ini div untuk profil anda */}
                    <div className="pl-[21px]">
                      {/* ini div wrap semua isi profil */}
                      <div className="pt-[23px]">
                        <span className="font-bold text-lg text-[#EDF5FB]">Profil Anda</span>
                      </div>
                      <div className="pt-[17px]">
                        <div className="text-[#EDF5FB] text-base leading-[1.3]">
                          <p className="font-semibold">{getUserByIdResult.name}</p>
                          <p className="font-normal">Akun Anda</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[22px] p-">
                    {/* ini div mulai dari profil anggota */}
                    <div className="pb-[23.5px]">
                      <p className="font-bold text-[25px] leading-[1.3]">Profil Anggota</p>
                    </div>
                    <div>
                      {/* ini div tampung list nama */}
                      {isGetData ? (
                        <LoadingAnimation />
                      ) : (
                        <ul className="list-decimal pl-[15px]">
                          {listFamilyMember.map((element, index) => {
                            return (
                              <li className="pb-[25px]" key={index}>
                                <div className="flex justify-between">
                                  <span>{element.name}</span>
                                  <div className="flex gap-x-5 cursor-pointer pr-2">
                                    <div className="">
                                      <Link to={`/family-member/view/${element.id}`}>
                                        <AiOutlineEye size={22} />
                                      </Link>
                                    </div>
                                    <div>
                                      <Link to={`/family-member/edit/${element.id}`}>
                                        <BiEdit size={22} />
                                      </Link>
                                    </div>
                                    <div>
                                      <MdDelete size={22} onClick={() => handleDelete(element.id)} />
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                  {/* <div className="flex justify-center">
                      {/* ini div button }
                      <button className="bg-black w-[370px] h-[45px] rounded-[12px]">
                        <div className="text-white font-bold text-xs">+ TAMBAH ANGGOTA</div>
                      </button>
                    </div> */}
                  <div className="flex justify-center mt-[30px]">
                    <Link to="/family-member/add">
                      <Button btnSize="lg" fontSize="12px" bg="#0A6C9D" color="white">
                        + TAMBAH ANGGOTA
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </>
        ) : getUserByIdLoading ? (
          <div className="absolute w-full h-full flex justify-center items-center">
            <LoadingAnimation />
          </div>
        ) : (
          ""
        )}
      </Layout>
    </>
  );
};

export default AddFamilyMemberPage;
