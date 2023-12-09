import React from "react";
import { ethers } from "ethers";
import logo from "../assets/logo.svg";
import "../App.css";

const Navbar = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };
  return (
    <>
      <div className="flex justify-between text-white mt-8 mx-20">
        <div className="flex items-center">
          <a href="/" className="">
            <h1 className="ml-24 text-white text-lg font-semibold leading-[30.60px]">
              <img src={logo} alt="" className="w-20" />
            </h1>
          </a>
        </div>

        <div className="flex items-center ">
          <a href="" className="">
            <h1 className="mx-5 text-violet-700 text-base font-light leading-[30.60px]  text-purple-700">
              About
            </h1>
          </a>
          <a href="/all" className="">
            <h1 className="mx-5 text-violet-700 text-base font-light leading-[30.60px]  text-purple-700">
              Events
            </h1>
          </a>
          <a href="/dashboard" className="">
            <h1 className="mx-5 text-violet-700 text-base font-light leading-[30.60px]  text-purple-700">
              Dashboard
            </h1>
          </a>
          <a href="/carbon" className="">
            <h1 className="mx-5 text-violet-700 text-base font-light leading-[30.60px] text-purple-700">
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
          {/* <a href="/all" className="">
            <h1 className="mx-5 text-black text-lg font-semibold leading-[30.60px]">
              👋 Hello
            </h1>
          </a> */}
          {account ? (
            <button
              type="button"
              className="mx-5 text-black text-lg font-semibold leading-[30.60px]"
            >
              {account.slice(0, 6) + "..." + account.slice(38, 42)}
            </button>
          ) : (
            <button
              type="button"
              className="mx-5 text-black text-lg font-semibold leading-[30.60px]"
              onClick={connectHandler}
            >
              Connect
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
