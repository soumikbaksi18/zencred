import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
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
  const [account, setAccount] = useState(null);

  return (
    <>
      <div>
        <Navbar account={account} setAccount={setAccount} />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/event" element={<Event />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/carbon" element={<Carbon />} />
      </Routes>
    </>
  );
};

export default App;
