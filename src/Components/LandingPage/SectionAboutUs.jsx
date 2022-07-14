import React from "react";
import { Box, Button, SimpleGrid } from "@chakra-ui/core";
import BackgroundAboutUs from "../../assets/images/background-about-us.png";

function SectionAboutUs() {
  return (
    <div id="about">
      <SimpleGrid columns={2} spacing={10}>
        <Box mt="10vh" pl="10vw">
          <img src={BackgroundAboutUs} alt="AboutUS Background" />
        </Box>
        <Box height="100px" mt="30vh" pl="5vw">
          <b style={{ fontSize: "28px" }}>Apa itu Evizy?</b>
          <div>
            <h2 style={{ fontSize: "18px", width: "40vw" }}>
              Evizy adalah aplikasi yang dikembangkan untuk membantu instansi pemerintah terkait dalam melakukan pelacakan untuk menghentikan
              penyebaran Coronavirus Disease (COVID-19).
            </h2>
          </div>
          <div>
            <h2 style={{ fontSize: "18px", width: "40vw" }}>
              Aplikasi ini mengandalkan partisipasi masyarakat untuk saling membagikan data lokasinya saat bepergian agar penelusuran riwayat kontak
              dengan penderita COVID-19 dapat dilakukan.
            </h2>
          </div>
          <div>
            <h2 style={{ fontSize: "18px", width: "40vw" }}>
              Pengguna aplikasi ini juga akan mendapatkan notifikasi jika berada di keramaian atau berada di zona merah, yaitu area atau kelurahan
              yang sudah terdata bahwa ada orang yang terinfeksi COVID-19 positif atau ada Pasien Dalam Pengawasan.
            </h2>
          </div>
        </Box>
      </SimpleGrid>
    </div>
  );
}
export default SectionAboutUs;
