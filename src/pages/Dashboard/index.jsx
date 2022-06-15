import React from "react";
import { Layout, Card } from "../../Components";

import { useJwt } from "react-jwt";
import { Link } from "react-router-dom";

const serviceItems = [
  {
    heading: "Booking Vaccine",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    path: "/dashboard/vaccination-bookings",
  },
  {
    heading: "Add Family Member",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    path: "/dashboard/add-family-member",
  },
  {
    heading: "Ticket Vaccine",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    path: "/dashboard/ticket-vaccine",
  },
];

const Dashboard = () => {
  const { decodedToken, isExprired } = useJwt(localStorage.getItem("accessToken"));

  console.log({ decodedToken, isExprired });

  return (
    <Layout>
      <div>
        <h1 className="font-bold text-lg">Layanan Kesehatan</h1>
        <p>Layanan Kesehatan Terbaik</p>
      </div>
      <div className="flex my-20">
        {serviceItems.map((item, idx) => {
          return (
            <div className="p-4">
              <h1 className="font-bold text-lg">{item.heading}</h1>
              <p className="my-2">{item.desc}</p>
              <Link to={item.path}>
                <button className="border-2 py-2 px-8 rounded-md text-xs font-bold text-gray-400">Click</button>
              </Link>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Dashboard;
