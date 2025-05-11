import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CutoffCalculator = () => {
  const [mathMarks, setMathMarks] = useState("");
  const [physicsMarks, setPhysicsMarks] = useState("");
  const [chemistryMarks, setChemistryMarks] = useState("");
  const [cutoff, setCutoff] = useState(null);
  const [error, setError] = useState("");
  const [shapesKey, setShapesKey] = useState(0); // Triggers smooth animation
  const navigate = useNavigate();

  const handleMarksChange = (setMarks) => (e) => {
    const value = Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)); // ✅ Restricts 0-100 range
    setMarks(value);
  };

  const calculateCutoff = () => {
    if (mathMarks === "" || physicsMarks === "" || chemistryMarks === "") {
      setError("⚠️ Please enter marks for all subjects!");
      setCutoff(null);
      return;
    }

    const calculatedCutoff = parseFloat(mathMarks) + parseFloat(physicsMarks) / 2 + parseFloat(chemistryMarks) / 2;

    if (calculatedCutoff > 200) {
      setError("⚠️ Cutoff cannot exceed 200!");
      setCutoff(null);
      return;
    }

    setError("");
    setCutoff(calculatedCutoff.toFixed(2));

    // Trigger smooth animation update
    setShapesKey(prevKey => prevKey + 1);
  };

  const redirectToRecommendation = () => {
    if (cutoff) {
      navigate(`/recommendation?cutoff=${cutoff}`);
    } else {
      setError("⚠️ Calculate your cutoff first!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 position-relative">
      {/* Animated Background Shapes */}
      <div className="position-fixed w-100 h-100 top-0 start-0 z-n1 overflow-hidden" key={shapesKey}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="position-absolute floating"
            style={{
              width: `${Math.random() * 250 + 150}px`,
              height: `${Math.random() * 250 + 150}px`,
              backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.4)`,
              borderRadius: Math.random() > 0.5 ? "50%" : "20px",
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              animationDuration: `${Math.random() * 25 + 15}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="card shadow-lg p-4 glass-effect" style={{ width: "400px", backdropFilter: "blur(15px)", background: "rgba(255, 255, 255, 0.2)", borderRadius: "20px" }}>
        <h2 className="text-center mb-4">Cutoff Calculator</h2>

        {/* Input Sections */}
        <div className="mb-2">
          <label className="form-label">Mathematics Marks</label>
          <input 
            type="number" 
            className="form-control w-75 mx-auto small-input" 
            value={mathMarks} 
            onChange={handleMarksChange(setMathMarks)} 
            min="0" 
            max="100" 
            required 
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Physics Marks</label>
          <input 
            type="number" 
            className="form-control w-75 mx-auto small-input" 
            value={physicsMarks} 
            onChange={handleMarksChange(setPhysicsMarks)} 
            min="0" 
            max="100" 
            required 
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Chemistry Marks</label>
          <input 
            type="number" 
            className="form-control w-75 mx-auto small-input" 
            value={chemistryMarks} 
            onChange={handleMarksChange(setChemistryMarks)} 
            min="0" 
            max="100" 
            required 
          />
        </div>

        <button className="btn btn-primary w-100 mt-3" onClick={calculateCutoff}>Calculate Cutoff</button>

        {cutoff && (
          <>
            <div className="alert alert-info text-center mt-3">Your Cutoff: <strong>{cutoff}</strong></div>
            <button className="btn btn-success w-100 mt-3" onClick={redirectToRecommendation}>Get Recommendations</button>
          </>
        )}

        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>

      <style>{`
        .floating {
          animation: floatAnimation 25s infinite alternate ease-in-out;
        }
        @keyframes floatAnimation {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-60px) rotate(90deg); }
        }
      `}</style>
    </div>
  );
};

export default CutoffCalculator;
