import dotenv from 'dotenv';
import { generateItinerary } from './src/api/gemini.js';

dotenv.config({ path: '.env.local' });

async function test() {
  try {
    console.log("Testing with API key:", process.env.API_KEY);
    const result = await generateItinerary("Excited", "Jatinangor, Sumedang, Indonesia");
    console.log("✅ Success!\n", result);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

test();