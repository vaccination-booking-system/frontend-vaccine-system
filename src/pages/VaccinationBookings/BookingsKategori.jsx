import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePath } from "../../context/PathContext";
import { Breadcumb, Button, Card } from "../../Components";

const BookingsKategoriPage = () => {
  const { state } = useLocation();

  const { selectedUser } = state;

  const navigate = useNavigate();

  const { anchorPath, pathArr } = usePath();

  const [selectedCategory, setSelectedCategory] = useState("");

  const [isPregnant, setIsPregnant] = useState(null);

  const optionItems = [
    {
      text: "Pilih Kategori Anda",
      value: "",
    },
    {
      text: "Anak - Anak ( 5 - 11 Tahun )",
      value: "anak",
    },
    {
      text: "Remaja ( 12 - 45 Tahun )",
      value: "remaja",
    },
    {
      text: "Lansia ( 46 - 65 Tahun )",
      value: "lansia",
    },
    {
      text: "Manula ( > 65 Tahun )",
      value: "manula",
    },
  ];

  const handleChangeCategory = e => {
    const { name, value } = e.target;
    setSelectedCategory(value);
    console.log({ name, value });
  };

  const handleChangeIsPregnant = e => {
    const { name, value } = e.target;
    setIsPregnant(value === "true" ? true : false);
    console.log({ name, value });
  };

  const handleClickNext = () => {
    if (selectedCategory === "" || isPregnant === null) return;
    navigate("jadwal", {
      state: {
        selectedUser: {
          ...selectedUser,
          detail: {
            ...selectedUser.detail,
            category: selectedCategory,
            isPregnant,
          },
        },
      },
    });
  };

  return (
    <div>
      <Breadcumb anchorPath={anchorPath} pathArr={pathArr} selectedPath={pathArr[pathArr.length - 1]} selectedUser={selectedUser} />
      <div className="my-8">
        <Card maxWidth="700px" margin="auto" padding="2rem 3rem">
          <h1 className="font-bold text-xl mb-4">Kategori</h1>
          <Card bg="#0A6C9D">
            <h1 className="font-bold text-white mb-2">Perhatian</h1>
            <p className="text-white">
              Petugas vaksinasi dapat memutuskan untuk tidak memberikan vaksinasi jika tidak sesuai dengan syarat dan ketentuan yang berlaku.
            </p>
          </Card>
          <div className="flex justify-between mt-4">
            <div className="flex-1 pr-8">
              <label className="block">Kategori</label>
              <select name="category" value={selectedCategory} className="border-2 p-2 rounded-lg w-full" onChange={e => handleChangeCategory(e)}>
                {optionItems.map((option, idx) => {
                  return (
                    <option key={idx} value={option.value}>
                      {option.text}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex-1 pl-8">
              <label>Apakah Anda Sedang Hamil ?</label>
              <div className="flex">
                <div className="mx-4 flex items-center">
                  <input type="radio" id="true" name="isPregnant" value={true} onChange={e => handleChangeIsPregnant(e)} />
                  <label htmlFor="true">Ya</label>
                </div>
                <div className="mx-4 flex items-center">
                  <input type="radio" id="false" name="isPregnant" value={false} onChange={e => handleChangeIsPregnant(e)} />
                  <label htmlFor="false">Tidak</label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button bg="#0A6C9D" btnSize="lg" fontSize=".75rem" color="white" onClick={() => handleClickNext()}>
              Selanjutnya
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BookingsKategoriPage;
