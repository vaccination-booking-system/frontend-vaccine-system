import React, { useEffect, useState } from "react";
import { Breadcrumb, Card, Layout, LoadingAnimation } from "../../../Components";
import { usePath } from "../../../context/PathContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../network/apis";

const VaccinationBookingsAdmin = () => {
  const { getUserByIdResult, getUserByIdLoading } = useSelector(state => state.userId);

  const { pathArr, anchorPath } = usePath();

  const [healthFacilities, setHealthFacilities] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getHealthFacility = async id => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/v1/health-facilities", {
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
      });
      const filteredHealthFacilityByAdminId = res.data.data.filter(healthFacility => {
        return healthFacility.admin.id === id;
      });
      setHealthFacilities(filteredHealthFacilityByAdminId);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (getUserByIdResult) getHealthFacility(getUserByIdResult.id);
  }, [getUserByIdResult]);

  return (
    <Layout>
      <div>
        <Breadcrumb pathArr={pathArr} anchorPath={anchorPath} selectedPath={pathArr[pathArr.length - 1]} />
        <div className="my-8">
          {getUserByIdResult ? (
            <Card maxWidth="700px" margin="auto" padding="2rem 3rem">
              <h2 className="font-bold text-lg">Pilih Fasilitas Kesehatan</h2>
              <div className="mt-4">
                {loading ? (
                  <LoadingAnimation />
                ) : (
                  healthFacilities?.map(healthFacility => {
                    return (
                      <div
                        key={healthFacility.id}
                        className="p-4 border-2 rounded-2xl my-2 cursor-pointer"
                        onClick={() => {
                          navigate(`${healthFacility.id}`);
                        }}
                      >
                        <p>{healthFacility.name}</p>
                      </div>
                    );
                  })
                )}
              </div>
            </Card>
          ) : getUserByIdLoading ? (
            <LoadingAnimation />
          ) : (
            ""
          )}
        </div>
      </div>
    </Layout>
  );
};

export default VaccinationBookingsAdmin;
