import React, { useState } from "react";
import styles from "../style";

const Carbon2 = () => {
  const [lala, setLala] = useState(null);
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [passengerCount, setPassengerCount] = useState(1);
  const [ticketClass, setTicketClass] = useState("economy");
  const [discountCoupon, setDiscountCoupon] = useState(null);

  const apiTesting = () => {
    const API_KEY = "8R0EBEAR0948TTJ9WAFJ8S6MKHTE";

    const requestData = {
      legs: [
        {
          from: fromInput,
          to: toInput,
          passengers: passengerCount,
          class: ticketClass,
        },
      ],
    };

    fetch("https://beta4.api.climatiq.io/travel/flights", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setLala(data);

        if (data.co2e < 600) {
          const generatedCoupon = `CARB7772618`;
          setDiscountCoupon(generatedCoupon);
          console.log("User is eligible for a discount! Coupon:", generatedCoupon);
        } else {
          console.log("User not eligible for a discount.");
          setDiscountCoupon(null); // Reset discount coupon
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFromChange = (event) => {
    setFromInput(event.target.value);
  };

  const handleToChange = (event) => {
    setToInput(event.target.value);
  };

  const handlePassengerChange = (event) => {
    setPassengerCount(event.target.value);
  };

  const handleTicketClassChange = (event) => {
    setTicketClass(event.target.value);
  };

  const handleCalculateClick = () => {
    apiTesting();
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="calculator-bg3">
          <div className="p-6">
            <h1 className={`${styles.texts1} p-2 flex `}>From the link select your <span><a href="https://www.iata.org/en/publications/directories/code-search/" className="text-md text-blue-300"> IETA </a></span> code </h1>
            <input
              className="input-field p-6"
              type="text"
              value={fromInput}
              onChange={handleFromChange}
            />
          </div>

          <div className="p-6">
            <h1 className={`${styles.texts1} p-2 flex `}>To select your <span><a href="https://www.iata.org/en/publications/directories/code-search/" className="text-md text-blue-300"> IETA </a></span> code </h1>
            <input
              className="input-field p-6"
              type="text"
              value={toInput}
              onChange={handleToChange}
            />
          </div>

          <div className="p-6">
            <h1 className={`${styles.texts1} p-2 `}>No. of Passengers</h1>
            <input
              className="input-field p-6"
              type="number"
              value={passengerCount}
              onChange={handlePassengerChange}
            />
          </div>

          <div className="p-6">
            <h1 className={`${styles.texts1} p-2 `}>Ticket Class</h1>
            <select
              className="input-field p-6"
              value={ticketClass}
              onChange={handleTicketClassChange}>
              <option value="economy">Economy</option>
              <option value="business">Business</option>
              <option value="firstclass">First Class</option>
            </select>
          </div>

          <div className="p-6 mt-5">
            <button className="calculate" onClick={handleCalculateClick}>
              <h3 className={`${styles.texts1} p-2 `}>Calculate</h3>
            </button>
          </div>
        </div>

        <div className="output mt-10">
          <div className="output-field flex relative ">
            <h2 className={`${styles.texts1} text-lg p-6`}>
              Your Carbon offset is:
              <h3 className="text-2xl">{lala && <p>{lala.co2e}</p>}</h3>
            </h2>
            <h3 className="flex-end">Kg</h3>
          </div>
        </div>

        {discountCoupon && (
          <div className="mt-4">
            <h3 className="text-green-500">
              Congratulations! You've got a discount:
            </h3>
            <p className="text-2xl">{discountCoupon}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Carbon2;
