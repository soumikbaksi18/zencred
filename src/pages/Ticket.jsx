import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Tickets from "../components/TicketValue";
// import Chatbot from "../components/Chatbot";

const Ticket = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const handleChatRoomsClick = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <>
      <div className="tickets flex mt-12 font-poppins">
        <div className="w-1/4 vernav mx-10 flex flex-col h-[600px] ">
          <div className="ticket p-2 w-52 text-center border-black border-2 my-2 ">
            <a href="" className="text-lg font-medium  ">
              My Tickets
            </a>
          </div>
          <div className="ticket p-2 w-52 text-center border-black border-2 my-2">
            <a href="" className="text-lg font-medium  ">
              Carbon Offsetting
            </a>
          </div>
          <div
            className="ticket p-2 w-52 text-center border-black border-2 my-2"
            onClick={handleChatRoomsClick}
          >
            <a className="text-lg font-medium">Chat Rooms</a>
          </div>
          {/* {showChatbot &&  <Chatbot />} */}
          <div className="h-[350px]"></div>
          
        </div>

        <div className="w-3/4">
          <h1 className="font-poppins text-3xl font-semibold text-center">My Tickets</h1>

          <div>
            <Tickets />

            <div className="coupons">
              <h1 className="font-poppins text-3xl font-semibold mb-10 text-center">My Coupons</h1>

              <div className="flex justify-around">
                <div className="coupon py-2 px-6">Lm2nPqRzX8</div>
                <div className="coupon py-2 px-6">Lm2nPqRzX8</div>
                <div className="coupon py-2 px-6">Lm2nPqRzX8</div>
              </div>
            </div>
          </div>
         
        
        </div>

        
      </div>
    </>
  );
};

export default Ticket;
