import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb, Button, Card, Layout, LoadingAnimation } from "../../../../Components";
import { usePath } from "../../../../context/PathContext";
import axiosInstance from "../../../../network/apis";
import { useNavigate } from "react-router-dom";

const SessionsAvailabilityPageByFaskesDetail = () => {
  const { anchorPath, pathArr } = usePath();

  const navigate = useNavigate();

  const { vaccinationSessionId } = useParams();

  const [loading, setLoading] = useState(true);

  const [vaccinationSessionDetail, setVaccinationSessionDetail] = useState([
    { title: "Tanggal Vaksin", desc: "" },
    { title: "Mulai", desc: "" },
    { title: "Selesai", desc: "" },
    { title: "Jenis Vaksin", desc: "" },
    { title: "Kuota", desc: "" },
    { title: "Peserta", desc: "" },
  ]);

  const getVaccinationSessionById = async id => {
    try {
      const res = await axiosInstance.get(`/api/v1/vaccination-session/${id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
      });
      const newVaccinationSessionDetail = vaccinationSessionDetail.map(detail => {
        if (detail.title === "Tanggal Vaksin") {
          return { ...detail, desc: res.data.data.schedule_date };
        }
        if (detail.title === "Mulai") {
          return { ...detail, desc: res.data.data.schedule_time_start };
        }
        if (detail.title === "Selesai") {
          return { ...detail, desc: res.data.data.schedule_time_end };
        }
        if (detail.title === "Jenis Vaksin") {
          return { ...detail, desc: res.data.data.vaccine.name };
        }
        if (detail.title === "Kuota") {
          return { ...detail, desc: res.data.data.quantity };
        }
        if (detail.title === "Peserta") {
          return { ...detail, desc: res.data.data.booked };
        }
        return { ...detail };
      });
      setVaccinationSessionDetail(newVaccinationSessionDetail);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (vaccinationSessionId) getVaccinationSessionById(vaccinationSessionId);
  }, [vaccinationSessionId]);

  return (
    <Layout>
      <Breadcrumb anchorPath={anchorPath} pathArr={pathArr} selectedPath={pathArr[pathArr.length - 1]} />
      <div className="my-8">
        {loading ? (
          <LoadingAnimation />
        ) : (
          <Card maxWidth="700px" margin="auto" padding="2rem 3rem">
            <div>
              <h1 className="font-bold text-xl">Data Sesi Vaksinasi</h1>
              <div className="flex">
                <div className="flex-1">
                  {vaccinationSessionDetail.slice(0, 3).map((detail, idx) => {
                    return (
                      <div key={idx} className="my-4">
                        <h3 className="text-gray-400">{detail.title}</h3>
                        <p>{detail.desc}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex-1">
                  {vaccinationSessionDetail.slice(3, 6).map((detail, idx) => {
                    return (
                      <div key={idx} className="my-4">
                        <h3 className="text-gray-400">{detail.title}</h3>
                        <p>
                          {detail.title !== "Status Vaksin" ? (
                            detail.desc
                          ) : (
                            <p className="p-[4px] bg-orange-500 font-bold text-xs rounded-xl text-white inline-block">Not Yet</p>
                          )}
                        </p>
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

export default SessionsAvailabilityPageByFaskesDetail;
