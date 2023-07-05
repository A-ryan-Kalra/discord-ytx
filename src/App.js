import React from "react";
import { Routes, Route } from "react-router-dom";
import HeroSec from "./pages/HeroSec";
import Home from "./components/Home";

function App() {
  return (
    <div className="App ">
      <Routes>
        <Route path="/" element={<HeroSec />} />

        <Route path="/channels" element={<Home />} />
        <Route path="/channels/:id" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
