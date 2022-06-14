import React from "react";
import { Sidebar } from "../../Components";

import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default Dashboard;
