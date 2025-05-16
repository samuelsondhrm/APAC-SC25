// src/pages/Home.jsx
import React, { useState } from "react";
import MoodSelector from "../components/MoodSelector";
import AIResponseBox from "../components/AIResponseBox";

export default function Home() {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  return (
    <div>
      <MoodSelector onSelectMood={handleMoodSelect} />
      {selectedMood && <AIResponseBox mood={selectedMood} />}
    </div>
  );
}
