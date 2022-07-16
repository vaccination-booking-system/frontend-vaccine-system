import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/core";
import BackgroundOurValues from "../../assets/images/background-our-values.png";
import IconChecklist from "../../assets/images/icon-checklist.png";
import IconLocate from "../../assets/images/icon-locate.png";
import IconSpeedometer from "../../assets/images/icon-speedometer.png";
import IconThink from "../../assets/images/icon-think.png";

function SectionOurValues() {
  const badge = [
    {
      src: IconChecklist,
      title: "Booking Vaccine",
      description: "Dapatkan Vaksinasi Dengan Mendaftakan diri anda secara online.",
    },
    {
      src: IconLocate,
      title: "Add Family Member",
      description: "Tambahkan Kerabat atau keluarga Anda untuk melakukan Vaksinasi.",
    },
    {
      src: IconSpeedometer,
      title: "Ticket Vaccine",
      description: "Simpan Tiket Anda Dimanapun dan Kapanpun.",
    },
    {
      src: IconThink,
      title: "Cari Tempat Vaksin",
      description: "Cari Tempat Fasilitas Kesehatan yang menyediakan Vaksinasi.",
    },
  ];
  return (
    <div id="value">
      <SimpleGrid columns={2} spacing={10}>
        <Box mt="5vh" pl="10vw">
          <img src={BackgroundOurValues} alt="OurValues Background" />
        </Box>
        <Box mt="20vh" pl="10vw" px="1">
          <b style={{ fontSize: "28px" }}>Kenapa Harus Menggunakan Evizy ?</b>
          <div>
            <h2 style={{ fontSize: "18px", width: "40vw" }}>
              Evizy diharapkan dapat membantu pemerintah dalam proses pemerataan vaksinasi di Indonesia. Melalui Evizy nantinya pemerintah akan mudah
              Melakukan Pemerataan.
            </h2>
            <SimpleGrid columns={2} spacing={12} mt="5vh" pr="10vw">
              {badge.map((item, idx) => (
                <Box key={idx}>
                  <img src={item.src} />
                  <b>{item.title} </b>
                  <p>{item.description} </p>
                </Box>
              ))}
            </SimpleGrid>
          </div>
        </Box>
      </SimpleGrid>
    </div>
  );
}
export default SectionOurValues;
