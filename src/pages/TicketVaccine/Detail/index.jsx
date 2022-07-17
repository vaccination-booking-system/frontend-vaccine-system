import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, Card, LoadingAnimation } from "../../../Components";
import { usePath } from "../../../context/PathContext";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../network/apis";
import StringHelper from "../../../utils/StringHelper";

const TicketVaccineDetailPage = () => {
  const { capitalizeFirstLetter } = StringHelper;

  const { anchorPath, pathArr } = usePath();

  const { vaccinationPassId } = useParams();

  const [vaccinationPassDetail, setVaccinationPassDetail] = useState(null);

  const [vaccinationSessionDetail, setVaccinationSessionDetail] = useState(null);

  const [loading, setLoading] = useState(false);

  const [detailsVaccine, setDetailsVaccine] = useState([
    { title: "Nomor Vaksin", desc: "" },
    { title: "Nama Vaksin", desc: "" },
    { title: "Lokasi Vaksin", desc: "" },
    { title: "Tanggal Vaksin", desc: "" },
    { title: "Waktu Vaksin", desc: "" },
  ]);

  const [identities, setIdentities] = useState([
    { title: "NIK", desc: "" },
    { title: "Nama Pasien", desc: "" },
    { title: "Tanggal Lahir", desc: "" },
    { title: "Jenis Kelamin", desc: "" },
    { title: "Alamat Domisili", desc: "" },
  ]);

  const getVaccinationPassById = async id => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/v1/vaccination-pass/${id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
      });
      setVaccinationPassDetail(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getVaccinationSessionById = async id => {
    try {
      const res = await axiosInstance.get(`/api/v1/vaccination-session/${id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
      });
      setVaccinationSessionDetail(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getVaccinationPassById(vaccinationPassId);
  }, [vaccinationPassId]);

  useEffect(() => {
    if (vaccinationPassDetail) {
      getVaccinationSessionById(vaccinationPassDetail.vaccination_session.id);
    }
  }, [vaccinationPassDetail]);

  useEffect(() => {
    if (vaccinationSessionDetail) {
      const newDetailsVaccine = detailsVaccine.map(detailVaccine => {
        if (detailVaccine.title === "Nomor Vaksin") {
          return { ...detailVaccine, desc: `LPA-${vaccinationPassDetail.id}${new Date(vaccinationPassDetail.date_of_birth) / 100000}` };
        }
        if (detailVaccine.title === "Nama Vaksin") {
          return { ...detailVaccine, desc: vaccinationPassDetail.vaccine.name };
        }
        if (detailVaccine.title === "Lokasi Vaksin") {
          return { ...detailVaccine, desc: vaccinationSessionDetail.health_facility.name };
        }
        if (detailVaccine.title === "Tanggal Vaksin") {
          return { ...detailVaccine, desc: vaccinationSessionDetail.schedule_date };
        }
        if (detailVaccine.title === "Waktu Vaksin") {
          return { ...detailVaccine, desc: `${vaccinationSessionDetail.schedule_time_start} - ${vaccinationSessionDetail.schedule_time_end}` };
        }
        return { ...detailVaccine };
      });
      const newIdentities = identities.map(identity => {
        const { nik, name, date_of_birth, gender, curr_address, curr_urban_village, curr_sub_district, curr_city, curr_province } =
          vaccinationPassDetail;
        if (identity.title === "NIK") {
          return { ...identity, desc: nik };
        }
        if (identity.title === "Nama Pasien") {
          return { ...identity, desc: name };
        }
        if (identity.title === "Tanggal Lahir") {
          return { ...identity, desc: date_of_birth };
        }
        if (identity.title === "Jenis Kelamin") {
          return { ...identity, desc: gender === "M" ? "Laki-Laki" : "Perempuan" };
        }
        if (identity.title === "Alamat Domisili") {
          return {
            ...identity,
            desc: `${curr_address}, ${capitalizeFirstLetter(curr_urban_village.toLowerCase())}, ${capitalizeFirstLetter(
              curr_sub_district.toLowerCase()
            )}, ${capitalizeFirstLetter(curr_city.toLowerCase())}, ${capitalizeFirstLetter(curr_province.toLowerCase())}`,
          };
        }
        return { ...identity };
      });
      setDetailsVaccine(newDetailsVaccine);
      setIdentities(newIdentities);
      setLoading(false);
    }
  }, [vaccinationSessionDetail]);

  return (
    <Layout>
      <Breadcrumb pathArr={pathArr} anchorPath={anchorPath} selectedPath={pathArr[pathArr.length - 1]} />
      <div className="my-8">
        <Card maxWidth="700px" margin="auto" padding="2rem 3rem">
          {loading ? (
            <LoadingAnimation />
          ) : (
            <div>
              <div className="my-4">
                <h1 className="font-bold text-xl">Detail Vaksin</h1>
                <div className="flex">
                  <div className="flex-1">
                    {detailsVaccine.slice(0, 3).map((detailVaccine, idx) => {
                      return (
                        <div key={idx} className="my-2">
                          <h3 className="text-gray-400">{detailVaccine.title}</h3>
                          <p>{detailVaccine.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex-1">
                    {detailsVaccine.slice(3, 6).map((detailVaccine, idx) => {
                      return (
                        <div key={idx} className="my-2">
                          <h3 className="text-gray-400">{detailVaccine.title}</h3>
                          <p>{detailVaccine.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="my-4">
                <h1 className="font-bold text-xl">Identitas</h1>
                <div className="flex">
                  <div className="flex-1">
                    {identities.slice(0, 3).map((detailVaccine, idx) => {
                      return (
                        <div key={idx} className="my-2">
                          <h3 className="text-gray-400">{detailVaccine.title}</h3>
                          <p>{detailVaccine.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex-1">
                    {identities.slice(3, 6).map((detailVaccine, idx) => {
                      return (
                        <div key={idx} className="my-2">
                          <h3 className="text-gray-400">{detailVaccine.title}</h3>
                          <p>{detailVaccine.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default TicketVaccineDetailPage;
