import React, { useEffect, useState } from "react";

// Components
import { LogoWithoutText } from "../";
import { CardIcon, ChartIcon, HomeIcon, KeyIcon, HelpIcon, LogoutIcon } from "../Icons";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { usePath } from "../../context/PathContext";

const sidebarItems = [
  { text: "Dashboard", icon: ({ color, size }) => <HomeIcon color={color} size={size} />, path: "/dashboard", anchor: "dashboard" },
  {
    text: "Vaccination Bookings",
    icon: ({ color, size }) => <ChartIcon color={color} size={size} />,
    path: "/booking-vaccine/sk",
    anchor: "booking-vaccine",
  },
  {
    text: "Add Familiy Member",
    icon: ({ color, size }) => <CardIcon color={color} size={size} />,
    path: "/add-family-member",
    anchor: "add-family-member",
  },
  {
    text: "Profile",
    icon: ({ color, size }) => <HelpIcon color={color} size={size} />,
    path: "/profile",
    anchor: "profile",
  },
  {
    text: "Ticket Vaccine",
    icon: ({ color, size }) => <KeyIcon color={color} size={size} />,
    path: "/ticket-vaccine",
    anchor: "ticket-vaccine",
  },
];

const Sidebar = () => {
  const { anchorPath } = usePath();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <section className="h-[100vh] bg-white px-4 py-8 flex flex-col justify-between">
      <div>
        <div className="flex justify-center">
          <LogoWithoutText />
        </div>
        <ul className="my-16">
          {sidebarItems.map((item, idx) => (
            <Link to={item.path} key={idx}>
              <li className={`${anchorPath === item.anchor && "bg-[#DBF5FE] shadow-sm"} p-2 rounded-md flex items-center`}>
                <div className="p-2 bg-[#0A6C9D] rounded-xl">
                  <item.icon color="white" size={16} />
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <div className="cursor-pointer p-2 rounded-md hover:bg-[#DBF5FE] bg-" onClick={() => handleLogout()}>
          <LogoutIcon color="rgb(203, 213, 225)" size={24} />
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
