import React from "react";
import { Navbar } from "../../Components";
import SectionWelcome from "../../Components/LandingPage/SectionWelcome";
import SectionAboutUs from "../../Components/LandingPage/SectionAboutUs";
import SectionOurServices from "../../Components/LandingPage/SectionOurServices";
import SectionOurValues from "../../Components/LandingPage/SectionOurValues";
import Footer from "../../Components/Footer";
import SectionSearch from "../../Components/LandingPage/SectionSearch";
import SectionDownload from "../../Components/LandingPage/SectionDownload";

function LandingPage() {
  return (
    <div>
      <Navbar></Navbar>
      <SectionWelcome></SectionWelcome>
      <SectionAboutUs></SectionAboutUs>
      <SectionOurServices></SectionOurServices>
      <SectionOurValues></SectionOurValues>
      <SectionSearch></SectionSearch>
      <SectionDownload></SectionDownload>
      <Footer></Footer>
    </div>
  );
}

export default LandingPage;
