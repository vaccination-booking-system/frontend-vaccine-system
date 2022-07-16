import React from "react";
import { Link } from "react-router-dom";
import NotFound from "../../assets/images/background-404.png";

export default function PageNotFound() {
  return (
    <div style={{ backgroundColor: "#DBF5FE", backgroundSize: "cover", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={NotFound} alt="Background404" style={{ marginTop: "80px" }} />
      </div>
      <div style={{ display: "absolute", justifyContent: "center", alignItems: "center" }}>
        <h1 style={{ fontSize: "60px", color: "#0A6C9D", textAlign: "center" }}>404</h1>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", color: "#0A6C9D", textAlign: "center" }}>Maaf</h2>
        <h2 style={{ fontSize: "14px", fontWeight: "600px", color: "#9B9B9B", textAlign: "center" }}>Halaman yang anda tuju tidak tersedia</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Link to={"/dashboard"}>
          <button className={"text-[#EDF5FB] rounded-lg p-2 px-10 bg-[#0A6C9D] mt-20 "}> Kembali ke Dashboard </button>
        </Link>
      </div>
    </div>
  );
}
