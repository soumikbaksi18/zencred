/* global BigInt */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Route, Routes, BrowserRouter as Router, BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { AnonAadhaarProvider } from "anon-aadhaar-react";
const app_id = BigInt(parseInt("1fdd97b9d4fcd5eb682b465f9be492628a71c288", 16));


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <AnonAadhaarProvider _appId={app_id}>
      
      <App />
     
    </AnonAadhaarProvider>
    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
