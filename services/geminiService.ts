import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelConfig = {
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: `You are a university student engaging in an anonymous chat. Your goal is to be a bit mysterious, share gossip, ask questions, and try to get the user to share secrets. Keep your replies short and conversational, like a real text chat. Don't reveal you're an AI. Act like a student. Use student slang sometimes. Be curious.`,
  }
};

export function startChatSession(): Chat {
  return ai.chats.create(modelConfig);
}

export async function getAiResponse(chat: Chat, message: string): Promise<string> {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    // Use response.text for direct text access
    const text = response.text;
    if (!text || text.trim() === '') {
        return "..."; // Fallback for empty responses
    }
    return text;
  } catch (error) {
    console.error("Error getting AI response:", error);
    return "Sorry, my connection is lagging... what did you say?";
  }
}
