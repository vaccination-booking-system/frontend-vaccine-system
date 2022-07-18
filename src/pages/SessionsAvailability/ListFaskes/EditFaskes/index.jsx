import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, Card, LoadingAnimation, Button } from "../../../../Components";
import { usePath } from "../../../../context/PathContext";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../network/apis";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SessionAvailabilityEditPage = () => {
  const { anchorPath, pathArr } = usePath();

  const { vaccinationSessionId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formInput, setFormInput] = useState([
    { label: "Tanggal Vaksin", type: "date", placeholder: "Masukkan Tanggal Vaksin", name: "tanggalLahir", value: "" },
    { label: "Jam Mulai", type: "text", placeholder: "Masukkan Jam Mulai", name: "jamMulai", value: "" },
    { label: "Jam Selesai", type: "text", placeholder: "Masukkan Jam Selesai", name: "jamSelesai", value: "" },
    { label: "Jenis Vaksin", type: "select", name: "jenisVaksin", value: "", options: [{ id: 0, text: "Pilih Jenis Vaksin", value: "" }] },
    { label: "Kuota", type: "number", placeholder: "Masukkan Kuota Vaksin", name: "kuotaVaksin", value: "" },
  ]);

  const getVacineStock = async id => {
    try {
      const res = await axiosInstance.get(`/api/v1/health-facilities/${id}/vaccines`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
      });
      const newFormInput = formInput.map(input => {
        if (input.label === "Jenis Vaksin") {
          return {
            ...input,
            options: [
              ...[{ id: 0, text: "Pilih Jenis Vaksin", value: "" }],
              ...res.data.data.map(data => {
                return { id: data.vaccine.id, text: `${data.vaccine.name}, sisa stok : ${data.stock}`, value: data.vaccine.id };
              }),
            ],
          };
        }
        return { ...input };
      });
      setFormInput(newFormInput);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getVaccinationSessionById = async sessionId => {
    try {
      const res = await axiosInstance.get(`/api/v1/vaccination-session/${sessionId}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
      });
      console.log(res);
      const newFormInput = formInput.map(input => {
        if (input.name === "tanggalLahir") {
          return { ...input, value: res.data.data.schedule_date };
        }
        if (input.name === "jamMulai") {
          return { ...input, value: res.data.data.schedule_time_start };
        }
        if (input.name === "jamSelesai") {
          return { ...input, value: res.data.data.schedule_time_end };
        }
        if (input.name === "jenisVaksin") {
          return { ...input, value: res.data.data.vaccine.id };
        }
        if (input.name === "kuotaVaksin") {
          return { ...input, value: res.data.data.quantity };
        }
        return { ...input };
      });
      setFormInput(newFormInput);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "tanggalLahir") {
      const newFormInput = formInput.map(input => {
        if (input.name === "tanggalLahir") {
          return { ...input, value };
        }
        return { ...input };
      });
      setFormInput(newFormInput);
    }
    if (name === "jamMulai") {
      const newFormInput = formInput.map(input => {
        if (input.name === "jamMulai") {
          return { ...input, value };
        }
        return { ...input };
      });
      setFormInput(newFormInput);
    }
    if (name === "jamSelesai") {
      const newFormInput = formInput.map(input => {
        if (input.name === "jamSelesai") {
          return { ...input, value };
        }
        return { ...input };
      });
      setFormInput(newFormInput);
    }
    if (name === "jenisVaksin") {
      const newFormInput = formInput.map(input => {
        if (input.name === "jenisVaksin") {
          return { ...input, value };
        }
        return { ...input };
      });
      setFormInput(newFormInput);
    }
    if (name === "kuotaVaksin") {
      const newFormInput = formInput.map(input => {
        if (input.name === "kuotaVaksin") {
          return { ...input, value };
        }
        return { ...input };
      });
      setFormInput(newFormInput);
    }
  };

  const handleUpdateSession = async () => {
    if (
      formInput[0].value === "" ||
      formInput[1].value === "" ||
      formInput[2].value === "" ||
      formInput[3].value === "" ||
      formInput[4].value === ""
    ) {
      toast.error("Masukkan data dengan benar!");
    } else {
      try {
        const res = await axiosInstance.put(
          `/api/v1/vaccination-session/${vaccinationSessionId}`,
          {
            vaccine: { id: formInput[3].value },
            schedule_date: formInput[0].value,
            schedule_time_start: formInput[1].value,
            schedule_time_end: formInput[2].value,
            quantity: formInput[4].value,
          },
          { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } }
        );
        new Promise((resolve, reject) => {
          resolve(Swal.fire({ title: "SUCCESS !", text: "Berhasil update sesi ! ", icon: "success", showConfirmButton: false, timer: 2500 }));
        }).then(() => {
          navigate(`/sessions-availability/daftar-faskes/${pathArr[2]}/view/${pathArr[pathArr.length - 1]}`);
        });
      } catch (error) {
        if (error.message === "Request failed with status code 400") {
          toast.error("Stok kurang!!!");
        }
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (pathArr.length === 5) await getVacineStock(pathArr[pathArr.length - 3]);
      getVaccinationSessionById(vaccinationSessionId);
    })();
  }, [pathArr]);

  console.log(formInput);

  return (
    <Layout>
      <Breadcrumb anchorPath={anchorPath} pathArr={pathArr} selectedPath={pathArr[pathArr.length - 1]} />
      <div className="my-8">
        {loading ? (
          <LoadingAnimation />
        ) : (
          <Card maxWidth="700px" margin="auto" padding="2rem 3rem">
            <h1 className="font-bold text-xl">Edit Session</h1>
            <div className="flex">
              <div className="flex-1 pr-2">
                {formInput.slice(0, 3).map((input, idx) => {
                  return (
                    <div key={idx} className="my-2">
                      <label>{input.label}</label>
                      {input.name === "tanggalVaksin" ? (
                        <input
                          type={input.type}
                          name={input.name}
                          value={input.value}
                          className="rounded-md border-2 p-2 w-full"
                          placeholder={input.placeholder}
                          onChange={e => handleChange(e)}
                        />
                      ) : (
                        <input
                          type={input.type}
                          name={input.name}
                          value={input.value}
                          className="rounded-md border-2 p-[0.37rem] w-full"
                          placeholder={input.placeholder}
                          onChange={e => handleChange(e)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex-1 pl-2">
                {formInput.slice(3, 5).map((input, idx) => {
                  return (
                    <div className="my-2" key={idx}>
                      <label className="block">{input.label}</label>
                      {input.type === "text" || input.type === "number" || input.type === "date" ? (
                        <input
                          type={input.type}
                          name={input.name}
                          value={input.value}
                          className="rounded-md border-2 p-2 w-full"
                          placeholder={input.placeholder}
                          onChange={e => handleChange(e)}
                        />
                      ) : input.type === "select" ? (
                        <select name={input.name} value={input.value} className="rounded-md border-2 p-2 w-full" onChange={e => handleChange(e)}>
                          {input.options.map(option => {
                            return (
                              <option key={option.id} value={option.value}>
                                {option.text}
                              </option>
                            );
                          })}
                        </select>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Button btnSize="lg" color="white" fontSize=".75rem" bg="#0A6C9D" onClick={() => handleUpdateSession()}>
                Tambah
              </Button>
            </div>
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

export default SessionAvailabilityEditPage;
