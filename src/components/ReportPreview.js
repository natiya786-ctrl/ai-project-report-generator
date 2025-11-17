import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ReportPreview({ sections }) {
  // 🧩 Directly use the response object from backend
  const intro = sections["Introduction"] || "";
  const problem = sections["Problem Statement"] || "";
  const literature = sections["Literature Survey (2021–2025)"] || "";
  const methodology = sections["Methodology"] || "";
  const implementation = sections["Implementation / Results"] || "";
  const conclusion = sections["Conclusion"] || "";
  const future = sections["Future Scope"] || "";

  // 🧾 Export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFont("Times", "Roman");

    doc.setFontSize(16);
    doc.text("AI-Powered Project Report", 10, 10);

    const addSection = (title, text, y) => {
      doc.setFontSize(14);
      doc.text(title, 10, y);
      doc.setFontSize(12);
      doc.text(text || "Not available", 10, y + 8, { maxWidth: 180 });
    };

    let y = 25;
    addSection("1. Introduction", intro, y);
    y += 30;
    addSection("2. Problem Statement", problem, y);
    y += 30;
    addSection("3. Literature Survey (2021–2025)", literature, y);
    y += 30;
    addSection("4. Methodology", methodology, y);
    y += 30;
    addSection("5. Implementation / Results", implementation, y);
    y += 30;
    addSection("6. Conclusion", conclusion, y);
    y += 30;
    addSection("7. Future Scope", future, y);

    doc.save("AI_Project_Report.pdf");
  };

  // 🧾 Export to DOC
  const handleExportDOC = () => {
    const content = `
      <h2 style="text-align:center;">AI-Powered Project Report</h2>
      <h3>1. Introduction</h3><p>${intro}</p>
      <h3>2. Problem Statement</h3><p>${problem}</p>
      <h3>3. Literature Survey (2021–2025)</h3><p>${literature}</p>
      <h3>4. Methodology</h3><p>${methodology}</p>
      <h3>5. Implementation / Results</h3><p>${implementation}</p>
      <h3>6. Conclusion</h3><p>${conclusion}</p>
      <h3>7. Future Scope</h3><p>${future}</p>
    `;
    const blob = new Blob(["\ufeff", content], {
      type: "application/msword",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "AI_Project_Report.doc";
    link.click();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div className="preview" style={{ textAlign: "left", margin: "20px" }}>
        {sections ? (
          <>
            <section><h4>1. Introduction</h4><p>{intro}</p></section>
            <section><h4>2. Problem Statement</h4><p>{problem}</p></section>
            <section><h4>3. Literature Survey (2021–2025)</h4><p>{literature}</p></section>
            <section><h4>4. Methodology</h4><p>{methodology}</p></section>
            <section><h4>5. Implementation / Results</h4><p>{implementation}</p></section>
            <section><h4>6. Conclusion</h4><p>{conclusion}</p></section>
            <section><h4>7. Future Scope</h4><p>{future}</p></section>
          </>
        ) : (
          <p className="placeholder">✨ Your generated report will appear here...</p>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleExportPDF}
          style={{
            backgroundColor: "#6a1b9a",
            color: "white",
            border: "none",
            padding: "10px 20px",
            marginRight: "10px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          📄 Export to PDF
        </button>

        <button
          onClick={handleExportDOC}
          style={{
            backgroundColor: "#8e24aa",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          📘 Export to DOC
        </button>
      </div>
    </div>
  );
}
