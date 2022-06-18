import React, { useEffect } from "react";
import { Layout, Card, ProfileBar, Button } from "../../Components";

import { useJwt } from "react-jwt";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../store/slice/users/GetUsers";

// Img
import BookingVaccineImg from "../../assets/images/booking-vaccine.png";
import AddFamilyMemberImg from "../../assets/images/add-family-member.png";
import TicketVaccineImg from "../../assets/images/ticket-vaccine.png";

const serviceItems = [
  {
    heading: "Booking Vaccine",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    imgPath: BookingVaccineImg,
    alt: "booking-vaccine-img",
    path: "/dashboard/vaccination-bookings",
  },
  {
    heading: "Add Family Member",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    imgPath: AddFamilyMemberImg,
    alt: "add-family-member-img",
    path: "/dashboard/add-family-member",
  },
  {
    heading: "Ticket Vaccine",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    imgPath: TicketVaccineImg,
    alt: "ticket-vaccine-img",
    path: "/dashboard/ticket-vaccine",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();

  const { decodedToken, isExprired } = useJwt(localStorage.getItem("accessToken"));

  const { getUsersLoading, getUsersResult, getUsersError } = useSelector(state => state.users);

  console.log({ decodedToken, isExprired });

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    console.log({ getUsersLoading, getUsersResult, getUsersError });
  }, [getUsersLoading, getUsersResult, getUsersError]);

  return (
    <Layout>
      <ProfileBar name="Muhammad Ridwan" email="ridwan@gmail.com" />
      <div className="my-4">
        <Card>
          <div>
            <h1 className="font-bold text-lg">Layanan Kesehatan</h1>
            <p>Layanan Kesehatan Terbaik</p>
          </div>
          <div className="flex my-8">
            {serviceItems.map((item, idx) => {
              return (
                <Card key={idx} margin={idx > 0 && idx < serviceItems.length - 1 ? "0 6rem" : null}>
                  <div>
                    <img src={item.imgPath} alt={item.alt} />
                  </div>
                  <div className="mt-8">
                    <h1 className="font-bold text-lg">{item.heading}</h1>
                    <p className="my-2">{item.desc}</p>
                    <Link to={item.path}>
                      <Button bg="white" border="1px solid #0A6C9D" btnSize="md" fontSize="14px">
                        Click
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
