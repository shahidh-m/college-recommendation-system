import React from "react";

function CollegeFeatures() {
  return (
    <div id="features" className="container my-5">
      <h2 className="text-center mb-4">Our Features</h2>
      <div className="row justify-content-center">
        <div className="col-md-3 col-sm-6 mb-4">
          <button className="btn btn-primary feature-btn w-100 py-4">
            <i className="bi bi-calculator fs-1"></i>
            <div className="mt-3">Cutoff Calculator</div>
          </button>
        </div>
        <div className="col-md-3 col-sm-6 mb-4">
          <button className="btn btn-success feature-btn w-100 py-4">
            <i className="bi bi-book fs-1"></i>
            <div className="mt-3">College Information</div>
          </button>
        </div>
        <div className="col-md-3 col-sm-6 mb-4">
          <button className="btn btn-danger feature-btn w-100 py-4">
            <i className="bi bi-arrow-up-right-circle fs-1"></i>
            <div className="mt-3">Trending Careers</div>
          </button>
        </div>
        <div className="col-md-3 col-sm-6 mb-4">
          <button className="btn btn-warning feature-btn w-100 py-4">
            <i className="bi bi-person-lines-fill fs-1"></i>
            <div className="mt-3">Personalized Guidance</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CollegeFeatures;
