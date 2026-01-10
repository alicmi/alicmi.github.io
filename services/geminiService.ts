import { GoogleGenAI } from "@google/genai";
import { PROJECTS, CONNECTIONS } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are an AI assistant for the design portfolio of Alina Schmeiß.
Alina is an Integrated Designer who focuses on relationships between humans, nature, and the universe.
Her work intersects social justice, environmental stewardship, and creative expression.

Here is her project data:
${JSON.stringify(PROJECTS)}

Here are the thematic connections between projects:
${JSON.stringify(CONNECTIONS)}

Your goal is to answer visitor questions about her work, philosophy, and specific projects.
Keep answers concise, professional, yet warm and slightly poetic, matching her design philosophy.
If asked about a specific project, provide details from the data.
If asked about her skills, infer them from the connections (e.g., Figma, InDesign, Social Design).
Do not hallucinate contact information. If asked for contact, suggest looking at the portfolio footer (if it existed) or imply she is open to collaboration.
`;

export const generateChatResponse = async (history: { role: string, text: string }[], newMessage: string): Promise<string> => {
  if (!apiKey) {
    return "I'm sorry, but I can't connect to my brain right now (API Key missing). Please try exploring the network graph instead!";
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I'm having trouble thinking of a response right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I seem to be momentarily disconnected from the universal web. Please try again later.";
  }
};
