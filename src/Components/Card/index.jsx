import React from "react";

const Card = ({ children, bgColor }) => {
  return <div className={`bg-[${bgColor}] rounded-[15px] p-4`}>{children}</div>;
};

Card.defaultProps = {
  bgColor: "white",
};

export default Card;
