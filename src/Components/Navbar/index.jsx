import React from "react";
import { Logo } from "../";
import PropsTypes from "prop-types";
import { Button } from "../../Components";
import { Link, useNavigate } from "react-router-dom";

// Navbar Icons
import { CubeIcon, ProfileIcon, ImageIcon, KeyIcon } from "../Icons";

const navItems = [
  { text: "Home", icon: ({ color }) => <CubeIcon color={color} />, path: "/" },
  { text: "About", icon: ({ color }) => <ProfileIcon color={color} />, path: "/about" },
  { text: "Gallery", icon: ({ color }) => <ImageIcon color={color} />, path: "/gallery" },
  { text: "Contact Us", icon: ({ color }) => <KeyIcon color={color} />, path: "/contact-us" },
];

/**
 *
 * @param {string} path - path the url location of navbar
 * example path === "login" or "register"
 *
 */
const Navbar = ({ path }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <div
        className={`flex justify-center items-center p-4 rounded-md z-20 absolute ${
          path === "login" ? "bg-slate-100 shadow-md border-2 border-white" : path === "register" && "text-white"
        }  m-6`}
      >
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <Logo {...(path === "register" && { color: "white" })} />
        </div>
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
            <Button
              fontSize="12px"
              btnSize="md"
              rounded="999px"
              color={path === "register" ? "#151928" : path === "login" && "white"}
              bg={path === "register" ? "white" : path === "login" && "#151928"}
            >
              {path === "register" ? "SIGN IN" : "SIGN UP"}
            </Button>
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
