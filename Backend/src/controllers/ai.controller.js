const generateContent = require("../services/ai.service");

exports.getReview = async (req, res) => {
  try {
    const { code } = req.body;

    const prompt = `
Review the following code and provide:
1. Issues
2. Improvements
3. Optimized version

Code:
${code}
`;

    const result = await generateContent(prompt);

    res.send(result);

  } catch (error) {
    console.error("Review error:", error);
    res.status(500).send("Error reviewing code");
  }
};


exports.convertCode = async (req, res) => {
  try {
    const { code, targetLang } = req.body;

    const prompt = `
Convert the following code into ${targetLang}.
Return ONLY the converted code.

Code:
${code}
`;

    const result = await generateContent(prompt);

    res.json({
      convertedCode: result
    });

  } catch (error) {
    console.error("Convert error:", error);
    res.status(500).send("Error converting code");
  }
};