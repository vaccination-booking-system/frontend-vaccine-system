import React from "react";
import { Box, Button, SimpleGrid } from "@chakra-ui/core";

import BackgroundHomepage from "../../assets/images/background-homepage.png";
import IconSend from "../../assets/images/icon-send.png";
function SectionWelcome() {
  return (
    <div>
      <SimpleGrid columns={2} spacing={10}>
        <Box height="300px" mt="30vh" pl="10vw">
          <b style={{ fontSize: "48px" }}>Krisna Aryawan</b>
          <h2 style={{ fontSize: "24px", width: "40vw" }}>Lorem ipsum dolor sit amet consectetur adipiscing Integer id orci sed ante tincidunt</h2>
          <button className="mt-2 py-2 px-11 rounded-lg text-[12px] font-bold" style={{ border: "1px solid black" }}>
            <div className="flex">
              Start
              <img className="ml-3" src={IconSend} alt="iconButton" width="10vw" height="10vh" />
            </div>
          </button>
        </Box>
        <Box height="80px">
          <img src={BackgroundHomepage} alt="homepage Backgroun" />
        </Box>
      </SimpleGrid>
    </div>
  );
}

export default SectionWelcome;
