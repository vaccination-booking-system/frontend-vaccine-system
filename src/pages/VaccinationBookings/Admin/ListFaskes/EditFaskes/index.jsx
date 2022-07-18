import React, { useEffect, useState } from "react";
import { Layout, Card, Breadcrumb, LoadingAnimation, Button } from "../../../../../Components";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../../network/apis";
import DateHelper from "../../../../../utils/DateHelper";
import { usePath } from "../../../../../context/PathContext";
import Swal from "sweetalert2";

const VaccinationBookingsEditPage = () => {
  const { convertMonthId, convertDayId } = DateHelper;

  const { anchorPath, pathArr } = usePath();

  const { vaccinationPassId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [isVaccineDefault, setIsVaccineDefault] = useState(null);

  const [isVaccine, setIsVaccine] = useState(null);

  const [vaccinationPassDetailVaccine, setVaccinationPassDetailVaccine] = useState([
    { label: "Nomor Booking", value: "" },
    { label: "Faskes", value: "" },
    { label: "Jenis Vaksin", value: "" },
    { label: "Tanggal Vaksin", value: "" },
    { label: "Waktu Vaksin", value: "" },
    { label: "Status Vaksin", value: "" },
  ]);

  const [vaccinationPassIdentity, setVaccinationPassIdentity] = useState([
    { label: "NIK", value: "" },
    { label: "Nama Pasien", value: "" },
    { label: "Tanggal Lahir", value: "" },
    { label: "Jenis Kelamin", value: "" },
    { label: "Alamat Domisili", value: "" },
    { label: "Nomor Telepon", value: "" },
  ]);

  const [vaccineSessionId, setVaccineSessionId] = useState(null);

  const getVaccinationPassById = async id => {
    try {
      const res = await axiosInstance.get(`/api/v1/vaccination-pass/${id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
      });
      const newVaccinationPassDetailVaccine = vaccinationPassDetailVaccine.map(detail => {
        if (detail.label === "Nomor Booking") {
          return { ...detail, value: `LPA-${res.data.data.id}${new Date(res.data.data.date_of_birth) / 100000}` };
        }
        if (detail.label === "Jenis Vaksin") {
          return { ...detail, value: res.data.data.vaccine.name };
        }
        if (detail.label === "Status Vaksin") {
          return { ...detail, value: res.data.data.is_vaccinated };
        }
        return { ...detail };
      });
      const newVaccinationPassIdentity = vaccinationPassIdentity.map(identity => {
        if (identity.label === "NIK") {
          return { ...identity, value: res.data.data.nik };
        }
        if (identity.label === "Nama Pasien") {
          return { ...identity, value: res.data.data.name };
        }
        if (identity.label === "Tanggal Lahir") {
          const date = new Date(res.data.data.date_of_birth);
          return { ...identity, value: `${date.getDate()} ${convertMonthId(date.getMonth())} ${date.getFullYear()}` };
        }
        if (identity.label === "Jenis Kelamin") {
          return { ...identity, value: res.data.data.gender === "M" ? "Laki-Laki" : "Perempuan" };
        }
        if (identity.label === "Alamat Domisili") {
          const { curr_address, curr_urban_village, curr_sub_district, curr_province, curr_city } = res.data.data;
          return { ...identity, value: `${curr_address}, ${curr_urban_village}, ${curr_sub_district}, ${curr_city}, ${curr_province}` };
        }
        if (identity.label === "Nomor Telepon") {
          return { ...identity, value: res.data.data.phone_number };
        }
        return { ...identity };
      });
      setIsVaccine(res.data.data.is_vaccinated);
      setIsVaccineDefault(res.data.data.is_vaccinated);
      setVaccinationPassDetailVaccine(newVaccinationPassDetailVaccine);
      setVaccinationPassIdentity(newVaccinationPassIdentity);
      setVaccineSessionId(res.data.data.vaccination_session.id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getVaccinationSessionById = async id => {
    try {
      const res = await axiosInstance.get(`/api/v1/vaccination-session/${id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
      });
      const newVaccinationPassDetailVaccine = vaccinationPassDetailVaccine.map(detail => {
        if (detail.label === "Faskes") {
          return { ...detail, value: res.data.data.health_facility.name };
        }
        if (detail.label === "Tanggal Vaksin") {
          const date = new Date(res.data.data.schedule_date);
          return { ...detail, value: `${date.getDate()} ${convertMonthId(date.getMonth())} ${date.getFullYear()}` };
        }
        if (detail.label === "Waktu Vaksin") {
          return { ...detail, value: `${res.data.data.schedule_time_start} - ${res.data.data.schedule_time_end}` };
        }
        return { ...detail };
      });
      setVaccinationPassDetailVaccine(newVaccinationPassDetailVaccine);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axiosInstance.put(
        `/api/v1/vaccination-pass/${vaccinationPassId}/vaccinated-status`,
        {
          is_vaccinated: isVaccine,
        },
        { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } }
      );
      if (res.data.message === "SUCCESS") {
        new Promise((resolve, reject) =>
          resolve(
            Swal.fire({
              title: "SUCCESS !",
              text: "Berhasil update data",
              icon: "success",
              timer: 2000,
              confirmButtonText: "Close",
            })
          )
        ).then(() => navigate(`/vaccination-bookings/daftar-faskes/${pathArr[2]}/view/${pathArr[4]}`));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (vaccineSessionId) getVaccinationSessionById(vaccineSessionId);
  }, [vaccineSessionId]);

  useEffect(() => {
    getVaccinationPassById(vaccinationPassId);
  }, [vaccinationPassId]);

  return (
    <Layout>
      <Breadcrumb anchorPath={anchorPath} pathArr={pathArr} selectedPath={pathArr[pathArr.length - 1]} />
      <div className="my-8">
        {loading ? (
          <LoadingAnimation />
        ) : (
          <Card maxWidth="700px" margin="auto" padding="2rem 3rem">
            <h1 className="font-bold text-xl">Edit Data Vaksinasi</h1>
            <div className="flex mt-4">
              <div className="flex-1 pr-2">
                {vaccinationPassIdentity.slice(0, 3).map((detail, idx) => {
                  return (
                    <div className="my-2" key={idx}>
                      <label className="block">{detail.label}</label>
                      <input className="w-full border-2 rounded-md p-2 text-gray-400" value={detail.value} type="text" disabled />
                    </div>
                  );
                })}
              </div>
              <div className="flex-1 pl-2">
                {vaccinationPassIdentity.slice(3, 6).map((detail, idx) => {
                  return (
                    <div className="my-2" key={idx}>
                      <label className="block">{detail.label}</label>
                      <input className="w-full border-2 rounded-md p-2 text-gray-400" value={detail.value} type="text" disabled />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex">
              <div className="flex-1 pr-2">
                {vaccinationPassDetailVaccine.slice(0, 3).map((detail, idx) => {
                  return (
                    <div className="my-2" key={idx}>
                      <label className="block">{detail.label}</label>
                      <input className="w-full border-2 rounded-md p-2 text-gray-400" value={detail.value} type="text" disabled />
                    </div>
                  );
                })}
              </div>
              <div className="flex-1 pl-2">
                {vaccinationPassDetailVaccine.slice(3, 6).map((detail, idx) => {
                  return (
                    <div className="my-2" key={idx}>
                      <label className="block">{detail.label}</label>
                      {detail.label !== "Status Vaksin" ? (
                        <input className="w-full border-2 rounded-md p-2 text-gray-400" value={detail.value} type="text" disabled />
                      ) : (
                        <div className="flex">
                          <p
                            className={`p-[4px] mx-1 ${
                              isVaccine ? "bg-orange-200" : "bg-orange-500"
                            }  font-bold text-xs rounded-xl text-white inline-block cursor-pointer`}
                            onClick={() => setIsVaccine(false)}
                          >
                            Not Yet
                          </p>
                          <p
                            className={`p-[4px] mx-1 ${
                              isVaccine ? "bg-green-400" : "bg-green-200"
                            }  font-bold text-xs rounded-xl text-white inline-block cursor-pointer`}
                            onClick={() => setIsVaccine(true)}
                          >
                            Vaccinated
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Button btnSize="lg" color="white" fontSize=".75rem" bg="#0A6C9D" onClick={() => handleUpdate()}>
                Update
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default VaccinationBookingsEditPage;
