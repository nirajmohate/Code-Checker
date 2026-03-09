const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function generateContent(prompt) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are an AI assistant for code review and code conversion.

Rules:
- When asked for REVIEW: explain issues, suggest improvements, and provide optimized code.
- When asked for CONVERSION: return ONLY the converted code.
`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3
    });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error("AI Service Error:", error.message);
    throw new Error("AI generation failed");
  }
}

module.exports = generateContent;