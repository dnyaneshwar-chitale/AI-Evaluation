import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Pages/evaluation.css";

const Evaluation = () => {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idea.trim()) {
      alert("Please describe your startup idea first!");
      return;
    }

    setLoading(true);

    const ideaData = {
      ideaDescription: idea,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ideaData),
      });

      const result = await response.json();

      if (response.ok) {
        const summaryText = result.summary; // ✅ store AI summary
        console.log("✅  Summary:", summaryText);

        // 👉 Navigate to Result page with summaryText
        navigate("/result", { state: { summaryText } });
      } else {
        console.error("⚠️ Server Error:", result);
        alert(result.error || "Failed to generate summary.");
      }
    } catch (error) {
      console.error("❌ API Error:", error);
      alert("⚠️ Server not responding. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="startup-container">
      <div className="form-card">
        <h2 className="evaluation-title">Startup Evaluator 🚀</h2>
<p className="evaluation-subtitle">Share your startup vision and discover how far it can go.</p>

        <textarea
          className="idea-input"
          placeholder="Describe your  startup idea here..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />

       <button className="generate-btn" onClick={handleSubmit} disabled={loading}>
  {loading ? (
    <>
      <div className="spinner"></div>
      Generating...
    </>
  ) : (
    "Generate Summary"
  )}
</button>

      </div>
    </div>
  );
};

export default Evaluation;
