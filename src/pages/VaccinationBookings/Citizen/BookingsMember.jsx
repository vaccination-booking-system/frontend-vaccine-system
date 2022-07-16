import React, { useState, useEffect } from "react";
import { Breadcrumb } from "../../../Components";
import { usePath } from "../../../context/PathContext";
import { Card, LoadingAnimation } from "../../../Components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../network/apis";
import CONST from "../../../utils/constant";

const BookingsMemberPage = () => {
  const { anchorPath, pathArr } = usePath();

  const { getUserByIdResult, getUserByIdLoading, getUserByIdError } = useSelector(state => state.userId);

  const [familyMember, setFamilyMember] = useState(null);

  const [getFamilyMemberLoading, setGetFamilyMemberLoading] = useState();

  const navigate = useNavigate();

  const handleClickFamilyMember = user => {
    navigate("status", { state: { selectedUser: { ...user, bookingsDetail: {} } } });
  };

  useEffect(() => {
    (async () => {
      try {
        if (getUserByIdResult) {
          console.log({ getUserByIdResult });
          const { id } = getUserByIdResult;
          setGetFamilyMemberLoading(true);
          const res = await axiosInstance.get(`/api/v1/family-members?user_id=${id}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          console.log(res);
          if (res.data.data.length > 0) {
            setFamilyMember([getUserByIdResult, ...res.data.data]);
          } else {
            setFamilyMember([getUserByIdResult]);
          }
          setGetFamilyMemberLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [getUserByIdResult]);

  return (
    <div>
      <Breadcrumb anchorPath={anchorPath} pathArr={pathArr} selectedPath={pathArr[pathArr.length - 1]} />
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

export default BookingsMemberPage;
