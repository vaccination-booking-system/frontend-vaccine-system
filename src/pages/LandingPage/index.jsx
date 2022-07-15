import React from "react";
import SectionWelcome from "../../Components/LandingPage/SectionWelcome";
import SectionAboutUs from "../../Components/LandingPage/SectionAboutUs";
import SectionOurServices from "../../Components/LandingPage/SectionOurServices";
import SectionOurValues from "../../Components/LandingPage/SectionOurValues";
import Footer from "../../Components/Footer";
import SectionSearch from "../../Components/LandingPage/SectionSearch";
import SectionDownload from "../../Components/LandingPage/SectionDownload";
import SectionNavbar from "../../Components/LandingPage/SectionNavbar";

function LandingPage() {
  return (
    <div>
      <SectionNavbar></SectionNavbar>
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
