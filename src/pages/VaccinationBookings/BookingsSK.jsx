import React from "react";
import { Breadcumb } from "../../Components";

import { useLocation } from "react-router-dom";

import { usePath } from "../../context/PathContext";

const VaccinationBookingsSKPage = () => {
  const { anchorPath, pathArr } = usePath();
  return (
    <div>
      <Breadcumb anchorPath={anchorPath} pathArr={pathArr} selectedPath={pathArr[pathArr.length - 1]} />
    </div>
  );
};

export default VaccinationBookingsSKPage;
