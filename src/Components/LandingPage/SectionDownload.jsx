import React from "react";
import BackgroundDownload from "../../assets/images/background-download.png";
import DownloadPlayStore from "../../assets/images/download-playstore.png";
import DownloadAppStore from "../../assets/images/download-appstore.png";
import { Box, Flex, SimpleGrid } from "@chakra-ui/core";
import IconSend from "../../assets/images/icon-send.png";
import { Link } from "react-router-dom";
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
              {download.map((item, idx) => (
                <Box key={idx}>
                  <img src={item.src} />
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </SimpleGrid>
      <div>
        <Box display="flex" marginY="100px" marginX="150px" bg="#0A6C9D" width="80vw" p={4} color="white">
          <SimpleGrid columns={2} spacing={10}>
            <Box width="60vw">
              <b className="text-[36px]">Siap untuk memulai ?</b>
              <div>
                <h2 className="text-[24px]">Silahkan Lakukan Login atau Register Untuk Mendapatkan Layanan</h2>
              </div>
            </Box>
            <Box width="20vw">
              <Link to={"/login"}>
                <button
                  className="bg-white my-10 py-2 px-12 justify-center rounded-lg text-[#0A6C9D] text-[16px] "
                  style={{ border: "1px solid black" }}
                >
                  <div className="flex">
                    Login
                    <img className="ml-3" src={IconSend} alt="iconButton" width="10vw" height="10vh" />
                  </div>
                </button>
              </Link>
            </Box>
          </SimpleGrid>
        </Box>
      </div>
    </div>
  );
}
export default SectionDownload;
