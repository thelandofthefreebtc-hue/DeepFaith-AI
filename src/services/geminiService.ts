import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function getFinancialAdvice(query: string, profile: any) {
  if (!ai) {
    throw new Error("Gemini API Key is not configured.");
  }

  const prompt = `
    You are GlobalWealth AI, a minimalist, high-end financial advisor. 
    User Profile:
    - Display Name: ${profile?.displayName}
    - Total Balance: $${profile?.totalBalance}
    - Risk Tolerance: ${profile?.riskTolerance}
    - World ID Verified: ${profile?.worldIdVerified}
    
    Instruction: Provide concise, professional, and actionable financial advice based on the user's query. 
    Keep it minimalist and helpful. Mention micro-investment opportunities if relevant.
    Do not provide specific legal advice, but focus on strategy and wealth growth.
    
    User Query: ${query}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my knowledge base. Please try again soon.";
  }
}

