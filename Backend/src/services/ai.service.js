const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `
    You are an AI assistant for code review and code conversion.

    - When asked for **review**, highlight issues, suggest improvements, and give optimized code.
    - When asked for **conversion**, directly output the converted code only.
  `,
});

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = generateContent;
