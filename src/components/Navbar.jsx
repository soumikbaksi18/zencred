import React from 'react';
import logo from "../assets/logo.svg";
import "../App.css"

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between text-white mt-10 mx-20">
        <div className="flex items-center">
          <a href="/" className="">
            <h1 className="ml-24 text-white text-lg font-semibold leading-[30.60px]">
             <img src={logo} alt="" className="w-20" />
            </h1>
          </a>
        </div>

        <div className="flex items-center ">
          <a href="" className="">
            <h1 className="mx-5 text-violet-700 text-base font-light leading-[30.60px]">
              About
            </h1>
          </a>
          <a href="/all" className="">
            <h1 className="mx-5 text-violet-700 text-base font-light leading-[30.60px]">
              Events
            </h1>
          </a>
          <a href="/all" className="">
            <h1 className="mx-5 text-violet-700 text-base font-light leading-[30.60px]">
              Rewards
            </h1>
          </a>
          <a href="/all" className="">
            <h1 className="mx-5 text-violet-700 text-base font-light leading-[30.60px]">
              Carbon Footprints
            </h1>
          </a>
        </div>

        <div className="flex items-center ">
          <a href="" className="call w-36 py-2">
            <h1 className="mx-5 text-black text-sm font-semibold ">
              Request a Call
            </h1>
          </a>
          <a href="/all" className="">
            <h1 className="mx-5 text-black text-lg font-semibold leading-[30.60px]">
            👋 Hello
            </h1>
          </a>
          
        </div>


      </div>
    </>
  )
}

export default Navbar