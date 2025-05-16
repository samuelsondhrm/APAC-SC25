import { generateItinerary } from './api/gemini.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function test() {
  try {
    console.log("Testing Gemini API...");
    const result = await generateItinerary("Excited", "Tokyo");
    console.log("✅ Success!\n", result);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

test();