import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Layout, LoadingAnimation } from "../../../Components";
import { usePath } from "../../../context/PathContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../network/apis";
import { AiOutlineEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SessionsAvailabilityPageByFaskes = () => {
  const { anchorPath, pathArr } = usePath();

  const navigate = useNavigate();

  const { healthFacilityId } = useParams();

  const [vaccinationSessions, setVaccinationSessions] = useState(null);

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
        setVaccinationSessions(response.data.data);
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

  const handleDelete = async id => {
    try {
      const res = await axiosInstance.delete(`/api/v1/vaccination-session/${id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
      });
      if (res.data.message === "SUCCESS") {
        Swal.fire({
          title: "SUCCESS !",
          text: "Berhasil menghapus",
          icon: "success",
          confirmButtonText: "Close",
        });
        getFetchingData();
      }
    } catch (error) {
      if (error.message === "Request failed with status code 400") {
        toast.error("Tidak dapat menghapus sesi !");
      }
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
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-xl">Daftar Sesi Vaksinasi di {healthFacility?.name}</h1>
              <Button color="white" fontSize=".75rem" bg="#0A6C9D" onClick={() => navigate("create")}>
                Tambah Sesi
              </Button>
            </div>
            {vaccinationSessions?.length === 0 ? (
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
                  {vaccinationSessions.map(vaccineSession => {
                    return (
                      <tr key={vaccineSession.id}>
                        <td className="p-4 border-2">{vaccineSession.schedule_date}</td>
                        <td className="p-4 border-2">
                          {vaccineSession.schedule_time_start} - {vaccineSession.schedule_time_end}
                        </td>
                        <td className="p-4 border-2">{vaccineSession.vaccine.name}</td>
                        <td className="p-4 border-2">{vaccineSession.quantity}</td>
                        <td className="p-4 border-2">{vaccineSession.booked}</td>
                        <td className="p-4 border-2">
                          <div className="flex items-center justify-center">
                            <div onClick={() => navigate(`view/${vaccineSession.id}`)} className="cursor-pointer">
                              <AiOutlineEye size={20} />
                            </div>
                            <div onClick={() => navigate(`edit/${vaccineSession.id}`)} className="cursor-pointer">
                              <BiEdit size={20} />
                            </div>
                            <div className="cursor-pointer" onClick={() => handleDelete(vaccineSession.id)}>
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
    </Layout>
  );
};

export default SessionsAvailabilityPageByFaskes;
