import React from "react";
import { Card, Layout, Breadcrumb, LoadingAnimation } from "../../../Components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../../../network/apis";
import { useState } from "react";
import { usePath } from "../../../context/PathContext";
import { HiOutlineSearch } from "react-icons/hi";

const DetailVaccineStocks = () => {
  const { anchorPath, pathArr } = usePath();

  const { id: healthFacilityId } = useParams();

  const [vaccineStocks, setVaccineStocks] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isSearch, setSearch] = useState(false);

  const getFetchingData = () => {
    setIsLoading(true);
    axiosInstance
      .get(`/api/v1/health-facilities/${healthFacilityId}/vaccines`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(response => {
        setVaccineStocks(response.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getFetchingData();
  }, []);

  return (
    <Layout>
      <Breadcrumb anchorPath={anchorPath} pathArr={pathArr} selectedPath={pathArr[pathArr.length - 1]} />
      <Card margin="24px 0px">
        <div className="flex gap-x-[10px] py-6">
          <div>
            <input
              type="text"
              className="border-2 rounded-[15px] pl-5 border-[#A0AEC0]"
              placeholder="Search"
              name="inputSearch"
              /* value={input}
              onChange={event => handleInput(event)} */
            />
          </div>
          <button type="submit" /* onSubmit={handleSearch} */ className="text-white bg-[#0A6C9D] w-10 rounded-xl">
            <div className="flex justify-center items-center">
              <HiOutlineSearch />
            </div>
          </button>
        </div>
      </Card>
      <Card margin="20px 0px">
        <span className="text-[#2D3748] font-bold">Detail Data Vaccine</span>
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <div className="flex justify-around gap-x-[200px]">
            <div>
              <div>
                <span>JENIS VAKSIN</span>
              </div>
              <div>
                <ul>
                  {vaccineStocks?.map((vaccineStock, index) => {
                    return (
                      <li key={index} className="pl-5 ">
                        {vaccineStock.vaccine.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div>
              <div>
                <span>STOCK</span>
              </div>
              <div>
                <ul>
                  {vaccineStocks?.map((vaccineStock, index) => {
                    return (
                      <li key={index} className="pl-5">
                        {vaccineStock.stock}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Card>
    </Layout>
  );
};

export default DetailVaccineStocks;
