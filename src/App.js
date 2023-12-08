import React from 'react';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from './pages/Home';
import Verify from './pages/Verify';
import Event from './pages/Event';
import Dashboard from './pages/Dashboard';
import Carbon from './pages/Carbon';



const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/event" element={<Event />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/carbon" element={<Carbon />} />
    </Routes>
       
    </>
  )
}

export default App