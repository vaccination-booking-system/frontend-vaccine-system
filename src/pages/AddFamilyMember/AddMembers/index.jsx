import React from "react";
import { Breadcrumb, Button, Card, Layout, Sidebar } from "../../../Components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../../../network/apis";
import Swal from "sweetalert2";
import { usePath } from "../../../context/PathContext";

const AddMembers = () => {
  const { anchorPath, pathArr } = usePath();
  const [isClicked, setIsClicked] = useState(false);
  const [isFocus, setIfFocus] = useState(false);

  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [relation, setRelation] = useState("");
  const [birthday, setBirthday] = useState("");

  const [nikErrorMsg, setNikErrorMsg] = useState("");
  const [phoneNumberErrorMsg, setPhoneNumberErrorMsg] = useState("");
  const [nameErrorMsg, setNameErroMsg] = useState("");
  const [birthdayErrorMsg, setBirthdayErrorMsg] = useState("");
  const [relationErrorMsg, setRelationErrorMsg] = useState("");
  const [genderErrorMsg, setGenderErrorMsg] = useState("");

  const checkIsFormError = () => {
    return (
      nama === "" ||
      nik === "" ||
      phoneNumber === "" ||
      gender === "" ||
      relation === "" ||
      birthday === "" ||
      nikErrorMsg !== "" ||
      phoneNumberErrorMsg !== "" ||
      nameErrorMsg !== "" ||
      birthdayErrorMsg !== "" ||
      relationErrorMsg !== "" ||
      genderErrorMsg !== ""
    );
  };

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    axiosInstance
      .post(
        "/api/v1/family-members",
        {
          name: nama,
          date_of_birth: birthday,
          nik,
          gender,
          relationship: relation,
          phone_number: phoneNumber,
        },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(function (response) {
        if (nama !== "" && nik !== "" && birthday !== "" && gender !== "" && relation !== "" && phoneNumber !== "") {
          Swal.fire({
            title: "SUCCESS !",
            text: "Thank you for your request.",
            icon: "success",
            confirmButtonText: "Close",
          });
          setNama("");
          setBirthday("");
          setGender("");
          setNik("");
          setPhoneNumber("");
          setRelation("");
          navigate("/family-member");
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 400) {
          Swal.fire({
            title: "Data Not Valid!",
            text: "Please input the correct data",
            icon: "error",
            confirmButtonText: "Close",
          });
        }
      });
  };

  const checkNama = value => {
    const regexNama = /^[^-\0-9][a-zA-Z ]*$/gim;

    if (value.length > 0 && regexNama.test(value)) {
      setNameErroMsg("");
    } else if (value.length > 0 && !regexNama.test(value)) {
      setNameErroMsg("Nama tidak sesuai format");
    }

    if (value.length === 0) {
      setNameErroMsg("");
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

  const checkNumberPhone = value => {
    const regexPhone = /^08+[0-9]*$/;
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

  const checkGender = value => {
    if (value === "") {
      setGenderErrorMsg("Mohon masukkan jenis kelamin Anda");
    } else {
      setGenderErrorMsg("");
    }
  };

  const checkBirthday = value => {
    if (value === "") {
      setBirthdayErrorMsg("Mohon masukkan Tanggal Lahir Anda");
    } else {
      setBirthdayErrorMsg("");
    }
  };

  const checkRelation = value => {
    if (value === "") {
      setRelationErrorMsg("Mohon Masukkan Hubungan Anda");
    } else {
      setRelationErrorMsg("");
    }
  };

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

  const handleInputChange = e => {
    const { name, value } = e.target;

    if (name === "nama") {
      checkNama(value);
      setNama(value);
    }
    if (name === "nik") {
      checkNikLength(value);
      setNik(value);
    }
    if (name === "phoneNumber") {
      checkNumberPhone(value);
      setPhoneNumber(value);
    }
    if (name === "birthday") {
      checkBirthday(value);
      setBirthday(value);
    }
    if (name === "gender") {
      checkGender(value);
      setGender(value);
    }
    if (name === "relation") {
      checkRelation(value);
      setRelation(value);
    }
  };

  return (
    <>
      <Layout>
        {/* <div className="bg-white rounded-[15px]">
          <div className="pl-[15px]"> */}
        {/* Ini Div Header */}
        {/* <div className="pb-[5px] pt-[20px]">
              <span className=" font-normal leading-[1.4] text-[#718096]">
                <Link to="/family-member">Add Family Member</Link>
                <span className="text-[#0A6C9D] cursor-pointer" onClick={handleClickedContent}>
                  / Identitas
                </span>
              </span>
            </div>
            <div className="pb-[25px]">
              <span className="text-lg font-bold">Add Family Members</span>
            </div>
          </div>
        </div> */}
        <Breadcrumb anchorPath={anchorPath} pathArr={pathArr} selectedPath={pathArr[pathArr.length - 1]} />
        <div className="my-8">
          <Card maxWidth="700px" margin="auto" padding="2rem 3rem">
            <div className={`${isClicked ? "animate-pulse" : ""}`}>
              <div>
                <span className="font-bold text-[25px] leading-[32.5px]">Add Family Members</span>
                <form onSubmit={handleSubmit}>
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
                              onChange={event => handleInputChange(event)}
                              value={nama}
                              autoComplete="off"
                            />
                          </div>
                          <div className="pt-1 text-xs text-red-700">{nameErrorMsg}</div>
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
                              onChange={event => handleInputChange(event)}
                              value={nik}
                              maxLength={16}
                            />
                          </div>
                          <div className="pt-1 text-xs text-red-700">{nikErrorMsg}</div>
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
                              style={{ height: 50, width: "100%" }} /* onChange={() => ()} */
                              onChange={event => handleInputChange(event)}
                              value={gender}
                            >
                              <option value="">Jenis Kelamin Anda</option>
                              <option value="M">Laki-Laki</option>
                              <option value="F">Wanita</option>
                            </select>
                          </div>
                          <div className="pt-1 text-xs text-red-700">{genderErrorMsg}</div>
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
                              name="birthday"
                              className={`${isFocus ? "text-[#777777]" : "text-black"} border-2 border-[black] rounded-[15px] px-[20px]`}
                              onFocus={handleOnFocus}
                              style={{ height: 50, width: "100%" }}
                              onChange={event => handleInputChange(event)}
                              value={birthday}
                            />
                          </div>
                          <div className="pt-1 text-xs text-red-700">{birthdayErrorMsg}</div>
                        </div>
                        <div className="pb-[32px]">
                          {/* nampung nomor hp */}
                          <div className="pb-[6px]">
                            <label htmlFor="phoneNumber">Nomor Telepon</label>
                          </div>
                          <div>
                            <input
                              type="text"
                              name="phoneNumber"
                              placeholder="Masukkan Nomor HP"
                              className="border-2 border-[black] rounded-[15px] py-[15px] px-[20px]"
                              style={{ height: 50, width: "100%" }}
                              onChange={event => handleInputChange(event)}
                              value={phoneNumber}
                              maxLength={13}
                            />
                          </div>
                          <div className="pt-1 text-xs text-red-700">{phoneNumberErrorMsg}</div>
                        </div>
                        <div className="pb-[32px]">
                          {/* nampung hubungan*/}
                          <div className="pb-[6px]">
                            <label htmlFor="relation">Hubungan</label>
                          </div>
                          <div>
                            <select
                              name="relation"
                              className="border-2 border-[black] rounded-[15px] py-[10px] px-[20px] text-[#777777]"
                              style={{ height: 50, width: "100%" }}
                              onChange={event => handleInputChange(event)}
                              value={relation}
                            >
                              <option value="">Hubungan</option>
                              <option value="sibling">Saudara</option>
                              <option value="parent">Orang Tua</option>
                              <option value="child">Anak</option>
                              <option value="other">Lain-Lain</option>
                            </select>
                          </div>
                          <div className="pt-1 text-xs text-red-700">{relationErrorMsg}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center pb-[54.5px]">
                    {/* <Button btnSize="lg" fontSize="12px" bg="#0A6C9D" color="white" type="submit"> */}
                    <Button
                      btnSize="lg"
                      cursor={checkIsFormError() ? "not-allowed" : null}
                      bg={checkIsFormError() ? "#CACACA" : "#0A6C9D"}
                      color={checkIsFormError() ? "black" : "white"}
                      fontSize="12px"
                      type="submit"
                    >
                      TAMBAHKAN ANGGOTA
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default AddMembers;
