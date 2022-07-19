import React, { useEffect } from "react";
import { Layout, Card, ProfileBar, Button, Modal, LoadingAnimation } from "../../Components";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Img
import BookingVaccineImg from "../../assets/images/booking-vaccine.png";
import AddFamilyMemberImg from "../../assets/images/add-family-member.png";
import TicketVaccineImg from "../../assets/images/ticket-vaccine.png";
import VaccinationBookingsAdminImg from "../../assets/images/vaccination-booking-admin.png";
import SessionAvailabilityAdminImg from "../../assets/images/session-availability-admin.png";
import VaccineStockAdminImg from "../../assets/images/vaccine-stock-admin.png";

import JWTHelper from "../../utils/JWTHelper";

const serviceItemsCitizen = [
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

const serviceItemsAdmin = [
  {
    heading: "Vaccination Bookings",
    desc: "Admin dapat mengelola data pemesanan vaksinasi",
    imgPath: VaccinationBookingsAdminImg,
    alt: "booking-vaccine-img",
    path: "/vaccination-bookings/daftar-faskes",
  },
  {
    heading: "Session Availability",
    desc: "Admin dapat mengelola ketersediaan sesi vaksinasi",
    imgPath: SessionAvailabilityAdminImg,
    alt: "session-availability-img",
    path: "/sessions-availability/daftar-faskes",
  },
  {
    heading: "Vaccine Stock",
    desc: "Admin dapat mengelola ketersediaan stok vaksin",
    imgPath: VaccineStockAdminImg,
    alt: "vaccine-stock-img",
    path: "/vaccine-stock/daftar-faskes",
  },
];

const Dashboard = () => {
  const { getUserByIdLoading, getUserByIdResult, getUserByIdError } = useSelector(state => state.userId);

  const { checkIsAdmin } = JWTHelper;

  if (checkIsAdmin(localStorage.getItem("accessToken"))) {
    return (
      <Layout>
        {getUserByIdResult ? (
          <div>
            <Card>
              <h1 className="font-bold text-xl">{getUserByIdResult.name}</h1>
            </Card>
            <div className="my-4">
              <Card>
                <h1 className="font-bold text-lg">Fitur Faskes</h1>
                <div className="flex">
                  {serviceItemsAdmin.map((item, idx) => {
                    return (
                      <div className="flex-1" key={idx}>
                        <Card>
                          <div>
                            <img src={item.imgPath} alt={item.alt} className="w-full" />
                          </div>
                          <div className="mt-8">
                            <h1 className="font-bold text-lg">{item.heading}</h1>
                            <p className="my-2 min-h-[2.5rem]">{item.desc}</p>
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
          </div>
        ) : getUserByIdLoading ? (
          <div className="py-24">
            <LoadingAnimation />
          </div>
        ) : (
          ""
        )}
      </Layout>
    );
  }

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
                {serviceItemsCitizen.map((item, idx) => {
                  return (
                    <div className="flex-1 w-0" key={idx}>
                      <Card>
                        <div>
                          <img src={item.imgPath} alt={item.alt} className="w-full" />
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
