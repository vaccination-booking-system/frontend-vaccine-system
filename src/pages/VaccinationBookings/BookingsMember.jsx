import React, { useState, useEffect } from "react";
import { Breadcumb } from "../../Components";
import { usePath } from "../../context/PathContext";
import { Card, LoadingAnimation } from "../../Components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VaccinationBookingsMemberPage = () => {
  const { anchorPath, pathArr } = usePath();

  const { getUserByIdResult, getUserByIdLoading, getUserByIdError } = useSelector(state => state.userId);

  const [familyMember, setFamilyMember] = useState(null);

  const [getFamilyMemberLoading, setGetFamilyMemberLoading] = useState();

  const navigate = useNavigate();

  const getFamilyMember = async familyId => {
    try {
      console.log(`${process.env.REACT_APP_MOCKAPI_URL}/family_member?family_id=${familyId}`);
      const res = await axios.get(`${process.env.REACT_APP_MOCKAPI_URL}/family_member?family_id=${familyId}`);
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClickFamilyMember = user => {
    navigate("status", { state: user });
  };

  useEffect(() => {
    (async () => {
      try {
        if (getUserByIdResult) {
          setGetFamilyMemberLoading(true);
          const resUser = await axios.get(`${process.env.REACT_APP_MOCKAPI_URL}/family_member?nik=${getUserByIdResult?.nik}`);
          const resFamilyMember = await getFamilyMember(resUser.data[0].family_id);
          setFamilyMember(resFamilyMember);
          console.log(resFamilyMember);
          setGetFamilyMemberLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [getUserByIdResult]);

  return (
    <div>
      <Breadcumb anchorPath={anchorPath} pathArr={pathArr} selectedPath={pathArr[pathArr.length - 1]} />
      {getUserByIdResult ? (
        <div className="my-8">
          <Card maxWidth="700px" margin="auto" padding="2rem 3rem">
            <h1 className="text-center font-bold text-xl">Pilih anggota yang ingin didaftarkan</h1>
            {familyMember ? (
              familyMember.map((user, idx) => {
                return (
                  <div key={idx} className="border-2 rounded-2xl my-4 p-4 cursor-pointer" onClick={() => handleClickFamilyMember(user)}>
                    <p>{user.name}</p>
                  </div>
                );
              })
            ) : getFamilyMemberLoading ? (
              <LoadingAnimation />
            ) : (
              ""
            )}
          </Card>
        </div>
      ) : getUserByIdLoading ? (
        <LoadingAnimation />
      ) : (
        ""
      )}
    </div>
  );
};

export default VaccinationBookingsMemberPage;
