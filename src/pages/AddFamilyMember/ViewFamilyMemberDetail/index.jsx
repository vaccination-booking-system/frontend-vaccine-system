import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, Card, LoadingAnimation, Button } from "../../../Components";
import { useParams, useNavigate } from "react-router-dom";
import { usePath } from "../../../context/PathContext";
import axiosInstance from "../../../network/apis";

const ViewFamilyMemberDetailPage = () => {
  const { anchorPath, pathArr } = usePath();

  const { id: userId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [userDetails, setUserDetails] = useState([
    { title: "Nama Lengkap", desc: "" },
    { title: "NIK", desc: "" },
    { title: "Jenis Kelamin", desc: "" },
    { title: "Tanggal Lahir", desc: "" },
    { title: "Nomor Telepon", desc: "" },
  ]);

  const getFamilyMemberById = async id => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/v1/family-members/${id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
      });
      console.log(res);
      const newUserDetails = userDetails.map(userDetail => {
        if (userDetail.title === "Nama Lengkap") {
          return { ...userDetail, desc: res.data.data.name };
        }
        if (userDetail.title === "NIK") {
          return { ...userDetail, desc: res.data.data.nik };
        }
        if (userDetail.title === "Jenis Kelamin") {
          return { ...userDetail, desc: res.data.data.gender === "M" ? "Laki-Laki" : "Perempuan" };
        }
        if (userDetail.title === "Tanggal Lahir") {
          return { ...userDetail, desc: res.data.data.date_of_birth };
        }
        if (userDetail.title === "Nomor Telepon") {
          return { ...userDetail, desc: res.data.data.phone_number };
        }
        return { ...userDetail };
      });
      setUserDetails(newUserDetails);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFamilyMemberById(userId);
  }, [userId]);

  return (
    <Layout>
      <Breadcrumb anchorPath={anchorPath} pathArr={pathArr} selectedPath={pathArr[pathArr.length - 1]} />
      <div className="my-8">
        <Card maxWidth="700px" margin="auto" padding="2rem 3rem">
          <h1 className="font-bold text-xl">Detail Family Member</h1>
          {loading ? (
            <LoadingAnimation />
          ) : (
            <>
              <div className="flex my-4">
                <div className="flex-1">
                  {userDetails.slice(0, 3).map((userDetail, idx) => {
                    return (
                      <div key={idx} className="my-2">
                        <h3 className="text-gray-400">{userDetail.title}</h3>
                        <p>{userDetail.desc}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex-1">
                  {userDetails.slice(3, 5).map((userDetail, idx) => {
                    return (
                      <div key={idx} className="my-2">
                        <h3 className="text-gray-400">{userDetail.title}</h3>
                        <p>{userDetail.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-center">
                <Button fontSize=".75rem" btnSize="lg" color="white" bg="#0A6C9D" onClick={() => navigate(`/family-member/edit/${userId}`)}>
                  Edit
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default ViewFamilyMemberDetailPage;
