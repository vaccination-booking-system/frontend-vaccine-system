import React from "react";
import BackgroundDownload from "../../assets/images/background-download.png";
import DownloadPlayStore from "../../assets/images/download-playstore.png";
import DownloadAppStore from "../../assets/images/download-appstore.png";
import { Box, Flex, SimpleGrid } from "@chakra-ui/core";
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
    <div id="download">
      <SimpleGrid columns={2} spacing={10}>
        <Box mt="10vh" pl="10vw">
          <img src={BackgroundDownload} alt="Download Background" />
        </Box>
        <Box mt="20vh">
          <Box flexDirection={"column"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <h2>
              <b style={{ fontSize: "28px", width: "40vw" }}>Download Aplikasi !</b>
            </h2>
            <h2 style={{ fontSize: "18px", width: "30vw", textAlign: "center" }}>
              Dapakan Aplikasi Evizy, dengan mendownload di store kesayangan Anda.
            </h2>
            <SimpleGrid columns={2} spacing={1} mt="10vh">
              {download.map(item => (
                <Box>
                  <img src={item.src} />
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </SimpleGrid>
    </div>
  );
}
export default SectionDownload;
