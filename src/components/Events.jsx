import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import styles from "../style";
import events from "../Data/Eventdata";
import map from "../assets/map.svg";
import calendar from "../assets/Calendar.svg";
import stars from "../assets/stars.svg";

const Events = ({ occasions, tokenMaster, provider, account, setOccasion }) => {
  const [activeCategory, setActiveCategory] = useState("");
  const [allEvents, setAllEvents] = useState(events);
  const [items, setItems] = useState(events);

  const filterItem = (categoryItem) => {
    if (categoryItem === "all") {
      setItems(allEvents);
    } else {
      const updatedItems = allEvents.filter((curElem) => {
        return curElem.category === categoryItem;
      });
      setItems(updatedItems);
    }
  };

  useEffect(() => {
    setItems(allEvents);
  }, [allEvents]);

  return (
    <>
      <h2 className={`${styles.subheading} ${styles.flexCenter}  mt-28`}>
        Recent Events
      </h2>
      <br />
      <div className={`${styles.paddingX} ${styles.marginX} `}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {occasions.map((occasion, index) => {
            // const { id, title, date, location, description, image, price } =
            //   elem;

            return (
              <div className="relative mb-60 content-center">
                <img
                  // src={image}
                  src=""
                  className="w-[90%] h-[85%] object-cover rounded-lg"
                />
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
                    <h3 className="font-poppins font-normal ">
                      {occasion.date}{" "}
                    </h3>
                  </div>

                  <p className="mt-6 px-4 mt-1 text-[#637381] font-poppins font-medium text-sm  line-clamp-3">
                    {/* {description} */}
                    desc
                  </p>

                  <div className="flex justify-between mt-2 mx-4">
                    <div className="font-poppins font-medium text-lg text-purple-700 flex items-center">
                      {/* {price} */}
                      {ethers.utils.formatUnits(
                        occasion.cost.toString(),
                        "ether"
                      )}
                    </div>
                    <div className="flex flex-row ">
                      <img src={stars} className="mx-3" />
                      <a href="" className="attend text-sm p-2 px-4">
                        ATTEND
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Events;
