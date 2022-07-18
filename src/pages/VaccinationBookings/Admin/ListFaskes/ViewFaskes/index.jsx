import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb, Button, Card, Layout, LoadingAnimation } from "../../../../../Components";
import { usePath } from "../../../../../context/PathContext";
import axiosInstance from "../../../../../network/apis";
import DateHelper from "../../../../../utils/DateHelper";
import { useNavigate } from "react-router-dom";
import { RiShareBoxFill } from "react-icons/ri";

const VaccinationBookingsAdminViewFaskesDetail = () => {
  const { anchorPath, pathArr } = usePath();

  const navigate = useNavigate();

  const { convertMonthId, convertDayId } = DateHelper;

  const { vaccinationPassId } = useParams();

  const [loading, setLoading] = useState(true);

  const [vaccinationPassDetailVaccine, setVaccinationPassDetailVaccine] = useState([
    { title: "Nomor Booking", desc: "" },
    { title: "Faskes", desc: "" },
    { title: "Jenis Vaksin", desc: "" },
    { title: "Tanggal Vaksin", desc: "" },
    { title: "Waktu Vaksin", desc: "" },
    { title: "Status Vaksin", desc: "" },
  ]);

  const [vaccinationPassIdentity, setVaccinationPassIdentity] = useState([
    { title: "NIK", desc: "" },
    { title: "Nama Pasien", desc: "" },
    { title: "Tanggal Lahir", desc: "" },
    { title: "Jenis Kelamin", desc: "" },
    { title: "Alamat Domisili", desc: "" },
    { title: "Nomor Telepon", desc: "" },
  ]);

  const [vaccineSessionId, setVaccineSessionId] = useState(null);

  const getVaccinationPassById = async id => {
    try {
      const res = await axiosInstance.get(`/api/v1/vaccination-pass/${id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
      });
      const newVaccinationPassDetailVaccine = vaccinationPassDetailVaccine.map(detail => {
        if (detail.title === "Nomor Booking") {
          return { ...detail, desc: `LPA-${res.data.data.id}${new Date(res.data.data.date_of_birth) / 100000}` };
        }
        if (detail.title === "Jenis Vaksin") {
          return { ...detail, desc: res.data.data.vaccine.name };
        }
        if (detail.title === "Status Vaksin") {
          return { ...detail, desc: res.data.data.is_vaccinated };
        }
        return { ...detail };
      });
      const newVaccinationPassIdentity = vaccinationPassIdentity.map(identity => {
        if (identity.title === "NIK") {
          return { ...identity, desc: res.data.data.nik };
        }
        if (identity.title === "Nama Pasien") {
          return { ...identity, desc: res.data.data.name };
        }
        if (identity.title === "Tanggal Lahir") {
          const date = new Date(res.data.data.date_of_birth);
          return { ...identity, desc: `${date.getDate()} ${convertMonthId(date.getMonth())} ${date.getFullYear()}` };
        }
        if (identity.title === "Jenis Kelamin") {
          return { ...identity, desc: res.data.data.gender === "M" ? "Laki-Laki" : "Perempuan" };
        }
        if (identity.title === "Alamat Domisili") {
          const { curr_address, curr_urban_village, curr_sub_district, curr_province, curr_city } = res.data.data;
          return { ...identity, desc: `${curr_address}, ${curr_urban_village}, ${curr_sub_district}, ${curr_city}, ${curr_province}` };
        }
        if (identity.title === "Nomor Telepon") {
          return { ...identity, desc: res.data.data.phone_number };
        }
        return { ...identity };
      });
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
        if (detail.title === "Faskes") {
          return { ...detail, desc: res.data.data.health_facility.name };
        }
        if (detail.title === "Tanggal Vaksin") {
          const date = new Date(res.data.data.schedule_date);
          return { ...detail, desc: `${date.getDate()} ${convertMonthId(date.getMonth())} ${date.getFullYear()}` };
        }
        if (detail.title === "Waktu Vaksin") {
          return { ...detail, desc: `${res.data.data.schedule_time_start} - ${res.data.data.schedule_time_end}` };
        }
        return { ...detail };
      });
      setVaccinationPassDetailVaccine(newVaccinationPassDetailVaccine);
      setLoading(false);
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
            <div>
              <h1 className="font-bold text-xl">Data Vaksinasi</h1>
              <div className="flex">
                <div className="flex-1">
                  {vaccinationPassDetailVaccine.slice(0, 3).map((detail, idx) => {
                    return (
                      <div key={idx} className="my-4">
                        <h3 className="text-gray-400">{detail.title}</h3>
                        <p>{detail.desc}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex-1">
                  {vaccinationPassDetailVaccine.slice(3, 6).map((detail, idx) => {
                    return (
                      <div key={idx} className="my-4">
                        <h3 className="text-gray-400">{detail.title}</h3>
                        {detail.title !== "Status Vaksin" ? (
                          <p>{detail.desc}</p>
                        ) : detail.desc ? (
                          <p className="p-[4px] bg-green-400 font-bold text-xs rounded-xl text-white inline-block">Vaccinated</p>
                        ) : (
                          <div className="flex items-center">
                            <p className="p-[4px] bg-orange-500 font-bold text-xs rounded-xl text-white inline-block">Not Yet</p>
                            <div className="mx-2 cursor-pointer">
                              <RiShareBoxFill onClick={() => navigate(`/vaccination-bookings/daftar-faskes/${pathArr[2]}/edit/${pathArr[4]}`)} />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-xl mt-4">Identitas</h1>
              <div className="flex">
                <div className="flex-1">
                  {vaccinationPassIdentity.slice(0, 3).map((detail, idx) => {
                    return (
                      <div key={idx} className="my-4">
                        <h3 className="text-gray-400">{detail.title}</h3>
                        <p>{detail.desc}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex-1">
                  {vaccinationPassIdentity.slice(3, 6).map((detail, idx) => {
                    return (
                      <div key={idx} className="my-4">
                        <h3 className="text-gray-400">{detail.title}</h3>
                        <p>{detail.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Button btnSize="lg" color="white" fontSize=".75rem" bg="#0A6C9D" onClick={() => navigate(`/${pathArr.slice(0, 3).join("/")}`)}>
                Kembali
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default VaccinationBookingsAdminViewFaskesDetail;
