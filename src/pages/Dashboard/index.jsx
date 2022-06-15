import React from "react";
import { Layout } from "../../Components";

import { useJwt } from "react-jwt";

const Dashboard = () => {
  const { decodedToken, isExprired } = useJwt(localStorage.getItem("accessToken"));

  console.log({ decodedToken, isExprired });

  return <Layout>Dashboard</Layout>;
};

export default Dashboard;
