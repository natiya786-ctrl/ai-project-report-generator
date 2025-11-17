import React, { useState } from "react";
import axios from "axios";
import "../App.css";

import ReportPreview from "./ReportPreview";
import { API_BASE } from "../api";

export default function ReportForm() {
  const [form, setForm] = useState({
    projectTitle: "",
    problemStatement: "",
    objectives: "",
    tools: "",
    methodology: "",
    results: "",
    conclusion: "",
  });

  const [generated, setGenerated] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGenerate = async (e) => {
  e.preventDefault();
  setLoading(true);
  console.log(form);
  try {
    const res = await axios.post(`${API_BASE}/report/generate`, {
      projectTitle: form.projectTitle,
      problemStatement: form.problemStatement,
    });
setGenerated(res.data.report);

  } catch (err) {
    alert("⚠️ Error generating report. Try again!");
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="report-container">
      <div className="form-section">
        <h1>⚙ AI Project Report Generator</h1>
        <p className="tagline">
          Fill in your project details and generate a structured report instantly
        </p>

        <form onSubmit={handleGenerate}>
          <label>📌 Project Title</label>
          <input
            type="text"
            name="projectTitle"
            placeholder="Enter your project title"
            onChange={handleChange}
            required
          />

          <label>🧩 Problem Statement</label>
          <textarea
            name="problemStatement"
            placeholder="Describe the problem your project solves"
            onChange={handleChange}
            required
          />

          <label>🎯 Objectives</label>
          <textarea
            name="objectives"
            placeholder="List main objectives or goals"
            onChange={handleChange}
            required
          />

          <label>🛠 Tools / Technologies Used</label>
          <input
            type="text"
            name="tools"
            placeholder="e.g., React, Node.js, Python, OpenAI API"
            onChange={handleChange}
            required
          />

          <label>🔍 Methodology</label>
          <textarea
            name="methodology"
            placeholder="Briefly explain your approach"
            onChange={handleChange}
            required
          />

          <label>📊 Results</label>
          <textarea
            name="results"
            placeholder="Summarize your findings or results"
            onChange={handleChange}
            required
          />

          <label>💡 Conclusion</label>
          <textarea
            name="conclusion"
            placeholder="Write your key takeaways or future scope"
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "⚙️ Generating..." : "🚀 Generate Report"}
          </button>
        </form>
      </div>

      <div className="preview-section">
        <h2>📝 Report Preview</h2>
        {generated ? (
          <ReportPreview sections={generated} />
        ) : (
          <p className="placeholder">✨ Your generated report will appear here...</p>
        )}
      </div>
    </div>
  );
}

