const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
async function analyzeResume(resumeText) {
const prompt = `
Analyze the following resume.

Return ONLY valid JSON.

The JSON must have exactly this structure:

{
  "overallScore": number,
  "scores": {
    "ats": number,
    "content": number,
    "structure": number,
    "skills": number
  },
  "strongPoints": [],
  "weakPoints": [],
  "nextSteps": []
}

Resume:

${resumeText}
`;

const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt
});
const text = response.text;
const analysis = JSON.parse(text);
console.log(analysis);
return analysis;
}
module.exports = {
    analyzeResume
};
