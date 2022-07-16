import React, { useEffect, useState } from "react";
import { Card, Layout, LoadingAnimation } from "../../Components";
import { usePath } from "../../context/PathContext";
import Breadcrumb from "../../Components/Breadcrumb";
import axiosInstance from "../../network/apis";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TicketVaccinePage = () => {
  const { anchorPath, pathArr } = usePath();

  const { getUserByIdResult } = useSelector(state => state.userId);

  const [ticketVaccines, setTicketVaccines] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getTicketVaccine = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/v1/vaccination-pass?user_id=${getUserByIdResult.id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
      });
      setTicketVaccines(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (getUserByIdResult) getTicketVaccine();
  }, [getUserByIdResult]);

  return (
    <Layout>
      <Breadcrumb anchorPath={anchorPath} pathArr={pathArr} selectedPath={pathArr[pathArr - 1]} />
      <div className="my-8">
        <Card maxWidth="700px" margin="auto" padding="2rem 3rem">
          <h1 className="font-bold text-xl">Tiket Vaksin</h1>
          {loading ? (
            <LoadingAnimation />
          ) : (
            ticketVaccines?.map(ticketVaccine => {
              return (
                <div key={ticketVaccine.id} className="p-2 border-2 my-4 rounded-2xl cursor-pointer" onClick={() => navigate(`${ticketVaccine.id}`)}>
                  <p>{ticketVaccine.name}</p>
                </div>
              );
            })
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default TicketVaccinePage;
