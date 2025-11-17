import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export const generateReport = async (req, res) => {
  try {
    const { projectTitle, problemStatement } = req.body;

    console.log("📥 Incoming projectTitle:", projectTitle);
    console.log("📥 Incoming problemStatement:", problemStatement);

    const model = "gemini-2.5-flash";
    console.log("🚀 Sending prompt to Gemini (v1beta endpoint)...");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `
You are an expert academic writer. Generate a detailed, structured technical project report in JSON format.

Project Title: ${projectTitle}
Problem Statement: ${problemStatement}

Each section must have at least 3–5 meaningful sentences.

Structure:
{
  "Introduction": "...",
  "Problem Statement": "...",
  "Literature Survey (2021–2025)": "...",
  "Methodology": "...",
  "Implementation / Results": "...",
  "Conclusion": "...",
  "Future Scope": "..."
}
                  `,
                },
              ],
            },
          ],
        }),
      }
    );

    const text = await response.text();
    console.log("📩 Raw API Response Text:", text);

    if (!text) {
      return res
        .status(500)
        .json({ error: "Empty response from Gemini API." });
    }

    const data = JSON.parse(text);

    if (!response.ok || data.error) {
      console.error("❌ Gemini API Error:", data.error || data);
      return res
        .status(500)
        .json({ error: "Gemini API error", details: data.error || data });
    }

    const generatedText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No content generated.";

    console.log("✅ Report generated successfully!");
    res.json({ report: generatedText });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
