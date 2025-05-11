const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const csvParser = require("csv-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let csvData = [];

// 🚀 Load CSV Data on Startup
const loadCSV = () => {
  csvData = [];
  const filePath = __dirname + "/cutoff.csv";

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (row) => {
      csvData.push(row);
    })
    .on("end", () => {
      console.log("✅ New CSV file successfully loaded!");
    })
    .on("error", (error) => {
      console.error("❌ Error reading CSV file:", error);
    });
};

// Load CSV initially
loadCSV();

// ✅ API Endpoint to Serve CSV Data Directly
app.get("/api/data", (req, res) => {
  if (csvData.length === 0) {
    return res.status(500).json({ error: "No data found. Ensure the CSV file is properly loaded." });
  }
  res.json(csvData); // Serve full CSV content
});

// ✅ Allow Manual CSV Reload
app.get("/api/reload", (req, res) => {
  loadCSV();
  res.send("✅ CSV data reloaded successfully!");
});

// ✅ **Remove Default 'Server is Running' Message**
app.get("/", (req, res) => {
  res.redirect("/api/data"); // 🚀 Redirect root to CSV data display
});

// ✅ Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
