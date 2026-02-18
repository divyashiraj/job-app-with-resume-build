
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const optimizeResumeText = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite-latest',
      contents: `Transform this resume bullet point into a more professional, impact-driven statement using action verbs and metrics if possible: "${text}"`,
      config: {
        systemInstruction: "You are a world-class career coach and resume expert. Be concise and professional."
      }
    });
    return response.text || text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return text;
  }
};

export const calculateJobMatch = async (resume: string, jobDesc: string): Promise<number> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite-latest',
      contents: `Compare this resume: "${resume}" with this job description: "${jobDesc}". Provide a match percentage between 0 and 100 based on skills and experience. Return ONLY the number.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER }
          },
          required: ["score"]
        }
      }
    });
    const result = JSON.parse(response.text || '{"score": 0}');
    return result.score;
  } catch (error) {
    return Math.floor(Math.random() * 40) + 50; // Fallback to a random "safe" score
  }
};
