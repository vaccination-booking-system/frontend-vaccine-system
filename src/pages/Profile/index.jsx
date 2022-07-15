import React from "react";
import { Card, Layout } from "../../Components";

function Profile() {
  return (
    <>
      <Layout>
        <Card>
          <p className="font-normal text-[#718096]">
            Akun<span className="text-blue-700">/Profile</span>
          </p>
          <p className="text-[20px] font-bold">Akun</p>
        </Card>
        <div className="my-[37px]">
          <Card>
            <div className="flex mt-[31px] ml-[44px]">
              <div>
                <img
                  src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/profile-design-template-4c23db68ba79c4186fbd258aa06f48b3_screen.jpg?ts=1581063859"
                  alt="profile-picture"
                  className="h-[150px] w-auto rounded-full border-8 border-solid border-[#0A6C9D]"
                />
              </div>
              <div className="pl-[40px] pt-[3.5rem]">
                <p className="text-2xl font-bold text-[#083A50]">Awan Pijar Andika</p>
                <p className="text-lg font-bold text-[#083A50]">Your account is ready, you can now apply for advice.</p>
              </div>
            </div>
            <div className="flex mx-[30px] mt-[40px] mb-[40px]">
              <div className="mt-[64px] pr-[30px]">
                <ul>
                  <li className="py-[12px] pl-[12px]">
                    <a href="#" className="font-bold text-[#083A50] text-large">
                      Edit Profile
                    </a>
                  </li>
                  <li className="py-[12px] pl-[12px]">
                    <a href="#" className="font-bold text-[#083A50] text-large">
                      Password & Security
                    </a>
                  </li>
                </ul>
              </div>
              <div className="pl-[60px] my-[35px] border-l-4 border-[#e8eaee66]">
                <div className="flex justify-between">
                  <h1 className="text-2xl text-gray-400 font-bold">Profile</h1>
                  <h1 className="text-large text-gray-400 font-bold">last update December 21</h1>
                </div>
                <div className="flex text-[18px] mt-[34px] pr-[198px] mr-[159px]">
                  <div className="pl-[11px]">
                    <div className="flex flex-col">
                      <p className="font-bold">Nama</p>
                      <p>Awan Pijar Andika</p>
                    </div>
                    <div className="flex flex-col mt-[32px]">
                      <p className="font-bold">NIK</p>
                      <p>123849347192392819238</p>
                    </div>
                    <div className="flex flex-col mt-[32px] mb-[79px]">
                      <p className="font-bold">Jenis Kelamin</p>
                      <p>Perempuan</p>
                    </div>
                    <div>
                      <button className="px-[60px] py-[10px] bg-[#0a6c9d] rounded-lg text-white">EDIT</button>
                    </div>
                  </div>
                  <div className="ml-[153px]">
                    <div className="flex flex-col">
                      <p className="font-bold">Tanggal Lahir</p>
                      <p>Margasari</p>
                    </div>
                    <div className="flex flex-col mt-[32px]">
                      <p className="font-bold">Nomor Telepon</p>
                      <p>081328101923</p>
                    </div>
                    <div className="flex flex-col mt-[32px]">
                      <p className="font-bold">E-Mail</p>
                      <p>awanpijarandika@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    </>
  );
}
export default Profile;
