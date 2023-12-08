import React from "react";
import Navbar from "../components/Navbar";
import hero1 from '../assets/herobox1.svg';
import hero2 from '../assets/herobox2.svg';
import hero3 from '../assets/herobox3.svg';
import c1 from "../assets/cutie1.svg";
import c2 from "../assets/cutie2.svg";
import hand from "../assets/hand.svg";
import Events from "../components/Events";

const Home = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>

      <div>
        <div className="hero flex justify-between mt-16 mx-20">
          <div className="w-1/2 ">
            <div className="flex justify-center my-2">
              <img src={c1} className="w-36 mx-5 pt-3" />
              <h1 className="text-8xl font-bold">Wherever</h1>
            </div>
            <h1 className="text-8xl font-bold flex justify-center my-2">
              You Go, Let's
            </h1>
            <div className="flex justify-center my-2">
              <h1 className="text-8xl font-bold">Make It</h1>
              <img src={c2} className="w-48 mx-5 pt-3" />
            </div>
            <div className="flex justify-center my-2">
              <h1 className="text-8xl font-bold">Happen</h1>
              <img src={hand} className="w-28 mx-5" />
            </div>

            <div className="flex justify-center pt-20">
              <div className="call w-48 py-2 mr-8">
                <h1 className="mx-5 text-black text-xl font-bold ">
                  Book Events 🗓️️
                </h1>
              </div>
              <div className="mx-5 text-black text-xl font-bold flex items-center ml-8">
                <u> Reedem Carbon Coupon💚</u>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex justify-center pb-8">
              <img src={hero1} className="w-9/10" />
            </div>
            <div className="flex justify-around mx-2">
              <div className="">
                <img src={hero2} className="w-9/10" />
              </div>
              <div className="">
                <img src={hero3} className="w-9/10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Events/>
      </div>
    </>
  );
};

export default Home;
