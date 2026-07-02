import { GoogleGenAI } from "@google/genai";

export const askFinanceAI = async (req, res) => {
  try {
    console.log(
      "Controller key exists:",
      !!process.env.GEMINI_API_KEY
    );

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const { question } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: question,
    });

    res.json({
      success: true,
      answer: response.text,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

