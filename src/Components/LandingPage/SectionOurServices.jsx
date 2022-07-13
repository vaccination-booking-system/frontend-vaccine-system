import { Box, SimpleGrid } from "@chakra-ui/core";
import React from "react";
import Background from "../../assets/images/background-our-services.png";
import BookingVaccineImg from "../../assets/images/booking-vaccine.png";
import AddFamilyMemberImg from "../../assets/images/add-family-member.png";
import TicketVaccineImg from "../../assets/images/ticket-vaccine.png";
import HomeCard from "../HomeCard";

export default function SectionOurServices() {
  const menu = [
    {
      description: "Lakukan Pendaftaran Vaksin Secara Online, Lalu Sesuaikan Jenis Vaksin Dan Jadwal Yang Anda Inginkan.",
      src: BookingVaccineImg,
      title: "Booking Vaccine",
      path: "/",
    },
    {
      description: "Daftarkan Keluarga Anda Cukup Dengan Menambahkan Data Diri Mereka.",
      src: AddFamilyMemberImg,
      title: "Add Family Member",
      path: "/",
    },
    {
      description: "Lihat Tiket Vaksin Anda Dimanapun Dan Kapanpun.",
      src: TicketVaccineImg,
      title: "Ticket Vaccine",
      path: "/",
    },
  ];

  return (
    <div className="px-1">
      <div style={{ backgroundImage: `url(${Background})`, backgroundSize: "cover", minHeight: "100vh" }}>
        <Box pl="10vw" pt="5vh" pr="30vw">
          <b style={{ fontSize: "48px", color: "#0A6C9D" }}>Layanan Evizy</b>
          <SimpleGrid columns={3} spacing={3} mt="10vh">
            {menu.map(item => (
              <HomeCard description={item.description} title={item.title} src={item.src} path={item.path} />
            ))}
          </SimpleGrid>
        </Box>
      </div>
    </div>
  );
}
