import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Card } from "../../../Components";
import { usePath } from "../../../context/PathContext";

const BookingsIdentitasPage = () => {
  const { anchorPath, pathArr } = usePath();

  const { state } = useLocation();

  const { selectedUser } = state;

  const navigate = useNavigate();

  const [formInput, setFormInput] = useState([
    { label: "Nama Lengkap (sesuai KTP)", placeholder: "Masukkan Nama (KTP)", name: "name", value: selectedUser.name },
    { label: "Nomer Induk Kependudukan", placeholder: "Masukkan NIK", name: "nik", value: selectedUser.nik },
    {
      label: "Jenis Kelamin",
      placeholder: "Jenis Kelamin Anda",
      name: "gender",
      value: selectedUser.gender,
    },
    {
      label: "Tanggal Lahir",
      placeholder: "Pilih tanggal Lahir",
      name: "date_of_birth",
      value: selectedUser.date_of_birth,
    },
    { label: "Nomer Telepon", placeholder: "Masukkan Nomor Telepon", name: "phone_number", value: selectedUser.phone_number },
    { label: "E-mail", placeholder: "Masukkan E-mail", name: "email", value: "" },
  ]);

  const handleClickNext = () => {
    navigate("alamat", { state: { selectedUser: { ...selectedUser } } });
  };

  return (
    <div>
      <Breadcrumb anchorPath={anchorPath} pathArr={pathArr} selectedPath={pathArr[pathArr.length - 1]} selectedUser={selectedUser} />
      <div className="my-8">
        <Card maxWidth="700px" margin="auto" padding="2rem 3rem">
          <h1 className="font-bold text-xl">Identitas</h1>
          <div className="flex">
            <div className="flex-1 pr-2">
              {formInput.slice(0, 3).map((input, idx) => {
                return (
                  <div key={idx} className="my-4">
                    <label className="block">{input.label}</label>
                    <input
                      type={input.type}
                      className="border-2 p-2 rounded-lg w-full text-gray-400 cursor-not-allowed"
                      placeholder={input.placeholder}
                      name={input.name}
                      value={input.name !== "gender" ? input.value : input.value === "M" ? "Laki-Laki" : input.value === "F" && "Perempuan"}
                      autoComplete="off"
                      disabled
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex-1 pl-2">
              {formInput.slice(3, 6).map((input, idx) => {
                return (
                  <div key={idx} className="my-4">
                    <label className="block">{input.label}</label>
                    <input
                      type={input.type}
                      className="border-2 p-2 rounded-lg w-full text-gray-400 cursor-not-allowed"
                      placeholder={input.placeholder}
                      name={input.name}
                      value={input.value}
                      autoComplete="off"
                      disabled
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex mt-4">
            <div className="flex-1 pr-2">
              <Button
                btnSize="full"
                fontSize=".75rem"
                color="#0A6C9D"
                bg="white"
                border="1px solid #0A6C9D"
                onClick={() => navigate("/booking-vaccine/sk/member/status/kategori/jadwal", { state: { selectedUser } })}
              >
                Sebelumnya
              </Button>
            </div>
            <div className="flex-1 pl-2">
              <Button btnSize="full" fontSize=".75rem" color="white" bg="#0A6C9D" onClick={() => handleClickNext()}>
                Selanjutnya
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BookingsIdentitasPage;
