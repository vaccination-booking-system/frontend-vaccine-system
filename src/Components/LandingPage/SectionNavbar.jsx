import React from "react";
import { Logo } from "../";
import PropsTypes from "prop-types";

// Navbar Icons
import { ProfileIcon, ImageIcon, KeyIcon } from "../Icons";
import { Link } from "react-router-dom";

const navItems = [
  { text: "About", icon: ({ color }) => <ProfileIcon color={color} />, path: "/about" },
  { text: "Value", icon: ({ color }) => <ImageIcon color={color} />, path: "/gallery" },
  { text: "Service", icon: ({ color }) => <KeyIcon color={color} />, path: "/contact-us" },
];

/**
 *
 * @param {string} path - path the url location of navbar
 * example path === "login" or "register"
 *
 */
const Navbar = ({ path }) => {
  return (
    <div className="flex justify-center">
      <div
        className={`flex justify-center items-center p-4 rounded-md z-20 absolute ${
          path === "login" ? "bg-slate-100 shadow-md border-2 border-white" : path === "register" && "text-white"
        }  m-6`}
      >
        <Logo {...(path === "register" && { color: "white" })} />
        <ul className="flex mx-[120px]">
          {navItems.map((item, idx) => (
            <li key={idx} className="mx-2">
              <Link to={item.path} className="flex items-center">
                <div className="my-auto">
                  <item.icon {...(path === "register" && { color: "white" })} />
                </div>
                <p className="mx-2">{item.text}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <Link to={path === "register" ? "/login" : "/register"}>
            <button
              className={`${
                path === "register" ? "text-[#151928] bg-white" : path === "login" && "text-white bg-[#151928]"
              } py-2 px-10 rounded-full text-[12px] font-bold`}
            >
              {path === "register" ? "SIGN IN" : "SIGN UP"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  path: PropsTypes.string.isRequired,
};

export default Navbar;
