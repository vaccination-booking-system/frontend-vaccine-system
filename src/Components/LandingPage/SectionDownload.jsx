import React from "react";
import BackgroundDownload from "../../assets/images/background-download.png";
import DownloadPlayStore from "../../assets/images/download-playstore.png";
import DownloadAppStore from "../../assets/images/download-appstore.png";
import { Box, SimpleGrid } from "@chakra-ui/core";
import { BsAlignCenter } from "react-icons/bs";
function SectionDownload() {
  const download = [
    {
      src: DownloadPlayStore,
    },
    {
      src: DownloadAppStore,
    },
  ];
  return (
    <div>
      <SimpleGrid columns={2} spacing={10}>
        <Box mt="10vh" pl="10vw">
          <img src={BackgroundDownload} alt="Download Background" />
        </Box>
        <Box mt="20vh" pl="10vw" px="1">
          <b style={{ fontSize: "28px", textAlign: "center" }}>Kenapa Harus Menggunakan Evizy ?</b>
          <div>
            <h2 style={{ fontSize: "18px", width: "40vw", textAlign: "center" }}>
              Evizy diharapkan dapat membantu pemerintah dalam proses pemerataan vaksinasi di Indonesia. Melalui Evizy nantinya pemerintah akan mudah
              Melakukan Pemerataan.
            </h2>
            <SimpleGrid columns={2} spacing={10} mt="5vh" pl="1vw">
              {download.map(item => (
                <Box>
                  <img src={item.src} />
                </Box>
              ))}
            </SimpleGrid>
          </div>
        </Box>
      </SimpleGrid>
    </div>
  );
}
export default SectionDownload;
