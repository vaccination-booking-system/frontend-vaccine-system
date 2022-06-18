import React from "react";
import Card from "../Card";

const ProfileBar = ({ name, email }) => {
  return (
    <Card>
      <h1 className="font-bold text-[20px]">{name}</h1>
      <p>{email}</p>
    </Card>
  );
};

export default ProfileBar;
