import React from "react";
import { Card, Layout, Breadcrumb, LoadingAnimation, Button } from "../../../Components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../../../network/apis";
import { useState } from "react";
import { usePath } from "../../../context/PathContext";
import { HiOutlineSearch } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const DetailVaccineStocks = () => {
  const { anchorPath, pathArr } = usePath();

  const { id: healthFacilityId } = useParams();

  const [vaccineStocks, setVaccineStocks] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [inputsStock, setInputsStock] = useState(null);

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
        setInputsStock(
          response.data.data.map((data, idx) => {
            return { id: idx, value: "" };
          })
        );
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleChangeInput = (idx, value) => {
    const newInputsStocks = inputsStock.map(input => {
      if (input.id === idx) {
        return { ...input, value: value };
      }
      return { ...input };
    });
    setInputsStock(newInputsStocks);
  };

  const addStock = async (vaccineId, inputId) => {
    if (inputsStock[inputId].value === "") {
      toast.error("Masukkan data dengan benar !");
    } else {
      try {
        const res = await axiosInstance.post(
          `/api/v1/health-facilities/${pathArr[pathArr.length - 1]}/vaccines`,
          {
            vaccine: {
              id: vaccineId,
            },
            quantity: inputsStock[inputId].value,
          },
          { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } }
        );
        Swal.fire({ title: "SUCCESS !", text: "Berhasil tambah stock vaksin ! ", icon: "success", showConfirmButton: false, timer: 2500 });
        getFetchingData();
      } catch (error) {
        console.log(error.message);
      }
    }
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
      <Card maxWidth="700px" margin="auto" padding="2rem 3rem">
        <span className="text-[#2D3748] font-bold">Detail Data Vaccine</span>
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <table className="table-auto mt-4 m-auto w-full">
            <thead>
              <tr>
                <th className="p-4 border-2">Jenis Vaksin</th>
                <th className="p-4 border-2">Stok</th>
                <th className="p-4 border-2">Jumlah yang ditambahkan</th>
                <th className="p-4 border-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {vaccineStocks?.map((stock, idx) => {
                return (
                  <tr key={idx}>
                    <td className="p-4 border-2">{stock.vaccine.name}</td>
                    <td className="p-4 border-2">{stock.stock}</td>
                    <td className="p-4 border-2">
                      <input
                        className="p-2 rounded-md border-2"
                        type="number"
                        value={inputsStock[idx].value}
                        onChange={e => handleChangeInput(idx, e.target.value)}
                      />
                    </td>
                    <td className="p-4 border-2">
                      <Button color="white" fontSize=".75rem" bg="#0A6C9D" onClick={() => addStock(stock.vaccine.id, idx)}>
                        Tambah Stok
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>
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

export default DetailVaccineStocks;
