"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAiDescription = generateAiDescription;
const generative_ai_1 = require("@google/generative-ai");
async function generateAiDescription(ctx) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Given this project context, write a concise, compelling README description (2-3 sentences):
  Name: ${ctx.name}
  Language: ${ctx.language}
  Framework: ${ctx.framework}
  Dependencies: ${Object.keys(ctx.scripts).join(', ')}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
}
