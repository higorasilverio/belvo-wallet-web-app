import { render } from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authentication, Wallet, Transfer } from "./routes";
import { Navbar } from "./components";

render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Authentication />} />
      <Route path="wallet" element={<Wallet />} />
      <Route path="transfer" element={<Transfer />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
