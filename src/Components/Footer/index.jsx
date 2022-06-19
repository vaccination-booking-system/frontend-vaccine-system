import React from "react";
import { Link } from "react-router-dom";
import { BsYoutube, BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="flex justify-center mt-[117px] mx-[6.5px]">
        <div className="bg-[#0A6C9D] w-full h-full flex justify-end  text-white">
          <div className="pt-[21px] pr-[56px]">
            {/* wrap semua quick links */}
            <div className="pb-[34px]">
              {/* quick link */}
              <span>Quick Links</span>
              <div className="bg-white w-11/12 h-[2px]"></div>
            </div>
            <div className="pb-[18px]">
              <span>Sign Up</span>
            </div>
            <div>
              <span>About Us</span>
            </div>
          </div>
          <div className="pt-[21px] pr-[56px]">
            {/* wrap semua others */}
            <div className="pb-[34px]">
              {/* quick link */}
              <span>Others</span>
              <div className="bg-white w-8/12 h-[2px]"></div>
            </div>
            <div className="pb-[18px]">
              <span>User FAQs</span>
            </div>
            <div className="pb-[18px]">
              <span>Legal</span>
            </div>
            <div className="pb-[18px]">
              <span>Privacy Policy</span>
            </div>
            <div className="pb-[29px]">
              <span>Terms and Conditions</span>
            </div>
          </div>
          <div className="pt-[21px] pr-[73px]">
            {/* wrap semua products */}
            <div className="pb-[34px]">
              {/* produtcs */}
              <span>Products</span>
              <div className="bg-white w-11/12 h-[2px]"></div>
            </div>
            <div className="pb-[18px]">
              <span>Send</span>
            </div>
            <div className="pb-[18px]">
              <span>Receive</span>
            </div>
            <div>
              <span>Buy</span>
            </div>
          </div>
          <div className="pt-[21px] pr-[86px]">
            {/* ini all konten subs */}
            <div>
              <div className="w-[340px] pb-[20px]">
                <p>Subscribe to our newsletter and be the first to know about our updates</p>
              </div>
              <div>
                <input type="text" placeholder="Email Address" className="py-[18px] pl-[10px]" style={{ width: "100%", height: "50px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white w-full h-[2px] mx-[6.5px]"></div>
      <div className="bg-[#0A6C9D] flex justify-between items-center text-white mx-[6.5px]">
        <div className="pl-[116px] pt-[23px] pb-[21px]">
          <p className="font-bold w-[250px]">Copyright &copy; 2022. All rights. reserved</p>
        </div>
        <div className="flex gap-x-6 pr-[58px]">
          <div>
            <BsYoutube size={20} />
          </div>
          <div>
            <BsInstagram size={20} />
          </div>
          <div>
            <FaFacebookF size={20} />
          </div>
          <div>
            <BsTwitter size={20} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;