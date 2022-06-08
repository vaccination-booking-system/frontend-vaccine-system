import React from "react";

const Card = ({ children, width }) => {
  return <div className="bg-slate-500 rounded-md p-4">{children}</div>;
};

export default Card;
