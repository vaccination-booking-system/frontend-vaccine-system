import React, { useEffect, useState } from "react";

// Components
import Logo from "../Logo";
import { CardIcon, ChartIcon, HomeIcon, KeyIcon } from "../Icons";

import { Link, useLocation } from "react-router-dom";
import { usePath } from "../../context/PathContext";

const sidebarItems = [
  { text: "Dashboard", icon: ({ color, size }) => <HomeIcon color={color} size={size} />, path: "/dashboard", anchor: "dashboard" },
  {
    text: "Vaccination Bookings",
    icon: ({ color, size }) => <ChartIcon color={color} size={size} />,
    path: "/dashboard/vaccination-bookings",
    anchor: "vaccination-bookings",
  },
  {
    text: "Add Familiy Member",
    icon: ({ color, size }) => <CardIcon color={color} size={size} />,
    path: "/dashboard/add-family-member",
    anchor: "add-family-member",
  },
  {
    text: "Ticket Vaccine",
    icon: ({ color, size }) => <KeyIcon color={color} size={size} />,
    path: "/dashboard/ticket-vaccine",
    anchor: "ticket-vaccine",
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  const { anchorPath, setAnchorPath, pathArr, setPathArr } = usePath();

  const splitPathname = () => {
    let pathNameArr = pathname.split("/");
    pathNameArr.shift();
    pathNameArr.reverse();
    setPathArr(pathNameArr);
  };

  useEffect(() => {
    splitPathname();
  }, []);

  useEffect(() => {
    if (pathArr !== []) {
      setAnchorPath(
        pathArr.find(path => path === "dashboard" || path === "vaccination-bookings" || path === "add-family-member" || path === "ticket-vaccine")
      );
    }
  }, [pathArr]);

  return (
    <section className="w-[276px] h-[100vh] bg-slate-100 p-8">
      <Logo />
      <ul className="my-16">
        {sidebarItems.map((item, idx) => (
          <Link to={item.path} key={idx}>
            <li className={`${anchorPath === item.anchor && "bg-white shadow-sm"} p-2 rounded-md flex items-center`}>
              <div className="p-2 bg-[#4faee5] rounded-xl">
                <item.icon color="white" size={16} />
              </div>
              <p className={`${anchorPath === item.anchor ? "text-black" : "text-gray-400"} mx-4 text-[13px] font-bold `}>{item.text}</p>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default Sidebar;
