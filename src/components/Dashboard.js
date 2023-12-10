import React, { useEffect, useState } from "react";
import ethticket from "../assets/ethticket.svg";
import styles from "../style";
import Carbon from "../pages/Carbon";
import Carbon2 from "../pages/Carbon2";

function Dashboard({
  userAddress,
  contract,
  discountEligible,
  setDiscountCoupon,
}) {
  const [userTickets, setUserTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("tickets");
  const [ticketDetails, setTicketDetails] = useState([]);

  useEffect(() => {
    async function fetchUserTickets() {
      try {
        if (!contract) {
          console.warn("Contract is not defined.");
          return;
        }

        console.log("Calling getUserTickets");
        const tickets = await contract.getUserTickets(userAddress);

        console.log("Tickets:", tickets);
        setUserTickets(tickets);
      } catch (error) {
        console.error("Failed to fetch user tickets:", error);
      } finally {
        setLoading(false);
      }
    }

    if (userAddress) {
      fetchUserTickets();
    }
  }, [userAddress, contract]);

  useEffect(() => {
    async function fetchTicketDetails() {
      try {
        const ticketDetailsPromises = userTickets.map(async (ticket) => {
          let id, occasionId, seat, occasion;
          try {
            [id, occasionId, seat] = await contract.getTicketDetails(
              userAddress,
              ticket.id
            );
            occasion = await contract.getOccasion(occasionId);
          } catch (error) {
            console.error(
              `Failed to fetch details for ticket: ${ticket.id}`,
              error
            );
            return null;
          }

          return (
            <>
              <div className={` ${styles.marginX} mt-10`}>
                <div className="w-64" key={id}>
                  <img
                    src={ethticket}
                    className=" object-cover rounded-lg w-64"
                  />
                  <div className="relative opacity-0.5 z-10 py-2 w-64  absolute flex justify-center flex-col rounded-b-lg -mt-32 mb-20">
                    <div className="flex justify-between mx-4 mt-4 ">
                      <p className="text-black text-lg font-semibold font-poppins text-center">
                        {occasion.name}
                      </p>
                      <div className="flex">
                        {/* <img src={map} className="w-6 mr-2" /> */}
                        <p className="font-poppins text-sm font-semibold flex items-center">
                          {occasion.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center px-4 ">
                      <h3 className="font-poppins font-semibold text-sm">
                        {occasion.date}{" "}
                      </h3>
                      <div className="flex">
                        <h3 className="text-sm font-semibold text-purple-700">
                          Seat No:
                        </h3>
                        <p className=" text-[#637381] font-poppins font-bold text-sm  line-clamp-3">
                          {seat.toString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        });

        const resolvedTicketDetails = await Promise.all(ticketDetailsPromises);
        setTicketDetails(resolvedTicketDetails);
      } catch (error) {
        console.error("Failed to fetch ticket details:", error);
      }
    }

    if (userTickets.length > 0) {
      fetchTicketDetails();
    }
  }, [userAddress, contract, userTickets]);

  const renderOption = () => {
    switch (selectedOption) {
      case "tickets":
        return (
          <div className="">
            <h2 className="flex justify-center text-3xl font-semibold mt-8">
              Your Tickets
            </h2>
            <br />
            <div className="grid grid-cols-3">{ticketDetails}</div>
          </div>
        );
      case "carbon":
        return (
          <Carbon
            discountEligible={discountEligible}
            setDiscountCoupon={setDiscountCoupon}
          />
        );
      case "carbon2":
        return <Carbon2 />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex mx-10   mt-10">
      <div className="flex flex-col pr-20 mb-4  ">
        <button
          className={`mx-2 py-2 px-20 ${
            selectedOption === "tickets" && "bg-blue-500 text-white rounded-xl"
          }`}
          onClick={() => setSelectedOption("tickets")}
        >
          Tickets
        </button>
        <button
          className={`mx-2 py-2 px-20 ${
            selectedOption === "carbon" && "bg-blue-500 text-white rounded-xl"
          }`}
          onClick={() => setSelectedOption("carbon")}
        >
          Carbon
        </button>
        <button
          className={`mx-2 py-2 px-20 ${
            selectedOption === "carbon2" && "bg-blue-500 text-white rounded-xl"
          }`}
          onClick={() => setSelectedOption("carbon2")}
        >
          Carbon2
        </button>
      </div>
      {renderOption()}
    </div>
  );
}

export default Dashboard;
