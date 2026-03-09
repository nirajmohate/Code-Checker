import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import axios from "axios";
import "./App.css";

//  Get backend URL from .env
const API_BASE = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [code, setCode] = useState(`function addNumbers(a , b) {
  return a + b
}`);
  const [review, setReview] = useState("");
  const [converted, setConverted] = useState("");
  const [language, setLanguage] = useState("Python");

  //  separate loading states
  const [loadingReview, setLoadingReview] = useState(false);
  const [loadingConvert, setLoadingConvert] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  // --- Review code ---
  async function reviewCode() {
    try {
      setLoadingReview(true);
      const response = await axios.post(`${API_BASE}/ai/get-review`, { code });
      setReview(response.data);
    } catch (err) {
      console.error("Review error:", err);
      setReview("⚠ Error reviewing code.");
    } finally {
      setLoadingReview(false);
    }
  }

  // --- Convert code ---
  async function convertCode() {
    try {
      setLoadingConvert(true);
      const response = await axios.post(`${API_BASE}/ai/convert`, {
        code,
        targetLang: language,
      });

      console.log("Convert response:", response.data);
      setConverted(response.data.convertedCode || "⚠ No code returned");
    } catch (err) {
      console.error("Convert error:", err);
      setConverted("⚠ Error converting code.");
    } finally {
      setLoadingConvert(false);
    }
  }

  return (
    <>
      <main>
        {/* --- Left Side (Editor + Buttons) --- */}
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>

          {/* Buttons */}
          <div onClick={reviewCode} className="review">
            {loadingReview ? "⏳ Reviewing..." : "Review"}
          </div>

          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="dropdown"
            >
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
              <option value="Go">Go</option>
              <option value="rust">rust</option>
              <option value="c">C</option>
              <option value="kotlin">kotlin</option>
            </select>
            <button onClick={convertCode} className="convert-btn">
              {loadingConvert ? "⏳ Converting..." : "Convert"}
            </button>
          </div>
        </div>

        {/* --- Right Side (Review + Converted Code) --- */}
        <div className="right">
          <h3>AI Review:</h3>
          <div className="output-box">
            {loadingReview ? "⏳ Please wait..." : review}
          </div>

          <h3 style={{ marginTop: "20px" }}>Converted Code → {language}</h3>
          <pre className="output-box code-output">
            <code>{loadingConvert ? "⏳ Please wait..." : converted}</code>
          </pre>
        </div>
      </main>
    </>
  );
}

export default App;
