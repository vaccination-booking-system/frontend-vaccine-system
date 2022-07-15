import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcumb, Button, Card } from "../../Components";
import { usePath } from "../../context/PathContext";
import axiosInstance from "../../network/apis";
import StringHelper from "../../utils/StringHelper";
import { useSelector } from "react-redux";
import DateHelper from "../../utils/DateHelper";
import axios from "axios";
import Swal from "sweetalert2";

const BookingsTinjauPage = () => {
  const { capitalizeFirstLetter } = StringHelper;

  const { convertMonthId, convertDayId } = DateHelper;

  const { getUserByIdLoading, getUserByIdResult, getUserByIdError } = useSelector(state => state.userId);

  const { state } = useLocation();

  const { selectedUser } = state;

  const navigate = useNavigate();

  const { anchorPath, pathArr } = usePath();

  const [loopStateAddress, setLoopStateAddress] = useState(0);

  const [addressKtp, setAddressKtp] = useState([
    {
      name: "provinsi",
      value: {
        id: selectedUser.bookingsDetail.alamat.ktp.provinsi,
        name: "",
      },
    },
    {
      name: "kotaKabupaten",
      value: {
        id: selectedUser.bookingsDetail.alamat.ktp.kotaKabupaten,
        name: "",
      },
    },
    {
      name: "kecamatan",
      value: {
        id: selectedUser.bookingsDetail.alamat.ktp.kecamatan,
        name: "",
      },
    },
    {
      name: "kelurahan",
      value: {
        id: selectedUser.bookingsDetail.alamat.ktp.kelurahan,
        name: "",
      },
    },
  ]);

  const [addressDomisili, setAddressDomisili] = useState([
    {
      name: "provinsi",
      value: {
        id: selectedUser.bookingsDetail.alamat.domisili.provinsi,
        name: "",
      },
    },
    {
      name: "kotaKabupaten",
      value: {
        id: selectedUser.bookingsDetail.alamat.domisili.kotaKabupaten,
        name: "",
      },
    },
    {
      name: "kecamatan",
      value: {
        id: selectedUser.bookingsDetail.alamat.domisili.kecamatan,
        name: "",
      },
    },
    {
      name: "kelurahan",
      value: {
        id: selectedUser.bookingsDetail.alamat.domisili.kelurahan,
        name: "",
      },
    },
  ]);

  const [identity] = useState([
    { title: "NIK", desc: selectedUser.nik },
    { title: "Nama Lengkap", desc: selectedUser.name },
    { title: "Tnaggal Lahir", desc: selectedUser.date_of_birth },
    { title: "Nomer Telepon", desc: selectedUser.phone_number },
  ]);

  const [alamat] = useState([
    {
      title: "Berdasarkan KTP",
      desc: selectedUser.bookingsDetail.alamat.ktp.jalan,
    },
    {
      title: "Domisili",
      desc: selectedUser.bookingsDetail.alamat.domisili.jalan,
    },
  ]);

  const [jadwal, setJadwal] = useState([
    { title: "Tanggal", desc: "" },
    { title: "Jam", desc: "" },
  ]);

  const [category] = useState(selectedUser.bookingsDetail.category);

  const getVaccinationSessionsById = async id => {
    try {
      const res = await axiosInstance.get(`/api/v1/vaccination-session/${id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
      });
      setJadwal(
        jadwal.map(jadwal => {
          return jadwal.title === "Tanggal"
            ? { ...jadwal, desc: res.data.data.schedule_date }
            : jadwal.title === "Jam" && { ...jadwal, desc: `${res.data.data.schedule_time_start} - ${res.data.data.schedule_time_end}` };
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const getProvinceById = async (idKtp, idDomisili) => {
    try {
      const resKtp = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/province/${idKtp}.json`);
      const resDomisili = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/province/${idDomisili}.json`);
      const newAddressKtp = addressKtp.map(address => {
        if (address.name === "provinsi") {
          return { ...address, value: { ...resKtp.data } };
        }
        return address;
      });
      const newAddressDomisili = addressDomisili.map(address => {
        if (address.name === "provinsi") {
          return { ...address, value: { ...resDomisili.data } };
        }
        return address;
      });
      console.log({ newAddressDomisili, newAddressKtp });
      setAddressKtp(newAddressKtp);
      setAddressDomisili(newAddressDomisili);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getKotaKabupatenById = async (idKtp, idDomisili) => {
    try {
      const resKtp = await axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/regency/${idKtp}.json`);
      const resDomisili = await axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/regency/${idDomisili}.json`);
      const newAddressKtp = addressKtp.map(address => {
        if (address.name === "kotaKabupaten") {
          return { ...address, value: { ...resKtp.data } };
        }
        return address;
      });
      const newAddressDomisili = addressDomisili.map(address => {
        if (address.name === "kotaKabupaten") {
          return { ...address, value: { ...resDomisili.data } };
        }
        return address;
      });
      console.log({ newAddressDomisili, newAddressKtp });
      setAddressKtp(newAddressKtp);
      setAddressDomisili(newAddressDomisili);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getKecamatanById = async (idKtp, idDomisili) => {
    try {
      const resKtp = await axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/district/${idKtp}.json`);
      const resDomisili = await axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/district/${idDomisili}.json`);
      const newAddressKtp = addressKtp.map(address => {
        if (address.name === "kecamatan") {
          return { ...address, value: { ...resKtp.data } };
        }
        return address;
      });
      const newAddressDomisili = addressDomisili.map(address => {
        if (address.name === "kecamatan") {
          return { ...address, value: { ...resDomisili.data } };
        }
        return address;
      });
      console.log({ newAddressDomisili, newAddressKtp });
      setAddressKtp(newAddressKtp);
      setAddressDomisili(newAddressDomisili);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getKelurahanById = async (idKtp, idDomisili) => {
    try {
      const resKtp = await axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/village/${idKtp}.json`);
      const resDomisili = await axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/village/${idDomisili}.json`);
      const newAddressKtp = addressKtp.map(address => {
        if (address.name === "kelurahan") {
          return { ...address, value: { ...resKtp.data } };
        }
        return address;
      });
      const newAddressDomisili = addressDomisili.map(address => {
        if (address.name === "kelurahan") {
          return { ...address, value: { ...resDomisili.data } };
        }
        return address;
      });
      console.log({ newAddressDomisili, newAddressKtp });
      setAddressKtp(newAddressKtp);
      setAddressDomisili(newAddressDomisili);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClickRegister = async () => {
    try {
      console.log({ addressKtp, addressDomisili });
      const data = {
        vaccination_session: {
          id: selectedUser.bookingsDetail.vaccinationSessionsId,
        },
        ...(getUserByIdResult.id !== selectedUser.id && {
          family_member: {
            id: selectedUser.id,
          },
        }),
        age_category: selectedUser.bookingsDetail.category,
        is_pregnant: selectedUser.bookingsDetail.isPregnant,
        id_address: selectedUser.bookingsDetail.alamat.ktp.jalan.trim(),
        id_urban_village: addressKtp[3].value.name,
        id_sub_district: addressKtp[2].value.name,
        id_city: addressKtp[1].value.name,
        id_province: addressKtp[0].value.name,
        curr_address: selectedUser.bookingsDetail.alamat.domisili.jalan.trim(),
        curr_urban_village: addressDomisili[3].value.name,
        curr_sub_district: addressDomisili[2].value.name,
        curr_city: addressDomisili[1].value.name,
        curr_province: addressDomisili[0].value.name,
      };
      console.log(data);
      await axiosInstance.post("/api/v1/vaccination-pass", data, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
      });
      new Promise((resolve, reject) => {
        resolve(Swal.fire({ title: "SUCCESS !", text: "Berhasil booking vaksin ! ", icon: "success", showConfirmButton: false, timer: 2500 }));
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log({ loopStateAddress });
    setLoopStateAddress(prevState => prevState + 1);
    if (loopStateAddress === 2)
      getKotaKabupatenById(selectedUser.bookingsDetail.alamat.ktp.kotaKabupaten, selectedUser.bookingsDetail.alamat.domisili.kotaKabupaten);
    if (loopStateAddress === 4)
      getKecamatanById(selectedUser.bookingsDetail.alamat.ktp.kecamatan, selectedUser.bookingsDetail.alamat.domisili.kecamatan);
    if (loopStateAddress === 6)
      getKelurahanById(selectedUser.bookingsDetail.alamat.ktp.kelurahan, selectedUser.bookingsDetail.alamat.domisili.kelurahan);
  }, [addressKtp, addressDomisili]);

  useEffect(() => {
    getProvinceById(selectedUser.bookingsDetail.alamat.ktp.provinsi, selectedUser.bookingsDetail.alamat.domisili.provinsi);
    getVaccinationSessionsById(selectedUser.bookingsDetail.vaccinationSessionsId);
  }, []);

  // console.log({ addressKtp, addressDomisili });

  console.log({ selectedUser, getUserByIdResult });
  return (
    <div>
      <Breadcumb anchorPath={anchorPath} pathArr={pathArr} selectedPath={pathArr[pathArr.length - 1]} selectedUser={selectedUser} />
      <div className="my-8">
        <Card maxWidth="700px" margin="auto" padding="2rem 3rem">
          <h1 className="font-bold text-xl">Tinjau Formulir Pendaftaran</h1>
          <div className="mb-10">
            <div className="my-4">
              <h2 className="font-bold text-lg">Identitas</h2>
              <div className="flex">
                <div className="flex-1">
                  {identity.slice(0, 2).map((item, idx) => {
                    return (
                      <div key={idx} className="my-2">
                        <h3 className="text-gray-400">{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex-1">
                  {identity.slice(2, 4).map((item, idx) => {
                    return (
                      <div key={idx} className="my-2">
                        <h3 className="text-gray-400">{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="my-4">
              <h2 className="font-bold text-lg">Alamat</h2>
              <div className="flex">
                {alamat.map((item, idx) => {
                  return (
                    <div key={idx} className="my-2 flex-1">
                      <h3 className="text-gray-400">{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="my-4">
              <h2 className="font-bold text-lg">Kategori</h2>
              <p>{capitalizeFirstLetter(category)}</p>
            </div>
            <div className="my-4">
              <h2 className="font-bold text-lg">Jadwal</h2>
              <div className="flex">
                {jadwal.map((item, idx) => {
                  const date = new Date(item.desc);
                  return (
                    <div key={idx} className="my-2 flex-1">
                      <h3 className="text-gray-400">{item.title}</h3>
                      <p>
                        {item.desc !== ""
                          ? item.title === "Tanggal"
                            ? `${convertDayId(date.getDay())}, ${date.getDate()} ${convertMonthId(date.getMonth())} ${date.getFullYear()}`
                            : item.desc
                          : ""}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <Card bg="#0A6C9D">
            <h1 className="text-white font-bold mb-2">Perhatian</h1>
            <p className="text-white text-sm">Dengan Ini saya menyatakan jawaban data diri saya adalah benar dan dapat dipertanggunggjawabkan.</p>
          </Card>
          <div className="mt-8 flex justify-center">
            <Button btnSize="lg" bg="#0A6C9D" fontSize=".75rem" color="white" onClick={() => handleClickRegister()}>
              Daftar Vaksinasi
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BookingsTinjauPage;
