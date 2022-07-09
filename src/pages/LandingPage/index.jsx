import React from "react";
import { Navbar } from "../../Components";
import SectionWelcome from "../../Components/LandingPage/SectionWelcome";
import SectionAboutUs from "../../Components/LandingPage/SectionAboutUs";
import SectionOurServices from "../../Components/LandingPage/SectionOurServices";
import SectionOurValues from "../../Components/LandingPage/SectionOurValues";
import Footer from "../../Components/Footer";
import SectionSearch from "../../Components/LandingPage/SectionSearch";

function LandingPage() {
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <SectionWelcome></SectionWelcome>
      </div>
      <div>
        <SectionAboutUs></SectionAboutUs>
      </div>
      <SectionOurServices></SectionOurServices>
      <SectionOurValues></SectionOurValues>
      <SectionSearch></SectionSearch>
      <Footer></Footer>
    </div>
  );
}

export default LandingPage;
