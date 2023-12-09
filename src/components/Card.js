import React, { useState, useEffect } from "react";
import styles from "../style";
import events from "../Data/Eventdata";
import map from "../assets/map.svg";
import calendar from "../assets/Calendar.svg";
import stars from "../assets/stars.svg";
import { ethers } from "ethers";

const Card = ({ occasion, toggle, setToggle, setOccasion }) => {
  const togglePop = () => {
    setOccasion(occasion);
    toggle ? setToggle(false) : setToggle(true);
  };

  return (
    // <div className="card">
    //   <div className="card__info">
    //     <p className="card__date">
    //       <strong>{occasion.date}</strong>
    //       <br />
    //       {occasion.time}
    //     </p>

    //     <h3 className="card__name">{occasion.name}</h3>

    //     <p className="card__location">
    //       <small>{occasion.location}</small>
    //     </p>

    //     <p className="card__cost">
    //       <strong>
    //         {ethers.utils.formatUnits(occasion.cost.toString(), "ether")}
    //       </strong>
    //       ETH
    //     </p>

    //     {occasion.tickets.toString() === "0" ? (
    //       <button type="button" className="card__button--out" disabled>
    //         Sold Out
    //       </button>
    //     ) : (
    //       <button
    //         type="button"
    //         className="card__button"
    //         onClick={() => togglePop()}
    //       >
    //         View Seats
    //       </button>
    //     )}
    //   </div>

    //   <hr />
    // </div>
    <>
      <div className="relative mb-60 content-center">
        <img src="" className="w-[90%] h-[85%] object-cover rounded-lg" />
        <div className="bg-white z-10 py-2 w-[90%]  absolute flex justify-center flex-col rounded-lg shadow-2xl">
          <div className="flex justify-between mx-4 mt-4">
            <p className="text-black text-xl font-semibold font-poppins text-center">
              {occasion.name}
            </p>
            <div className="flex">
              <img src={map} className="w-6 mr-2" />
              <p className="font-poppins text-sm font-normal flex items-center">
                {occasion.location}
              </p>
            </div>
          </div>
          <div className="flex items-center px-4 ">
            <img src={calendar} className="w-4 mr-1" />
            <h3 className="font-poppins font-normal ">{occasion.date}</h3>
          </div>

          <p className="mt-6 px-4 mt-1 text-[#637381] font-poppins font-medium text-sm  line-clamp-3">
            {/* {description} */}
          </p>

          <div className="flex justify-between mt-2 mx-4">
            <div className="font-poppins font-medium text-lg text-purple-700 flex items-center">
              {ethers.utils.formatUnits(occasion.cost.toString(), "ether")}
            </div>
            <div className="flex flex-row ">
              <img src={stars} className="mx-3" />
              {/* <a href="" className="attend text-sm p-2 px-4">
                ATTEND
              </a> */}

              {occasion.tickets.toString() === "0" ? (
                <button
                  type="button"
                  className="attend text-sm p-2 px-4"
                  disabled
                >
                  Sold Out
                </button>
              ) : (
                <button
                  type="button"
                  className="attend text-sm p-2 px-4"
                  onClick={() => togglePop()}
                >
                  View Seats
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
