import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Card } from "../../Components";
import { usePath } from "../../context/PathContext";
import axiosInstance from "../../network/apis";
import FormInputIdentitas from "./components/FormInputIdentitas";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingsAlamatPage = () => {
  const { anchorPath, pathArr } = usePath();

  const { state } = useLocation();

  const { selectedUser } = state;

  const navigate = useNavigate();

  const [formInputKtp1, setFormInputKtp1] = useState([
    { type: "text", label: "Jalan", name: "jalan-ktp", value: "" },
    { type: "text", label: "Nomor Induk Kependudukan", name: "nik-ktp", value: "" },
    {
      type: "select",
      label: "Provinsi",
      name: "provinsi-ktp",
      value: "",
      options: [{ id: 1, text: "Pilih Provinsi Anda", value: "" }],
    },
    { type: "text", label: "RT", name: "rt-ktp", value: "" },
  ]);

  const [formInputKtp2, setFormInputKtp2] = useState([
    {
      type: "select",
      label: "Kota/Kabupaten",
      name: "kota/kabupaten-ktp",
      value: "",
      options: [{ id: 1, text: "Pilih Kota/Kabupaten Anda", value: "" }],
    },
    {
      type: "select",
      label: "Kecamatan",
      name: "kecamatan-ktp",
      value: "",
      options: [{ id: 1, text: "Pilih Kecamatan Anda", value: "" }],
    },
    {
      type: "select",
      label: "Kelurahan",
      name: "kelurahan-ktp",
      value: "",
      options: [{ id: 1, text: "Pilih Kelurahan Anda", value: "" }],
    },
    { type: "text", label: "RW", name: "rw-ktp", value: "" },
  ]);

  const [formInputDomisili1, setFormInputDomisili1] = useState([
    { type: "text", label: "Jalan", name: "jalan-domisili", value: "" },
    { type: "text", label: "Nomor Induk Kependudukan", name: "nik-domisili", value: "" },
    {
      type: "select",
      label: "Provinsi",
      name: "provinsi-domisili",
      value: "",
      options: [{ id: 1, text: "Pilih Provinsi Anda", value: "" }],
    },
    { type: "text", label: "RT", name: "rt-domisili", value: "" },
  ]);

  const [formInputDomisili2, setFormInputDomisili2] = useState([
    {
      type: "select",
      label: "Kota/Kabupaten",
      name: "kota/kabupaten-domisili",
      value: "",
      options: [{ id: 1, text: "Pilih Kota/Kabupaten Anda", value: "" }],
    },
    {
      type: "select",
      label: "Kecamatan",
      name: "kecamatan-domisili",
      value: "",
      options: [{ id: 1, text: "Pilih Kecamatan Anda", value: "" }],
    },
    {
      type: "select",
      label: "Kelurahan",
      name: "kelurahan-domisili",
      value: "",
      options: [{ id: 1, text: "Pilih Kelurahan Anda", value: "" }],
    },
    { type: "text", label: "RW", name: "rw-domisili", value: "" },
  ]);

  const [isAddressSameWithKtp, setIsAddressSameWithKtp] = useState(false);

  // console.log({ selectedUser });

  const getNewFormInput = (formInput, res) => {
    console.log({ res, formInput });
    return formInput.map(input => {
      if (input.name === "provinsi-ktp" || input.name === "provinsi-domisili") {
        return {
          ...input,
          options: [
            ...input.options,
            ...res.data.map(data => {
              return { ...data, id: parseInt(data.id), text: data.name, value: data.id };
            }),
          ],
        };
      }
      if (input.name === "kota/kabupaten-ktp" || input.name === "kota/kabupaten-domisili") {
        return {
          ...input,
          options: [
            ...[{ id: 1, text: "Pilih Kota/Kabupaten Anda", value: "" }],
            ...res.data.map(data => {
              return { ...data, id: parseInt(data.id), text: data.name, value: data.id };
            }),
          ],
        };
      }
      return input;
    });
  };

  const getProvinceData = async () => {
    try {
      const res = await axios.get("http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
      console.log(res);
      const newFormInputKtp1 = getNewFormInput(formInputKtp1, res);
      const newFormInputDomisili1 = getNewFormInput(formInputDomisili1, res);
      setFormInputKtp1(newFormInputKtp1);
      setFormInputDomisili1(newFormInputDomisili1);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getKotaKabupaten = async (provinceId, typeAddress) => {
    console.log({ provinceId, typeAddress });
    try {
      const res = await axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
      if (typeAddress === "ktp") {
        const newFormInputKtp2 = getNewFormInput(formInputKtp2, res);
        setFormInputKtp2(newFormInputKtp2);
      } else if (typeAddress === "domisili") {
        const newFormInputDomisili2 = getNewFormInput(formInputDomisili2, res);
        setFormInputDomisili2(newFormInputDomisili2);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getKecamatan = async (kotaKabupatenId, typeAddress) => {
    try {
      const res = await axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/districts/${kotaKabupatenId}.json`);
      if (typeAddress === "ktp") {
        const newFormInputKtp2 = formInputKtp2.map(input => {
          if (input.name === "kecamatan-ktp") {
            return {
              ...input,
              options: [
                ...[{ id: 1, text: "Pilih Kecamatan Anda", value: "" }],
                ...res.data.map(data => {
                  return { ...data, id: parseInt(data.id), text: data.name, value: data.id };
                }),
              ],
            };
          }
          return input;
        });
        setFormInputKtp2(newFormInputKtp2);
      } else if (typeAddress === "domisili") {
        const newFormInputDomisili2 = formInputDomisili2.map(input => {
          if (input.name === "kecamatan-domisili") {
            return {
              ...input,
              options: [
                ...[{ id: 1, text: "Pilih Kecamatan Anda", value: "" }],
                ...res.data.map(data => {
                  return { ...data, id: parseInt(data.id), text: data.name, value: data.id };
                }),
              ],
            };
          }
          return input;
        });
        setFormInputDomisili2(newFormInputDomisili2);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getKelurahan = async (kecamatanId, typeAddress) => {
    try {
      const res = await axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/villages/${kecamatanId}.json`);
      if (typeAddress === "ktp") {
        const newFormInputKtp2 = formInputKtp2.map(input => {
          if (input.name === "kelurahan-ktp") {
            return {
              ...input,
              options: [
                ...[{ id: 1, text: "Pilih Kelurahan Anda", value: "" }],
                ...res.data.map(data => {
                  return { ...data, id: parseInt(data.id), text: data.name, value: data.id };
                }),
              ],
            };
          }
          return input;
        });
        setFormInputKtp2(newFormInputKtp2);
      } else if (typeAddress === "domisili") {
        const newFormInputDomisili2 = formInputDomisili2.map(input => {
          if (input.name === "kelurahan-domisili") {
            return {
              ...input,
              options: [
                ...[{ id: 1, text: "Pilih Kelurahan Anda", value: "" }],
                ...res.data.map(data => {
                  return { ...data, id: parseInt(data.id), text: data.name, value: data.id };
                }),
              ],
            };
          }
          return input;
        });
        setFormInputDomisili2(newFormInputDomisili2);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    const updatingMapInput = (input, name, value) => {
      if (name === input.name) {
        return { ...input, value };
      }
      return input;
    };

    if (name === "jalan-ktp" || name === "nik-ktp" || name === "provinsi-ktp" || name === "rt-ktp") {
      const newFormInputKtp1 = formInputKtp1.map(input => {
        return updatingMapInput(input, name, value);
      });
      setFormInputKtp1(newFormInputKtp1);
    }

    if (name === "kota/kabupaten-ktp" || name === "kecamatan-ktp" || name === "kelurahan-ktp" || name === "rw-ktp") {
      const newFormInputKtp2 = formInputKtp2.map(input => {
        return updatingMapInput(input, name, value);
      });
      setFormInputKtp2(newFormInputKtp2);
    }

    if (name === "jalan-domisili" || name === "nik-domisili" || name === "provinsi-domisili" || name === "rt-domisili") {
      const newFormInputDomisili1 = formInputDomisili1.map(input => {
        return updatingMapInput(input, name, value);
      });
      setFormInputDomisili1(newFormInputDomisili1);
    }

    if (name === "kota/kabupaten-domisili" || name === "kecamatan-domisili" || name === "kelurahan-domisili" || name === "rw-domisili") {
      const newFormInputDomisili2 = formInputDomisili2.map(input => {
        return updatingMapInput(input, name, value);
      });
      setFormInputDomisili2(newFormInputDomisili2);
    }
  };

  const isAllFormInputValueExist = formInput => {
    let isAllValueExist = false;
    for (let i = 0; i < formInput.length; i++) {
      if (formInput[i].value !== "") {
        if (i === formInput.length - 1) {
          isAllValueExist = true;
        }
        continue;
      }
    }
    return isAllValueExist;
  };

  const handleClickNext = () => {
    const formInputKtp = [...formInputKtp1, ...formInputKtp2];
    const formInputDomisili = [...formInputDomisili1, ...formInputDomisili2];
    if (!isAllFormInputValueExist(formInputKtp) || !isAllFormInputValueExist(formInputDomisili)) {
      toast.error("Masukkan data dengan benar!");
    } else {
      navigate("tinjau", {
        state: {
          selectedUser: {
            ...selectedUser,
            bookingsDetail: {
              ...selectedUser.bookingsDetail,
              alamat: {
                ktp: {
                  jalan: formInputKtp[0].value,
                  nik: formInputKtp[1].value,
                  provinsi: formInputKtp[2].value,
                  rt: formInputKtp[3].value,
                  kotaKabupaten: formInputKtp[4].value,
                  kecamatan: formInputKtp[5].value,
                  kelurahan: formInputKtp[6].value,
                  rw: formInputKtp[7].value,
                },
                domisili: {
                  jalan: formInputDomisili[0].value,
                  nik: formInputDomisili[1].value,
                  provinsi: formInputDomisili[2].value,
                  rt: formInputDomisili[3].value,
                  kotaKabupaten: formInputDomisili[4].value,
                  kecamatan: formInputDomisili[5].value,
                  kelurahan: formInputDomisili[6].value,
                  rw: formInputDomisili[7].value,
                },
              },
            },
          },
        },
      });
    }
  };

  console.log([...formInputKtp1, ...formInputKtp2]);

  useEffect(() => {
    if (formInputKtp1[2].value !== "") getKotaKabupaten(formInputKtp1[2].value, "ktp");
    else {
      setFormInputKtp2(
        formInputKtp2.map(input => {
          if (input.name === "kota/kabupaten-ktp") {
            return {
              ...input,
              options: [{ id: 1, text: "Pilih Kota/Kabupaten Anda", value: "" }],
            };
          }
          return input;
        })
      );
    }
  }, [formInputKtp1[2]]); // dependency for province select

  useEffect(() => {
    if (formInputDomisili1[2].value !== "") getKotaKabupaten(formInputDomisili1[2].value, "domisili");
    else {
      setFormInputDomisili2(
        formInputDomisili2.map(input => {
          if (input.name === "kota/kabupaten-domisili") {
            return {
              ...input,
              options: [{ id: 1, text: "Pilih Kota/Kabupaten Anda", value: "" }],
            };
          }
          return input;
        })
      );
    }
  }, [formInputDomisili1[2]]); // dependency for province select

  useEffect(() => {
    if (formInputKtp2[0].value !== "") getKecamatan(formInputKtp2[0].value, "ktp");
    else {
      setFormInputKtp2(
        formInputKtp2.map(input => {
          if (input.name === "kecamatan-ktp") {
            return {
              ...input,
              options: [{ id: 1, text: "Pilih Kecamatan Anda", value: "" }],
            };
          }
          return input;
        })
      );
    }
  }, [formInputKtp2[0]]); // dependency for regencies select

  useEffect(() => {
    if (formInputDomisili2[0].value !== "") getKecamatan(formInputDomisili2[0].value, "domisili");
    else {
      setFormInputDomisili2(
        formInputDomisili2.map(input => {
          if (input.name === "kecamatan-domisili") {
            return {
              ...input,
              options: [{ id: 1, text: "Pilih Kecamatan Anda", value: "" }],
            };
          }
          return input;
        })
      );
    }
  }, [formInputDomisili2[0]]); // dependency for regencies select

  useEffect(() => {
    if (formInputKtp2[1].value !== "") getKelurahan(formInputKtp2[1].value, "ktp");
    else {
      setFormInputKtp2(
        formInputKtp2.map(input => {
          if (input.name === "kelurahan-ktp") {
            return {
              ...input,
              options: [{ id: 1, text: "Pilih Kelurahan Anda", value: "" }],
            };
          }
          return input;
        })
      );
    }
  }, [formInputKtp2[1]]); // dependency for district select

  useEffect(() => {
    if (formInputDomisili2[1].value !== "") getKelurahan(formInputDomisili2[1].value, "domisili");
    else {
      setFormInputDomisili2(
        formInputDomisili2.map(input => {
          if (input.name === "kelurahan-domisili") {
            return {
              ...input,
              options: [{ id: 1, text: "Pilih Kelurahan Anda", value: "" }],
            };
          }
          return input;
        })
      );
    }
  }, [formInputDomisili2[1]]); // dependency for district select

  useEffect(() => {
    if (isAddressSameWithKtp) {
      setFormInputDomisili1(formInputKtp1);
      setFormInputDomisili2(formInputKtp2);
    }
  }, [isAddressSameWithKtp]);

  useEffect(() => {
    getProvinceData();
  }, []);

  return (
    <div>
      <Breadcrumb anchorPath={anchorPath} pathArr={pathArr} selectedPath={pathArr[pathArr.length - 1]} selectedUser={selectedUser} />
      <div className="my-8">
        <Card maxWidth="700px" margin="auto" padding="2rem 3rem">
          <div className="my-4">
            <h1 className="font-bold text-xl">ALAMAT (SESUAI KTP)</h1>
            <FormInputIdentitas alamatType="ktp" formInput1={formInputKtp1} formInput2={formInputKtp2} handleChange={handleChange} />
          </div>
          <div className="my-4">
            <h1 className="font-bold text-xl">ALAMAT DOMISILI</h1>
            <div className="my-4">
              <p>Tempat tinggal di wilayah saat ini</p>
              <div className="flex items-center">
                <input
                  type={"checkbox"}
                  id="checkboxSameWithKtp"
                  checked={isAddressSameWithKtp}
                  onChange={() => setIsAddressSameWithKtp(!isAddressSameWithKtp)}
                />
                <label htmlFor="checkboxSameWithKtp" className="mx-2">
                  Sama dengan alamat KTP
                </label>
              </div>
            </div>
            <FormInputIdentitas alamatType="domisili" formInput1={formInputDomisili1} formInput2={formInputDomisili2} handleChange={handleChange} />
          </div>
          <div className="flex">
            <div className="flex-1 pr-2">
              <Button
                btnSize="full"
                fontSize=".75rem"
                color="#0A6C9D"
                bg="white"
                border="1px solid #0A6C9D"
                onClick={() => navigate("/booking-vaccine/sk/member/status/kategori/jadwal", { state: { selectedUser } })}
              >
                Sebelumnya
              </Button>
            </div>
            <div className="flex-1 pl-2">
              <Button btnSize="full" fontSize=".75rem" color="white" bg="#0A6C9D" onClick={() => handleClickNext()}>
                Selanjutnya
              </Button>
            </div>
          </div>
        </Card>
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
    </div>
  );
};

export default BookingsAlamatPage;
