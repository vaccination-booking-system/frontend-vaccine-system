import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/core";
import React from "react";

export default function SectionSearch() {
  return (
    <div style={{ backgroundColor: "#BBDEFB" }}>
      <Box px="10vw" py="5vh">
        <center>
          <b style={{ color: "#0A6C9D", fontSize: "30px" }}>Temukan Fasilitas Kesehatan yang Melayani Vaksinasi COVID-19</b>
        </center>
        <Box display="flex">
          <Input py="2vh" pr="4.5rem" type="text" placeholder="Enter password" borderRadius="10px" />
          <button className="py-1 px-11 rounded-lg text-[12px] font-bold" style={{ border: "1px solid black" }}>
            <div className="flex">
              Mulai
              {/* <img className="ml-3" src={IconSend} alt="iconButton" width="10vw" height="10vh" /> */}
            </div>
          </button>
        </Box>
      </Box>
    </div>
  );
}
