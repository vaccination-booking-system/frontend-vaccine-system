import React, { useEffect, useState } from "react";
import { Breadcrumb, Card, Layout, LoadingAnimation } from "../../../Components";
import { usePath } from "../../../context/PathContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../network/apis";
import { AiOutlineEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const SessionsAvailabilityPageByFaskes = () => {
  const { anchorPath, pathArr } = usePath();

  const navigate = useNavigate();

  const { healthFacilityId } = useParams();

  const [vaccinationPass, setVaccinationPass] = useState(null);

  const [healthFacility, setHealthFacility] = useState(null);

  const [loading, setLoading] = useState(true);

  const getFetchingData = () => {
    setLoading(true);
    axiosInstance
      .get(`/api/v1/vaccination-session?health_facility_id=${healthFacilityId}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(response => {
        setVaccinationPass(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
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

  useEffect(() => {
    (async () => {
      getHealthFacilityById(healthFacilityId);
      getFetchingData();
    })();
  }, [healthFacilityId]);
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
            <h1 className="font-bold text-xl">Daftar Sesi Vaksinasi di {healthFacility?.name}</h1>
            {vaccinationPass?.length === 0 ? (
              <p className="mt-4 text-center">Data Kosong</p>
            ) : (
              <table className="table-auto mt-4 m-auto w-full">
                <thead>
                  <tr>
                    <th className="p-4 border-2">TANGGAL VAKSIN</th>
                    <th className="p-4 border-2">WAKTU</th>
                    <th className="p-4 border-2">JENIS VAKSIN</th>
                    <th className="p-4 border-2">KUOTA</th>
                    <th className="p-4 border-2">PESERTA</th>
                    <th className="p-4 border-2">AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {vaccinationPass.map(vaccinePass => {
                    return (
                      <tr key={vaccinePass.id}>
                        <td className="p-4 border-2">{vaccinePass.schedule_date}</td>
                        <td className="p-4 border-2">
                          {vaccinePass.schedule_time_start} - {vaccinePass.schedule_time_end}
                        </td>
                        <td className="p-4 border-2">{vaccinePass.vaccine.name}</td>
                        <td className="p-4 border-2">{vaccinePass.quantity}</td>
                        <td className="p-4 border-2">{vaccinePass.booked}</td>
                        <td className="p-4 border-2">
                          <div className="flex items-center justify-center">
                            <div onClick={() => navigate(`view/${vaccinePass.id}`)} className="cursor-pointer">
                              <AiOutlineEye size={20} />
                            </div>
                            <div>
                              <BiEdit size={20} />
                            </div>
                            <div className="cursor-pointer">
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

export default SessionsAvailabilityPageByFaskes;
