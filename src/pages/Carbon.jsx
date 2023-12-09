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
      <div className="flex justify-center">
        <div class="mx-auto w-full max-w-[550px] mb-20">
          <div>
            <div class="-mx-3 flex flex-wrap">
              <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    for="fName"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Weight of Cargo
                  </label>
                  <input
                    type="number"
                    name="fName"
                    id="fName"
                    value={weightInput}
                    onChange={handleWeightChange}
                    placeholder="in Kg"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    for="lName"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Distance Covered
                  </label>
                  <input
                    type="number"
                    name="lName"
                    id="lName"
                    value={distanceInput}
                    onChange={handleDistanceChange}
                    placeholder="Distance in Km"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>

            <div>
              <button class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Distance Calculation
              </button>
            </div>
            <div>
              <div className="output mt-4">
                <div className="output-field flex relative ">
                  <h2 className={` text-lg `}>
                    Your Carbon offset is:
                    <p className="text-2xl text-black">
                      {carbonOffset && <p>{carbonOffset}Kg</p>}
                    </p>
                  </h2>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Carbon;
