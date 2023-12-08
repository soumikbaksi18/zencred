import React from "react";
import Events from "../components/Events";
import Navbar from "../components/Navbar";
import verify from "../assets/Verification.svg";
import upload from "../assets/upload.svg";
import c1 from "../assets/cutie1.svg";

const Verify = () => {
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>

      <div className="mt-20 z-0 mx-48">
        <div className="flex justify-end">
          <img src={verify} className="w-3/4 absolute" />
          <div>
            <a href="">
              <div className="flex flex-col call p-8 z-10 relative mt-80 mr-12">
                <h1 className="font-poppins text-xl text-purple-700 leading-wider font-semibold">
                  {" "}
                  UPLOAD YOUR MASKED
                </h1>
                <div className="flex">
                  <h1 className="font-poppins text-xl text-purple-700 leading-wider font-semibold">
                    AADHAR
                  </h1>
                  <img src={upload} className="mx-3" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div>
        <Events />
      </div>

      <div className="mb-6">
        <div className="flex flex-row justify-center text-5xl font-medium tracking-wide font-poppins">
          <h1>Elevating moments,</h1>
          <img src={c1} className="w-24 mx-3" />
          <h1 className="text-blue-800">Diminishing Carbon Footprint</h1>
        </div>

        <div className="flex iems-center justify-center text-5xl font-medium tracking-wide font-poppins">
          <h1>— where celebrations meet sustainability At</h1>
        </div>

        <div className="flex iems-center justify-center text-5xl font-medium tracking-wide font-poppins">
          <h2>ETHIndia✨</h2>
        </div>
      </div>
    </>
  );
};

export default Verify;
