import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <div id="hero" className="text-center bg-dark text-white py-5">
      <h1 className="display-4">Guiding Your Future</h1>
      <p className="lead">
        Find the best college, course, and career path tailored to your needs.
      </p>
      <button
        className="btn btn-primary btn-lg mt-3"
        onClick={() => navigate("/calculate-cutoff")}
      >
        Get Started
      </button>
    </div>
  );
}

export default Hero;
