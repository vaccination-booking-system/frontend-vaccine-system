import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePath } from "../../../context/PathContext";
import { Breadcrumb, Button, Card } from "../../../Components";
import axiosInstance from "../../../network/apis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingsJadwalPage = () => {
  const { anchorPath, pathArr } = usePath();

  const navigate = useNavigate();

  const { state } = useLocation();

  const { selectedUser } = state;

  const [cities, setcities] = useState(null);

  const [selectedCityId, setSelectedCityId] = useState("");

  const [healthFacilities, setHealthFacilities] = useState(null);

  const [selectedHealthFacilityId, setSelectedHealthFacilityId] = useState("");

  const [clocks] = useState(["09:30 - 12:00", "14:00 - 17:00"]);

  const [selectedClocks, setSelectedClocks] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

  const [vacccineStocks, setVaccineStocks] = useState(null);

  const [vaccinationSessions, setVaccinationSessions] = useState(null);

  const [selectedVaccinationSessionsId, setSelectedVaccinationSessionsId] = useState("");

  const handleClickNext = () => {
    if (!vaccinationSessions) {
      toast.error("Masukkan data dengan benar!");
    } else {
      if (vaccinationSessions.length === 0) {
        toast.error("Sesi tidak tersedia!");
      } else if (selectedVaccinationSessionsId === "") {
        toast.error("Pilih sesi vaksin!");
      } else {
        navigate("identitas", {
          state: {
            selectedUser: {
              ...selectedUser,
              bookingsDetail: {
                ...selectedUser.bookingsDetail,
                cityId: selectedCityId,
                healthFacilityId: selectedHealthFacilityId,
                vaccinationSessionsId: selectedVaccinationSessionsId,
              },
            },
          },
        });
      }
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "city") setSelectedCityId(value);
    if (name === "health-facility") setSelectedHealthFacilityId(value);
    if (name === "clock") setSelectedClocks(value);
    if (name === "date") setSelectedDate(value);
    if (name === "vaccinationSessions") setSelectedVaccinationSessionsId(value);
  };

  const getcities = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/cities", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setcities(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getHealthFacilitiesByCityId = async cityId => {
    try {
      const res = await axiosInstance.get(`/api/v1/health-facilities?city_id=${cityId}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setHealthFacilities(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getVaccineSessionsByHealthFacilityId = async healthFacilityId => {
    try {
      const res = await axiosInstance.get(`api/v1/vaccination-session?health_facility_id=${healthFacilityId}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setVaccinationSessions(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (selectedCityId) getHealthFacilitiesByCityId(selectedCityId);
  }, [selectedCityId]);

  useEffect(() => {
    if (selectedHealthFacilityId) getVaccineSessionsByHealthFacilityId(selectedHealthFacilityId);
  }, [selectedHealthFacilityId]);

  useEffect(() => {
    getcities();
  }, []);

  return (
    <div>
      <Breadcrumb anchorPath={anchorPath} pathArr={pathArr} selectedPath={pathArr[pathArr.length - 1]} selectedUser={selectedUser} />
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
                <label className="block">Cari Kota Faskes</label>
                <select className="border-2 p-2 rounded-lg w-full" name="city" value={selectedCityId} onChange={e => handleChange(e)}>
                  <option value="">Pilih Kota</option>
                  {cities?.map((city, idx) => {
                    return (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="my-4">
                <label className="block">Cari Lokasi Vaksinasi</label>
                <select
                  name="health-facility"
                  value={selectedHealthFacilityId}
                  className="border-2 p-2 rounded-lg w-full"
                  onChange={e => handleChange(e)}
                >
                  <option value="">Pilih Faskes</option>
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
            </div>
            <div className="flex-1 pl-4">
              <div className="my-4">
                <label className="block">Pilih Sesi Vaksin</label>
                {vaccinationSessions ? (
                  vaccinationSessions.length === 0 ? (
                    <p>Vaksin Kosong</p>
                  ) : (
                    <select
                      className="border-2 p-2 rounded-lg w-full"
                      name="vaccinationSessions"
                      value={selectedVaccinationSessionsId}
                      onChange={e => handleChange(e)}
                    >
                      <option value="">Pilih Sesi Vaksin</option>
                      {vaccinationSessions.map((vaccinationSession, idx) => {
                        const { id, vaccine, quantity, booked, schedule_date, schedule_time_start, schedule_time_end } = vaccinationSession;
                        return (
                          <option key={id} value={id}>
                            {vaccine.name}, kuota : {quantity - booked}, tanggal: {schedule_date}, jam :{" "}
                            {`${schedule_time_start} - ${schedule_time_end}`}
                          </option>
                        );
                      })}
                    </select>
                  )
                ) : (
                  ""
                )}
              </div>
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
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default BookingsJadwalPage;
