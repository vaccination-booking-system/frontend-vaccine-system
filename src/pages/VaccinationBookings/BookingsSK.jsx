import React, { useState } from "react";
import { Breadcumb, Button, Card } from "../../Components";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { useLocation, useNavigate } from "react-router-dom";

import { usePath } from "../../context/PathContext";

const VaccinationBookingsSKPage = () => {
  const { anchorPath, pathArr } = usePath();

  const navigate = useNavigate();

  const [skItems, setSkItems] = useState([
    { title: "Anak Usia 6-18 Tahun", desc: "Memiliki Kartu Keluarga (KK) atau KIA (kartu Identitas Anak)", showDesc: false },
    {
      title: "Usia 17 Tahun ke Atas",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est non cupiditate, reiciendis quisquam magni iusto tempora sed nam! Itaque fugit hic accusamus voluptates voluptas ea! Ut maxime sit nihil non.",
      showDesc: false,
    },
    {
      title: "Penyintas Covid-19",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est non cupiditate, reiciendis quisquam magni iusto tempora sed nam! Itaque fugit hic accusamus voluptates voluptas ea! Ut maxime sit nihil non.",
      showDesc: false,
    },
    {
      title: "Vaksin Dosis 3/Booster",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est non cupiditate, reiciendis quisquam magni iusto tempora sed nam! Itaque fugit hic accusamus voluptates voluptas ea! Ut maxime sit nihil non.",
      showDesc: false,
    },
  ]);

  const handleClickShowDesc = idx => {
    const newSkItems = skItems.map((item, mapId) => {
      if (idx === mapId) {
        return { ...item, showDesc: !item.showDesc };
      }
      return item;
    });
    setSkItems(newSkItems);
  };

  return (
    <div>
      <Breadcumb anchorPath={anchorPath} pathArr={pathArr} selectedPath={pathArr[pathArr.length - 1]} />
      <div className="my-8">
        <Card maxWidth="700px" margin="auto" padding="2rem 3rem">
          <h1 className="font-bold text-[20px]">Syarat dan Ketentuan</h1>
          {skItems.map((item, idx) => {
            const { title, desc, showDesc } = item;
            return (
              <div key={idx} className="cursor-pointer border-2 rounded-2xl my-4 p-4" onClick={() => handleClickShowDesc(idx)}>
                <div className="flex justify-between items-center">
                  <h2 className="font-bold">{title}</h2>
                  <span>{showDesc ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                </div>
                {showDesc && <p className="text-sm mt-2">{desc}</p>}
              </div>
            );
          })}
          <Card bg="#0A6C9D" padding="1.5rem" margin="0 0 1rem 0">
            <h1 className="font-bold text-white">Perhatian</h1>
            <p className="text-white text-sm mt-2">
              Petugas vaksinasi dapat memutuskan untuk tidak memberikan vaksinasi jika tidak sesuai dengan syarat dan ketentuan yang berlaku
            </p>
          </Card>
          <div className="flex justify-center my-8">
            <Button btnSize="md" fontSize=".75rem" bg="#0A6C9D" color="white" onClick={() => navigate("member")}>
              YA, SAYA MENGERTI
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VaccinationBookingsSKPage;
