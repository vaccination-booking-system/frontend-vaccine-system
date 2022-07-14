import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePath } from "../../context/PathContext";
import { Breadcumb, Button, Card } from "../../Components";
import axiosInstance from "../../network/apis";

const BookingsJadwalPage = () => {
  const { anchorPath, pathArr } = usePath();

  const navigate = useNavigate();

  const { state } = useLocation();

  const { selectedUser } = state;

  const [healthFacilities, setHealthFacilities] = useState(null);

  const [selectedHealthFacilitiesId, setSelectedHealthFacilitiesId] = useState("");

  const [clocks] = useState(["09:30 - 12:00", "14:00 - 17:00"]);

  const [selectedClocks, setSelectedClocks] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

  console.log(selectedUser);

  const handleClickNext = () => {
    navigate("identitas", {
      state: {
        selectedUser: {
          ...selectedUser,
          detail: {
            ...selectedUser.detail,
            healthFacilityId: selectedHealthFacilitiesId,
            clock: selectedClocks,
            date: selectedDate,
          },
        },
      },
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "health-facility") setSelectedHealthFacilitiesId(value);
    if (name === "clock") setSelectedClocks(value);
    if (name === "date") setSelectedDate(value);
  };

  const getHealthFacilities = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/health-facilities", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setHealthFacilities(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getHealthFaciliyVaccineStocks = async () => {
    try {
      if (selectedHealthFacilitiesId !== "") {
        const res = await axiosInstance.get(`/api/v1/health-facilities/${selectedHealthFacilitiesId}/vaccines`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log({ res });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getHealthFacilities();
  }, []);

  useEffect(() => {
    getHealthFaciliyVaccineStocks();
  }, [selectedHealthFacilitiesId]);

  return (
    <div>
      <Breadcumb anchorPath={anchorPath} pathArr={pathArr} selectedPath={pathArr[pathArr.length - 1]} selectedUser={selectedUser} />
      <div className="my-8">
        <Card maxWidth="700px" margin="auto" padding="2rem 3rem">
          <h1 className="font-bold text-xl mb-4">Jadwal</h1>
          <Card bg="#0A6C9D">
            <h1 className="font-bold text-white mb-2">Perhatian</h1>
            <p className="text-white">
              Petugas vaksinasi dapat memutuskan untuk tidak memberikan vaksinasi jika tidak sesuai dengan syarat dan ketentuan yang berlaku.
            </p>
          </Card>
          <div className="flex mt-8">
            <div className="flex-1 pr-4">
              <div className="my-4">
                <label className="block">Cari Lokasi Vaksinasi</label>
                <select
                  name="health-facility"
                  value={selectedHealthFacilitiesId}
                  className="border-2 p-2 rounded-lg w-full"
                  onChange={e => handleChange(e)}
                >
                  <option value="">Ketik Nama Faskes atau Kecamatan</option>
                  {healthFacilities?.map((healthFacility, idx) => {
                    const { name, id } = healthFacility;
                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="my-4">
                <label className="block">Jam *</label>
                <select name="clock" value={selectedClocks} className="border-2 p-2 rounded-lg w-full" onChange={e => handleChange(e)}>
                  <option value="">Pilih Jam</option>
                  {clocks.map((clock, idx) => {
                    return (
                      <option key={idx} value={clock}>
                        {clock}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="flex-1 pl-4">
              <div className="my-4">
                <label className="block">Tanggal</label>
                <input type="date" name="date" value={selectedDate} className="border-2 p-2 rounded-lg w-full" onChange={e => handleChange(e)} />
              </div>
              <h2 className="font-bold">Sisa Kuota Tersedia :</h2>
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
                onClick={() => navigate("/booking-vaccine/sk/member/status/kategori", { state: { selectedUser } })}
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

export default BookingsJadwalPage;
