import React from "react";
import Card from "../Card";
import StringHelper from "../../utils/StringHelper";

const ProfileBar = ({ name, nik }) => {
  const { getHideStr } = StringHelper;

  return (
    <Card>
      <h1 className="font-bold text-[20px]">{name}</h1>
      <p>{getHideStr(nik, 8)}</p>
    </Card>
  );
};

export default ProfileBar;
