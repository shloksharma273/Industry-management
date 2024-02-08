import React from "react";
import Navbar from "../src/components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/components/Home";
import Grid from "@mui/material/Grid";
import "./index.css";
import Header from "../src/components/Header";
import Cv from "./components/Cv";
import Machines from "./components/Machines";
import MachineData from "./components/MachineData";
import Workers from "./components/Workers";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Grid container>
        {/* Navbar Grid Layout */}
        <Grid item lg={"auto"}>
          {/* Content for the first column (1 of 3) */}
          <Navbar />
        </Grid>
        <Grid item lg={"11"} padding={"20px"}>
          {/* Content for the second column (2 of 3) */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/livefeed" element={<Cv />} />
            <Route path="/machines" element={<Machines />} />
            <Route path="/machineData" element={<MachineData />} />
            <Route path="/workers" element={<Workers />} />
          </Routes>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
