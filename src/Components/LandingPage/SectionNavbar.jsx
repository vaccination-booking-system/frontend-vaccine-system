import React from "react";
import { Logo } from "../";
import PropsTypes from "prop-types";

// Navbar Link
import { Link } from "react-router-dom";

const navItems = [
  { text: "About", path: "#about" },
  { text: "Service", path: "#service" },
  { text: "Value", path: "#value" },
  { text: "Download", path: "#download" },
];

/**
 *
 * @param {string} path - path the url location of navbar
 * example path === "login" or "register"
 *
 */
const SectionNavbar = () => {
  return (
    <div className="flex justify-center py-4">
      <div className="flex justify-center items-center p-4 rounded-md z-20 absolute text-whitem-6">
        <Logo />
        <ul className="flex mx-[300px]">
          {navItems.map((item, idx) => (
            <li key={idx} className="mx-2">
              <a href={item.path} className="flex items-center">
                <div className="my-auto"></div>
                <b className="mx-2 text-black">{item.text}</b>
              </a>
            </li>
          ))}
        </ul>
        <div>
          <Link to={"/login"}>
            <b className={"text-[#151928]"}> MASUK </b>
          </Link>
          <Link to={"/register"}>
            <button className={"text-white rounded-lg p-2 bg-[#0A6C9D] ml-3 "}> DAFTAR </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SectionNavbar;
