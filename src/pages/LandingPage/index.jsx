import React from "react";
import { Navbar } from "../../Components";
import SectionWelcome from "../../Components/LandingPage/SectionWelcome";
import BackgroundHomepage from "../../assets/images/background-homepage.png";

function LandingPage() {
  return (
    <div>
      <Navbar></Navbar>

      <SectionWelcome></SectionWelcome>
    </div>
  );
}

export default LandingPage;
