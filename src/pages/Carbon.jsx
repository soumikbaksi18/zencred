import React, { useState } from "react";

const Carbon = ({ discountEligible, setDiscountCoupon }) => {
  const [carbonOffset, setCarbonOffset] = useState(null);
  const [weightInput, setWeightInput] = useState("");
  const [distanceInput, setDistanceInput] = useState("");
  const [discountCoupon, setDiscountCoupon1] = useState(null);

  const apiTesting = () => {
    const API_KEY = "8R0EBEAR0948TTJ9WAFJ8S6MKHTE";

    fetch("https://beta4.api.climatiq.io/estimate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        emission_factor: {
          activity_id:
            "freight_vehicle-vehicle_type_truck_medium_or_heavy-fuel_source_na-vehicle_weight_na-percentage_load_na",
          data_version: "^1",
        },
        parameters: {
          weight: Number(weightInput),
          distance: Number(distanceInput),
          weight_unit: "kg",
          distance_unit: "km",
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCarbonOffset(data.co2e);
        if (data.co2e < 100) {
          // Generate discount coupon (simulate with a simple code)
          // const generatedCoupon = `CARB${Math.random()
          //   .toString(36)
          //   .substring(2, 10)}`;
          const generatedCoupon = `CARB7772618`;
          setDiscountCoupon1(generatedCoupon);
          console.log(
            "User is eligible for a discount! Coupon:",
            generatedCoupon
          );
          setDiscountCoupon(10);
        } else {
          console.log("User not eligible for a discount.");
          setDiscountCoupon1(null); // Reset discount coupon
          setDiscountCoupon(0);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleWeightChange = (event) => {
    setWeightInput(event.target.value);
  };

  const handleDistanceChange = (event) => {
    setDistanceInput(event.target.value);
  };

  const handleCalculateClick = () => {
    apiTesting();
  };
  return (
    <>
        <div className="section">
      <div className="calculator-bg2">
        <div className="p-6">
          <h1 className={`p-2 `}>Weight of Cargo</h1>
          <div className="flex relative">
            <input
              className="input-field p-6 mr-2"
              type="number"
              value={weightInput}
              onChange={handleWeightChange}
            />
            <h2 className="flex-end ml-2">Kg</h2>
          </div>
        </div>

        <div className="p-6">
          <h1 className={` p-2 `}>Distance Covered</h1>
          <div className="flex relative">
            <input
              className="input-field p-6 mr-2"
              type="number"
              value={distanceInput}
              onChange={handleDistanceChange}
            />
            <h2 className="flex-end">
              Km
            </h2>
          </div>
        </div>

        <div className="p-6 mt-5">
          <button className="calculate" onClick={handleCalculateClick}>
            <h3 className={` p-2 `}>Calculate</h3>
          </button>
        </div>
      </div>

      <div className="output mt-10">
        <div className="output-field flex relative ">
          <h2 className={` text-lg p-6`}>
            Your Carbon offset is:
            <p className="text-2xl flex-end text-black">{carbonOffset && <p>{carbonOffset}</p>}</p>
          </h2>

          <h3 className="absolute right-2 pt-10 mr-8 text-white text-2xl font-semibold">
            Kg
          </h3>
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
  )
}

export default Carbon