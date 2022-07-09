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
      title: "Nulla lobortis nunc",
      description: "Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
    {
      src: IconLocate,
      title: "Nulla lobortis nunc",
      description: "Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
    {
      src: IconSpeedometer,
      title: "Nulla lobortis nunc",
      description: "Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
    {
      src: IconThink,
      title: "Nulla lobortis nunc",
      description: "Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
  ];
  return (
    <div>
      <SimpleGrid columns={2} spacing={10}>
        <Box mt="10vh" pl="10vw">
          <img src={BackgroundOurValues} alt="OurValues Background" />
        </Box>
        <Box mt="20vh" pl="10vw" px="1">
          <b style={{ fontSize: "28px" }}>Nulla lobortis nunc vitae nisi semper velit</b>
          <div>
            <h2 style={{ fontSize: "18px", width: "40vw" }}>
              Evizy adalah aplikasi yang dikembangkan untuk membantu instansi pemerintah terkait dalam melakukan pelacakan untuk menghentikan
              penyebaran Coronavirus Disease (COVID-19).
            </h2>
            <SimpleGrid columns={2} spacing={12} mt="5vh" pr="10vw">
              {badge.map(item => (
                <Box>
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
