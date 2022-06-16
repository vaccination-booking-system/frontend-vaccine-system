import React from "react";

const Card = ({ children, bgColor, roundedSize, padding }) => {
  console.log(bgColor);
  console.log(roundedSize);
  console.log(padding);
  return <div className={`bg-white rounded-[20px] p-4`}>{children}</div>;
};

/* Card.defaultProps = {
  bgColor: "white",
  roundedSize: "16px",
  padding: "16px",
}; */

export default Card;
