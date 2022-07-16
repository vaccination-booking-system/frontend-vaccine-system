import React, { useEffect } from "react";
import { Layout, Card, ProfileBar, Button, Modal, LoadingAnimation } from "../../Components";

import { useJwt } from "react-jwt";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUserById } from "../../store/slice/users/GetUsers";

// Img
import BookingVaccineImg from "../../assets/images/booking-vaccine.png";
import AddFamilyMemberImg from "../../assets/images/add-family-member.png";
import TicketVaccineImg from "../../assets/images/ticket-vaccine.png";

const serviceItems = [
  {
    heading: "Booking Vaccine",
    desc: "Lakukan pendaftaran vaksin secara online, lalu sesuaikan jenis vaksin dan jadwal yang diinginkan.",
    imgPath: BookingVaccineImg,
    alt: "booking-vaccine-img",
    path: "/booking-vaccine/sk",
  },
  {
    heading: "Add Family Member",
    desc: "Daftarkan keluarga anda cukup dengan menambahkan data diri mereka.",
    imgPath: AddFamilyMemberImg,
    alt: "add-family-member-img",
    path: "/family-member",
  },
  {
    heading: "Ticket Vaccine",
    desc: "Lihat tiket vaksin anda dimanapun dan kapanpun.",
    imgPath: TicketVaccineImg,
    alt: "ticket-vaccine-img",
    path: "/ticket-vaccine",
  },
];

const Dashboard = () => {
  const { getUserByIdLoading, getUserByIdResult, getUserByIdError } = useSelector(state => state.userId);

  useEffect(() => {
    console.log({ getUserByIdLoading, getUserByIdResult, getUserByIdError });
  }, [getUserByIdLoading, getUserByIdResult, getUserByIdError]);

  return (
    <Layout>
      {getUserByIdResult ? (
        <>
          <ProfileBar name={getUserByIdResult.name} nik={getUserByIdResult.nik} />
          <div className="my-4">
            <Card>
              <div>
                <h1 className="font-bold text-lg">Layanan Kesehatan</h1>
                <p>Layanan Kesehatan Terbaik</p>
              </div>
              <div className="flex mt-4">
                {serviceItems.map((item, idx) => {
                  return (
                    <div className="flex-1 w-0" key={idx}>
                      <Card>
                        <div>
                          <img src={item.imgPath} alt={item.alt} />
                        </div>
                        <div className="mt-8">
                          <h1 className="font-bold text-lg">{item.heading}</h1>
                          <p className="my-2 min-h-[5rem]">{item.desc}</p>
                          <Link to={item.path}>
                            <Button bg="white" border="1px solid #0A6C9D" btnSize="full" fontSize="14px">
                              Dapatkan
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </>
      ) : getUserByIdLoading ? (
        <div className="py-24">
          <LoadingAnimation />
        </div>
      ) : (
        ""
      )}
    </Layout>
  );
};

export default Dashboard;
