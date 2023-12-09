import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof,
} from "anon-aadhaar-react";

// Components
import Navigation from "./components/Navigation";
import Sort from "./components/Sort";
import Card from "./components/Card";
import SeatChart from "./components/SeatChart";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Carbon from "./pages/Carbon";

// ABIs
import TokenMaster from "./abis/TokenMaster.json";

// Config
import config from "./config.json";

// import Navbar from "../components/Navbar";
import hero1 from "./assets/herobox1.svg";
import hero2 from "./assets/herobox2.svg";
import hero3 from "./assets/herobox3.svg";
import c1 from "./assets/cutie1.svg";
import c2 from "./assets/cutie2.svg";
import hand from "./assets/hand.svg";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Carbon2 from "./pages/Carbon2";


function App({ anonAadhaarProvider }) {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const [tokenMaster, setTokenMaster] = useState(null);
  const [occasions, setOccasions] = useState([]);

  const [occasion, setOccasion] = useState({});
  const [toggle, setToggle] = useState(false);

  const [anonAadhaar] = useAnonAadhaar();

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
    console.log("Anon Aadhaar status: 🔴 ", anonAadhaar.status);
  }, [anonAadhaar.status]);

  return (
    <div>
      <Navbar account={account} setAccount={setAccount} />

      {/* <Dashboard userAddress={account} contract={tokenMaster} /> */}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="home">
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
                          <h1 className="mx-5 text-black text-lg font-bold ">
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

                <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20 mx-36">
                  {occasions.map((occasion, index) => (
                    <Card
                      occasion={occasion}
                      id={index + 1}
                      tokenMaster={tokenMaster}
                      provider={provider}
                      account={account}
                      toggle={toggle}
                      setToggle={setToggle}
                      setOccasion={setOccasion}
                      key={index}
                    />
                  ))}
                </div>

                {toggle && (
                  <div className="anon">
                    {anonAadhaarProvider}
                    <div className="center">
                      <LogInWithAnonAadhaar />
                      <p>{anonAadhaar?.status}</p>
                    </div>
                    <div className="center">
                      {anonAadhaar?.status === "logged-in" && (
                        <>
                          <p>✅ Proof is valid</p>
                          <AnonAadhaarProof
                            code={JSON.stringify(anonAadhaar.pcd, null, 2)}
                          />

                          <SeatChart
                            occasion={occasion}
                            tokenMaster={tokenMaster}
                            provider={provider}
                            setToggle={setToggle}
                          />
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard userAddress={account} contract={tokenMaster} />}
        />
        <Route
          path="/carbon"
          element={<Carbon />}
        />
        <Route
          path="/carbon2"
          element={<Carbon2 />}
        />
        
      </Routes>
    </div>
  );
}

export default App;
