import React from "react";
import Navbar from "../src/components/Navbar";
import { createTheme, Grid, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/components/Home";
import "./index.css";
import Header from "../src/components/Header";

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
        <Grid item lg={"11"}>
          {/* Content for the second column (2 of 3) */}
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
