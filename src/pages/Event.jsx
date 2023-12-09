import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import bbg from "../assets/bookingbg.jpg";
import styles from "../style";
import events from "../Data/Eventdata";
import map from "../assets/map.svg";
import calendar from "../assets/Calendar.svg";
import send from "../assets/send.svg";
import hall from "../assets/hall.svg";
import { id } from "ethers/lib/utils";
import { useLocation, useParams } from "react-router-dom";

const Event = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const occasionDetails = {
    name: searchParams.get("name"),
    location: searchParams.get("location"),
    price: parseFloat(searchParams.get("price")),
    description: searchParams.get("description"),
  };

  useEffect(() => {
    // Fetch additional event details if needed
    console.log(occasionDetails);
  }, [occasionDetails]);

  return (
    <>
      <div className="flex mt-16 mx-20">
        <div className="w-1/2 mr-10">
          <div className="rounded-3xl ">
            <img src={bbg} className="rounded-t-3xl" />
            <div className="bg-white z-10 py-2  flex justify-center flex-col shadow-2xl rounded-b-3xl">
              <div className="flex justify-between mx-4 mt-6">
                <p className="text-black text-xl font-semibold font-poppins text-center">
                  {occasionDetails.name}
                </p>
                <div className="flex">
                  <img src={map} className="w-6 mr-2" />
                  <p className="font-poppins text-sm font-normal flex items-center">
                    {occasionDetails.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center px-4 ">
                <img src={calendar} className="w-4 mr-1" />
                <h3 className="font-poppins font-normal ">7th June 2024</h3>
              </div>

              <p className="mt-6 px-4 mt-1 text-[#637381] font-poppins font-medium text-sm  line-clamp-3">
                {/* {occasionDetails.description} */}
                desc
              </p>

              <div className="flex justify-between mt-2 mx-4 pb-2">
                <div className="font-poppins font-medium text-lg text-purple-700 flex items-center">
                  {/* {occasionDetails.price} */}2ETH
                </div>
                <div className="flex flex-row attend px-3 ">
                  <a href="" className=" text-sm py-2">
                    Book
                  </a>
                  <img src={send} className="w-4 h-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2 ml-10">
          <img src={hall} />
        </div>
      </div>
    </>
  );
};

export default Event;
