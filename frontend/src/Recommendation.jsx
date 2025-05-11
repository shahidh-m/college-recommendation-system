import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const tamilNaduDistricts = [
  "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Vellore",
  "Erode", "Thanjavur", "Thoothukudi", "Kanchipuram", "Tiruppur", "Dindigul", "Sivaganga",
  "Ramanathapuram", "Virudhunagar", "Namakkal", "Krishnagiri", "Dharmapuri", "Nilgiris",
  "Perambalur", "Pudukkottai", "Karur", "Nagapattinam", "Cuddalore", "Tenkasi",
  "Tiruvannamalai", "Ranipet", "Chengalpattu", "Villupuram", "Mayiladuthurai",
  "Kallakurichi", "Ariyalur", "Thiruvallur", "Thiruvarur"
];

const Recommendation = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCutoff = parseFloat(queryParams.get("cutoff")) || 0;

  const [courses, setCourses] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("Anywhere in Tamil Nadu");
  const [selectedCourse, setSelectedCourse] = useState("Any Course");
  const [casteCategories, setCasteCategories] = useState(["OC", "BC", "BCM", "MBC", "SC", "SCA", "ST"]);
  const [selectedCaste, setSelectedCaste] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/data?" + new Date().getTime()) // 🚀 Prevent caching issues
      .then(response => response.json())
      .then(data => {
        const fetchedCourses = [...new Set(data.map(row => row["Branch Name"]?.trim()))]
          .filter(course => course && !course.includes("Branch Name"));

        setCourses(["Any Course", ...fetchedCourses]);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setErrorMessage("Failed to fetch data from backend. Please check API connection.");
        setLoading(false);
      });
  }, []);

  const handleGetRecommendations = () => {
    if (!selectedCaste) {
      setErrorMessage("Please select a caste.");
      return;
    }

    setLoading(true);
    fetch("http://localhost:5000/api/data?" + new Date().getTime()) 
      .then(response => response.json())
      .then(data => {
        let filteredRecommendations = [];
        let currentCutoffHigh = initialCutoff;
        let currentCutoffLow = initialCutoff - 3; // Start by recommending colleges 3 marks below cutoff
        let attemptCount = 0;

        while (filteredRecommendations.length < 5 && currentCutoffLow > 0 && attemptCount < 10) {
          filteredRecommendations = data.filter(row =>
            row[selectedCaste] &&
            parseFloat(row[selectedCaste]) <= currentCutoffHigh &&  
            parseFloat(row[selectedCaste]) >= currentCutoffLow &&
            (selectedCourse === "Any Course" || row["Branch Name"] === selectedCourse) &&
            (selectedDistrict === "Anywhere in Tamil Nadu" || row["College Name"].toLowerCase().includes(selectedDistrict.toLowerCase()))
          ).sort((a, b) => parseFloat(b[selectedCaste]) - parseFloat(a[selectedCaste]));

          // 🔥 Ensure 5 unique colleges with different courses if course is "Any Course"
          if (selectedCourse === "Any Course") {
            filteredRecommendations = filteredRecommendations.reduce((acc, row) => {
              if (acc.length < 5 && !acc.find(college => college["Branch Name"] === row["Branch Name"])) {
                acc.push(row);
              }
              return acc;
            }, []);
          }

          if (filteredRecommendations.length < 5) {
            currentCutoffLow -= 2;  // 🚀 Gradually lower cutoff if fewer than 5 colleges found
          }
          attemptCount++;
        }

        setRecommendations(filteredRecommendations.length ? filteredRecommendations.slice(0, 5) : []);
        setErrorMessage(filteredRecommendations.length ? "" : "No recommendations found for the selected inputs.");
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching recommendations:", error);
        setErrorMessage("Failed to fetch recommendations. Try again later.");
        setLoading(false);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100" style={{ marginTop: "100px", paddingBottom: "50px" }}>
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">College Recommendations</h2>

        <label className="form-label">Select Caste</label>
        <select className="form-select" value={selectedCaste} onChange={(e) => setSelectedCaste(e.target.value)}>
          <option value="">Select</option>
          {casteCategories.map((caste, index) => <option key={index} value={caste}>{caste}</option>)}
        </select>

        <label className="form-label">Select Course</label>
        <select className="form-select" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          {courses.map((course, index) => <option key={index} value={course}>{course}</option>)}
        </select>

        <label className="form-label">Select District</label>
        <select className="form-select" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
          <option value="Anywhere in Tamil Nadu">Anywhere in Tamil Nadu</option>
          {tamilNaduDistricts.map((district, index) => <option key={index} value={district}>{district}</option>)}
        </select>

        <button className="btn btn-success w-100 mt-3" onClick={handleGetRecommendations}>Get Recommendations</button>

        {loading && <p className="text-center mt-3">Loading recommendations...</p>}
        {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}

        <div className="mt-3">
          <p className="text-muted text-center">
            📢 Disclaimer: The predictions provided are based on previous years' results.  
            Actual cutoffs may vary by **5 to 10 marks**. Please use this as a **guideline** rather than an exact predictor.
          </p>

          {recommendations.length > 0 && (
            <ul className="list-group">
              {recommendations.map((college, index) => (
                <li key={index} className="list-group-item">
                  <strong>{college["College Name"]}</strong> - {college["District"]}
                  <br />
                  Course: {college["Branch Name"]}
                  <br />
                  Cutoff Match: {college[selectedCaste]}
                  <br />
                  <a href={college["College Website"]} target="_blank" rel="noopener noreferrer">
                    {college["College Website"]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
