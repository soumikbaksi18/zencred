import React, { useEffect, useState } from "react";
import ethticket from "../assets/ethticket.svg";
import styles from "../style";

function Dashboard({ userAddress, contract }) {
  const [userTickets, setUserTickets] = useState([]);
  const [loading, setLoading] = useState(true);
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
            {console.log("This is my Ticket Object : ",ticket)}
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
                    <h3 className="text-sm font-semibold text-purple-700">Seat No:</h3>
                  <p className=" text-[#637381] font-poppins font-bold text-sm  line-clamp-3">
                  {seat.toString()}
                  </p>
                  </div>
                 
                  </div>
                  
                </div>

            </div>

          </div>
          {/* <div key={id} className="flex justify-between bg-blue-100"
          >
            <div>TICKET ID - {id.toString()}</div>
            <div>Occasion: {occasion.date}</div>
            <div>Seat:{seat.toString()}</div>
            </div> */}

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="flex justify-center text-3xl font-semibold mt-8">Your Tickets</h2>
      <div className="grid grid-cols-3">{ticketDetails}</div>
    </div>
  );
}

export default Dashboard;
