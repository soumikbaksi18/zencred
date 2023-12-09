import React, { useEffect, useState } from "react";

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
            occasion = await contract.getOccasion(occasionId);
          } catch (error) {
            console.error(
              `Failed to fetch details for ticket: ${ticket.id}`,
              error
            );
            return null;
          }

          return (
            <li key={id}>
              Ticket ID: {id.toString()}, Occasion: {occasion.name}, Seat:
              {seat.toString()}
            </li>
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
      <h2>Your Tickets</h2>
      <ul>{ticketDetails}</ul>
    </div>
  );
}

export default Dashboard;
