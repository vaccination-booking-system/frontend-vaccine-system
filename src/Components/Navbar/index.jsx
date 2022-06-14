import React from "react";
import Logo from "../Logo";
import PropsTypes from "prop-types";

// Navbar Icons
import { CubeIcon, ProfileIcon, ImageIcon, KeyIcon } from "../Icons";

const navItems = [
  { text: "Dashboard", icon: ({ color }) => <CubeIcon color={color} /> },
  { text: "About", icon: ({ color }) => <ProfileIcon color={color} /> },
  { text: "Gallery", icon: ({ color }) => <ImageIcon color={color} /> },
  { text: "Contact Us", icon: ({ color }) => <KeyIcon color={color} /> },
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
        <ul className="flex mx-[60px]">
          {navItems.map((item, idx) => (
            <li key={idx} className="flex items-center mx-2">
              <div className="my-auto">
                <item.icon {...(path === "register" && { color: "white" })} />
              </div>
              <p className="mx-2">{item.text}</p>
            </li>
          ))}
        </ul>
        <div>
          <button
            className={`${
              path === "register" ? "text-[#151928] bg-white" : path === "login" && "text-white bg-[#151928]"
            } py-2 px-10 rounded-full text-[12px] font-bold`}
          >
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  path: PropsTypes.string.isRequired,
};

export default Navbar;
