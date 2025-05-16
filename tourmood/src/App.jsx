import { useState } from 'react';
import { generateItinerary } from './api/gemini';
import './App.css';

function App() {
  const [mood, setMood] = useState(null);
  const [location, setLocation] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const moods = [
    { id: 'excited', label: 'Excited', emoji: '🎉' },
    { id: 'relaxed', label: 'Relaxed', emoji: '😌' },
    { id: 'dreamy', label: 'Dreamy', emoji: '🌌' },
    { id: 'brave', label: 'Brave', emoji: '🦁' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood || !location) {
      setError('Please select both mood and location');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const result = await generateItinerary(mood, location);
      setItinerary(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>TourMood 🌍</h1>
      <p>Get personalized travel recommendations based on your mood</p>
      
      <form onSubmit={handleSubmit}>
        <div className="mood-selector">
          <h3>How are you feeling today?</h3>
          <div className="mood-grid">
            {moods.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`mood-btn ${mood === m.id ? 'active' : ''}`}
                onClick={() => setMood(m.id)}
              >
                <span className="emoji">{m.emoji}</span>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="location-input">
          <h3>Where would you like to go?</h3>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter a city or country"
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Get Recommendations'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {itinerary && (
        <div className="results">
          <h2>Your {mood} Adventure in {location}</h2>
          <div className="itinerary">
            {itinerary.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;