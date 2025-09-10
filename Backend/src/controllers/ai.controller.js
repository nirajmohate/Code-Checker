const aiService = require("../services/ai.service");

// --- Review code ---
module.exports.getReview = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).send("Code is required");
  }

  const response = await aiService(
    `Please review the following code for issues, readability, compatibility, and best practices:\n\n${code}`
  );

  res.send(response);
};

// --- Convert code ---
module.exports.convertCode = async (req, res) => {
  const { code, targetLang } = req.body;

  if (!code || !targetLang) {
    return res.status(400).send("Code and target language are required");
  }

  const response = await aiService(
    `Convert the following code into ${targetLang}. Keep functionality same and output only code:\n\n${code}`
  );

  res.json({ convertedCode: response });
};
