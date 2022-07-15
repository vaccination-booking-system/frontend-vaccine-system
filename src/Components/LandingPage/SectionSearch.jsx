import { Box, Input } from "@chakra-ui/core";
import React from "react";
import IconSearch from "../../assets/images/icon-search.png";

export default function SectionSearch() {
  return (
    <div style={{ backgroundColor: "#BBDEFB" }}>
      <Box px="10vw" py="5vh">
        <center>
          <b style={{ color: "#0A6C9D", fontSize: "30px" }}>Temukan Fasilitas Kesehatan yang Melayani Vaksinasi COVID-19</b>
        </center>
        <div>
          <form className="pt-4 flex justify-center align-middle ">
            <label class="relative w-1/2">
              <span class="absolute right-0 flex items-center">
                <button className=" bg-[#0A6C9D] py-1 px-3 rounded-lg">
                  <div className="flex">
                    <img className="" src={IconSearch} alt="iconButton" width="30vw" height="30vh" />
                  </div>
                </button>
              </span>
              <input
                className="placeholder:text-[#0A6C9D] block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-mlca-primary-blue"
                id="Search"
                type="text"
                placeholder="Cari Faskes (Contoh: Nama Puskesmas/kecamatan)"
              ></input>
            </label>
          </form>
        </div>
      </Box>
    </div>
  );
}
