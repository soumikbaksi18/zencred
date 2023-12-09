import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Home from "./pages/Home";
import Verify from "./pages/Verify";
import Event from "./pages/Event";
import Dashboard from "./pages/Dashboard";
import Carbon from "./pages/Carbon";
import Navbar from "../src/components/Navbar";

// ABIs
import TokenMaster from "./abis/TokenMaster.json";

// Config
import config from "./config.json";

const App = () => {
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
        <Navbar account={account} setAccount={setAccount} />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              occasions={occasions}
              setOccasion={setOccasion}
              tokenMaster={tokenMaster}
              provider={provider}
              account={account}
            />
          }
        />
        <Route path="/verify" element={<Verify />} />

        <Route path="/event/:eventId" element={<Event />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/carbon" element={<Carbon />} />
      </Routes>
    </>
  );
};

export default App;
