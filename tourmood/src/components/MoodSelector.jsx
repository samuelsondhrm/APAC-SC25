// src/components/MoodSelector.jsx
import React from "react";
import "../styles/MoodSelector.css"; // Optional: connect to your design system or Tailwind

const moods = [
  { label: "Relaxed", color: "#BFD8C8" },
  { label: "Excited", color: "#E77951" },
  { label: "Dreamy", color: "#D6B8E7" },
  { label: "Brave", color: "#5E7046" }
];

export default function MoodSelector({ onSelectMood }) {
  return (
    <div className="mood-selector" style={{ padding: "2rem", textAlign: "center" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>How are you feeling today?</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => onSelectMood(mood.label)}
            className={`mood-button ${mood.label.toLowerCase()}`}
            >
            {mood.label}
          </button>
        ))}
      </div>
    </div>
  );
}
