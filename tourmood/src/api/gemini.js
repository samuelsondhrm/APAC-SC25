import { GoogleGenerativeAI } from "@google/generative-ai";

// Works in both Vite and Node.js
const apiKey =
  process.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) throw new Error("Missing Gemini API key");
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateItinerary(mood, location) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are a travel assistant for a TourMood app.
	  TourMood is an AI-based application that recommend a tour site for the current condition of the user.
      The user is currently feeling: ${mood}
	  The user is currently is on ${location}
      
      Suggest 3-5 destination ideas that suit this mood. Follow these rules:
      
      1. Each suggestion should include:
         - A title (bold with **)
         - A short description (why it fits the mood)
		 - Recommend activity to do on the site
		 - What to expect on the site.
         - Estimated duration of visit
      
      2. Format response in Markdown with clear section breaks
      
      3. Only include nearby or culturally relevant spots
      
      4. Be creative and suggest local favorites
      
      5. Keep descriptions concise (1-2 sentences max per suggestion)
      
      Example format:
      **1. Suggestion Title**
      Description text explaining why this fits the mood...
	  Recommended activity..
	  What to expect on the site..
      (Distance: 1.2km | Duration: 2-3 hours)
    `;

    function getMoodDescription(mood) {
      const descriptions = {
        relaxed: "looking for calm, peaceful experiences",
        excited: "seeking fun, energetic activities",
        dreamy: "wanting imaginative, whimsical places",
        brave: "ready for adventurous, challenging experiences",
      };
      return descriptions[mood] || "";
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw new Error("Failed to generate itinerary. Please try again.");
  }
}
