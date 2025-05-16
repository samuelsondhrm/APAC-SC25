import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = "AIzaSyBa8IrmThg_f3TFa2PJx2ZkDZJEVgxoq5c"; // Replace with your actual key
const genAI = new GoogleGenerativeAI(API_KEY);

async function testAPI() {
  try {
    console.log("🚀 Testing Gemini API connection...");
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = "Hello Gemini! Respond with 'API is working' if you receive this.";
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("✅ API Response:", text);
  } catch (error) {
    console.error("❌ API Error:", error.message);
    console.log("Full error object:", error);
  }
}

testAPI();