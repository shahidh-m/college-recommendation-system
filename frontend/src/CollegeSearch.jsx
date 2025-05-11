import React from "react";
import { useNavigate } from "react-router-dom";

function CollegeSearch() {
  const navigate = useNavigate();

  return (
    <div id="search" className="container text-center my-5">
      <h2>Find Your Dream College</h2>
      <p className="lead">
        Search through thousands of colleges based on location, course, and cutoff!
      </p>
      <button
        className="btn btn-dark btn-lg mt-3"
        onClick={() => navigate("/calculate-cutoff")}
      >
        Search Now
      </button>
    </div>
  );
}

export default CollegeSearch;
