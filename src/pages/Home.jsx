import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import hero1 from "../assets/herobox1.svg";
import hero2 from "../assets/herobox2.svg";
import hero3 from "../assets/herobox3.svg";
import c1 from "../assets/cutie1.svg";
import c2 from "../assets/cutie2.svg";
import hand from "../assets/hand.svg";
import Events from "../components/Events";

// ABIs
import TokenMaster from "../abis/TokenMaster.json";

// Config
import config from "../config.json";

const Home = () => {
  const [tokenMaster, setTokenMaster] = useState(null);
  const [occasions, setOccasions] = useState([]);
  const [provider, setProvider] = useState(null);
  const [occasion, setOccasion] = useState({});
  const [toggle, setToggle] = useState(false);
  const [account, setAccount] = useState(null);
  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    const tokenMaster = new ethers.Contract(
      config[network.chainId].TokenMaster.address,
      TokenMaster,
      provider
    );
    setTokenMaster(tokenMaster);

    const totalOccasions = await tokenMaster.totalOccasions();
    const occasions = [];

    for (var i = 1; i <= totalOccasions; i++) {
      const occasion = await tokenMaster.getOccasion(i);
      occasions.push(occasion);
    }

    setOccasions(occasions);

    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);
  return (
    <>
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
        <Events
          occasions={occasions}
          setOccasion={setOccasion}
          tokenMaster={tokenMaster}
          provider={provider}
          account={account}
        />
      </div>

      <div className="mb-6">
        <div className="flex flex-row justify-center text-5xl font-medium tracking-wide font-poppins mb-3">
          <h1>Elevating moments,</h1>
          <img src={c1} className="w-24 mx-3" />
          <h1 className="text-blue-800">Diminishing Carbon Footprint</h1>
        </div>

        <div className="flex iems-center justify-center text-5xl font-medium tracking-wide font-poppins mb-3">
          <h1>— where celebrations meet sustainability At</h1>
        </div>

        <div className="flex iems-center justify-center text-5xl font-medium tracking-wide font-poppins">
          <h2>ETHIndia✨</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
