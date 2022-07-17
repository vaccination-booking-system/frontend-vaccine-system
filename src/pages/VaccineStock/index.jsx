import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Card, Layout, LoadingAnimation } from "../../Components";
import { usePath } from "../../context/PathContext";
import axiosInstance from "../../network/apis";

const VaccineStockPage = () => {
  const { anchorPath, pathArr } = usePath();

  const [isLoading, setIsLoading] = useState(false);

  const [healthFacilites, setHealthFacilities] = useState(null);

  const { getUserByIdResult } = useSelector(state => state.userId);

  const navigate = useNavigate();

  const getHealthFacilities = adminId => {
    setIsLoading(true);
    axiosInstance
      .get("/api/v1/health-facilities", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(response => {
        const filteredHealthFacilitiesByAdminId = response.data.data.filter(item => {
          return item.admin.id === adminId;
        });
        console.log(response.data.data);
        setHealthFacilities(filteredHealthFacilitiesByAdminId);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getHealthFacilities(getUserByIdResult.id);
  }, [getUserByIdResult]);

  const clickedFacilities = id => {
    navigate(`${id}`);
  };
  return (
    <Layout>
      <Card>
        <Breadcrumb anchorPath={anchorPath} pathArr={pathArr} selectedPath={pathArr[pathArr.length - 1]} />
      </Card>
      <Card margin="24px 0px">
        <div className="py-4 pl-4 text-[#2D3748] font-bold">
          <span>Pilih Fasilitas Kesehatan</span>
        </div>
        <div className="mx-4">
          <div className="flex justify-around gap-x-[200px]">
            {/* <span>JENIS VAKSIN</span>
            <span>STOCK</span>
            <span>KETERANGAN</span>
            <span>AKSI</span> */}
          </div>
          {isLoading ? (
            <LoadingAnimation />
          ) : (
            <div>
              <ul>
                {healthFacilites?.map((healthFacility, index) => {
                  return (
                    <li key={index}>
                      <div className="p-4 border-2 rounded-2xl my-2 cursor-pointer" onClick={() => clickedFacilities(healthFacility.id)}>
                        {healthFacility.name}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </Layout>
  );
};

export default VaccineStockPage;
