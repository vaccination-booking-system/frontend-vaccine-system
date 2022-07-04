import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcumb, Button, Card } from "../../Components";
import { usePath } from "../../context/PathContext";

const VaccinationBookingsStatusPage = () => {
  const { state: user } = useLocation();

  const { pathArr, anchorPath } = usePath();

  const navigate = useNavigate();

  const getHideNik = nik => {
    let hideNik = "";
    for (let i = 0; i < nik.length; i++) {
      if (i < 8) {
        hideNik += nik[i];
      } else {
        hideNik += "*";
      }
    }
    return hideNik;
  };

  return (
    <div>
      <Breadcumb pathArr={pathArr} anchorPath={anchorPath} selectedPath={pathArr[pathArr.length - 1]} selectedUser={user} />
      <div className="my-8">
        <Card maxWidth="700px" margin="auto" padding="2rem 3rem">
          <Card bg="#0A6C9D">
            <h1 className="text-white font-bold text-xl my-2">Status Vaksin</h1>
            <p className="text-white">{user.name}</p>
            <p className="text-white">{getHideNik(user.nik)}</p>
            <p className="text-white mt-12">{user.vaccine_status ? "SUDAH DIVAKSIN" : "BELUM DIVAKSIN"}</p>
          </Card>
          {user.vaccine_status ? (
            ""
          ) : (
            <div className="my-8">
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-xl">Jadwal Vaksinasi</h1>
                <h1 className="font-bold text-red-500">Belum Terjadwal</h1>
              </div>
              <p className="my-8 font-bold">Segera daftarkan diri Anda dengan menekan tombol berikut :</p>
              <div className="flex justify-center">
                <Button btnSize="lg" bg="#0A6C9D" color="white" fontSize=".75rem" onClick={() => navigate("kategori", { state: user })}>
                  DAFTAR VAKSINASI COVID !9
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default VaccinationBookingsStatusPage;
