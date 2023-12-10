import React, { useState, useEffect } from "react";
import styles from "../style";
import tickets from "../Data/TicketData";
import ethticket from "../assets/ethticket.svg";

const TicketValue = () => {
  // const [activeCategory, setActiveCategory] = useState("");
  // const [allEvents, setAllEvents] = useState(events); 
  const [items, setItems] = useState(tickets);

  // const filterItem = (categoryItem) => {
  //   if (categoryItem === "all") {
  //     setItems(allEvents); 
  //   } else {
      
  //     const updatedItems = allEvents.filter((curElem) => {
  //       return curElem.category === categoryItem;
  //     });
  //     setItems(updatedItems);
  //   }
  // };

  // useEffect(() => {
  //   setItems(allEvents); 
  // }, [allEvents]);

  return (
    <>

      <div className={` ${styles.marginX} `}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((elem) => {
            const {
              id,
              title,
              date,
              time,
              seat,
              image,
              price,
            } = elem;

            return (
              <div className="relative mb-10 content-center" key={id}>
                <img
                  src={image}
                  className="w-[90%] h-[85%] object-cover rounded-lg"
                />
                <div className="bg-white z-10 py-2 w-[90%]  absolute flex justify-center flex-col rounded-lg shadow-2xl">
                  <div className="flex justify-between mx-4 mt-4">
                    <p className="text-black text-lg font-semibold font-poppins text-center">
                      {title}
                    </p>
                    <div className="flex">
                      {/* <img src={map} className="w-6 mr-2" /> */}
                    <p className="font-poppins text-sm font-normal flex items-center">
                      {time}
                    </p>
                    </div>
                    
                  </div>
                  <div className="flex justify-between items-center px-4 ">
                  <h3 className="font-poppins font-normal text-sm">
                    {date}{" "}
                  </h3>
                  <div className="flex">
                    <h3 className="text-sm font-medium text-purple-700">Seat No:</h3>
                  <p className=" text-[#637381] font-poppins font-medium text-sm  line-clamp-3">
                    {seat}
                  </p>
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

export default TicketValue;
