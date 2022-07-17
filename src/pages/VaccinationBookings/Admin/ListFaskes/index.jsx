import React, { useEffect, useState } from "react";
import { Breadcrumb, Card, Layout, LoadingAnimation } from "../../../../Components";
import { usePath } from "../../../../context/PathContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../../network/apis";
import { AiOutlineEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const VaccinationBookingsListFaskes = () => {
  const { anchorPath, pathArr } = usePath();

  const navigate = useNavigate();

  const { healthFacilityId } = useParams();

  const [vaccinationPass, setVaccinationPass] = useState(null);

  const [healthFacility, setHealthFacility] = useState(null);

  const [loading, setLoading] = useState(true);

  const [sessionIdArr, setSessionIdArr] = useState(null);

  const getVaccinationSessionIdByHealthFacilityId = async id => {
    try {
      const res = await axiosInstance.get(`/api/v1/vaccination-session?health_facility_id=${id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
      });
      const sessionId = res.data.data.map(data => {
        return data.id;
      });
      return sessionId;
    } catch (error) {
      console.log(error.message);
    }
  };

  const getVaccinationPassBySessionId = async idArr => {
    try {
      const res = await axiosInstance.get("/api/v1/vaccination-pass", {
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
      });
      const tempArr = [];
      for (let i = 0; i < idArr.length; i++) {
        const filteredVaccinationPassBySessionId = res.data.data.filter(vaccinationPass => {
          return vaccinationPass.vaccination_session.id === idArr[i];
        });
        tempArr.push(...filteredVaccinationPassBySessionId);
      }
      setVaccinationPass(tempArr);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getHealthFacilityById = async id => {
    try {
      const res = await axiosInstance.get(`/api/v1/health-facilities/${id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
      });

      setHealthFacility(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async id => {
    try {
      await axiosInstance.delete(`/api/v1/vaccination-pass/${id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
      });
      Swal.fire("Success", "Data berhasil dihapus !", "success");
      getVaccinationPassBySessionId(sessionIdArr);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      const sessionId = await getVaccinationSessionIdByHealthFacilityId(healthFacilityId);
      setSessionIdArr(sessionId);
      getVaccinationPassBySessionId(sessionId);
      getHealthFacilityById(healthFacilityId);
    })();
  }, [healthFacilityId]);

  console.log({ vaccinationPass });

  return (
    <Layout>
      <Breadcrumb anchorPath={anchorPath} pathArr={pathArr} selectedPath={pathArr[pathArr.length - 1]} />
      <div className="my-8">
        {loading ? (
          <div className="py-24">
            <LoadingAnimation />
          </div>
        ) : (
          <Card padding="2rem 3rem">
            <h1 className="font-bold text-xl">Daftar Vaksinasi di {healthFacility?.name}</h1>
            {vaccinationPass?.length === 0 ? (
              <p className="mt-4 text-center">Data Kosong</p>
            ) : (
              <table className="table-auto mt-4 m-auto w-full">
                <thead>
                  <tr>
                    <th className="p-4 border-2">No Booking</th>
                    <th className="p-4 border-2">Nama</th>
                    <th className="p-4 border-2">NIK</th>
                    <th className="p-4 border-2">Jenis Kelamin</th>
                    <th className="p-4 border-2">No Telepon</th>
                    <th className="p-4 border-2">Alamat</th>
                    <th className="p-4 border-2">Status</th>
                    <th className="p-4 border-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {vaccinationPass.map(vaccinePass => {
                    return (
                      <tr key={vaccinePass.id}>
                        <td className="p-4 border-2">{`LPA${vaccinePass.id}${new Date(vaccinePass.date_of_birth) / 100000}`}</td>
                        <td className="p-4 border-2">{vaccinePass.name}</td>
                        <td className="p-4 border-2">{vaccinePass.nik}</td>
                        <td className="p-4 border-2">{vaccinePass.gender === "M" ? "Laki-Laki" : "Perempuan"}</td>
                        <td className="p-4 border-2">{vaccinePass.phone_number}</td>
                        <td className="p-4 border-2">{vaccinePass.curr_address}</td>
                        <td className="p-4 border-2">
                          <div className="flex justify-center">
                            {vaccinePass.is_vaccinated ? (
                              <p className="inline-block p-[4px] bg-green-400 font-bold text-xs rounded-xl text-white">Vaccinated</p>
                            ) : (
                              <p className="inline-block p-[4px] bg-orange-500 font-bold text-xs rounded-xl text-white">Not Yet</p>
                            )}
                          </div>
                        </td>
                        <td className="p-4 border-2">
                          <div className="flex items-center justify-center">
                            <div onClick={() => navigate(`view/${vaccinePass.id}`)} className="cursor-pointer">
                              <AiOutlineEye size={20} />
                            </div>
                            <div>
                              <BiEdit size={20} />
                            </div>
                            <div onClick={() => handleDelete(vaccinePass.id)} className="cursor-pointer">
                              <MdDelete size={20} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default VaccinationBookingsListFaskes;
