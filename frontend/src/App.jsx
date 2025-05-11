import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./Hero";
import CollegeFeatures from "./CollegeFeatures";
import CollegeSearch from "./CollegeSearch";
import AboutUs from "./AboutUs";
import Footer from "./Footer";
import CutoffCalculator from "./CutoffCalculator";
import Recommendation from "./Recommendation";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={
          <>
            <Hero />
            <CollegeFeatures />
            <CollegeSearch />
            <AboutUs />
            <Footer />
          </>
        } />
        
        {/* Cutoff Calculator Page */}
        <Route path="/calculate-cutoff" element={<CutoffCalculator />} />
        
        {/* Recommendation Page */}
        <Route path="/recommendation" element={<Recommendation />} />
      </Routes>
    </Router>
  );
}

export default App;
