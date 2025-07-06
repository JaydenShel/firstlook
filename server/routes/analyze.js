const express = require('express');
const { OpenAI } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function parseAIResponse(raw) {
    const hireabilityMatch = raw.match(/Overall hireability:\s*(Yes|No|Maybe)/i);
    const clarityMatch = raw.match(/Clarity:\s*(\d+)\/?10?/i);
    const experienceMatch = raw.match(/Experience:\s*(\d+)\/?10?/i);
    const impactMatch = raw.match(/Impact:\s*(\d+)\/?10?/i);

    const summary = (() => {
        const strengths = raw.match(/Strengths:\s*([\s\S]*?)Weaknesses:/i);
        const weaknesses = raw.match(/Weaknesses:\s*([\s\S]*?)Scores:/i);
        return `
            Strengths:\n${strengths ? strengths[1].trim() : "N/A"}
            
            Weaknesses:\n${weaknesses ? weaknesses[1].trim() : "N/A"}
        `.trim();
    })();

    return {
        summary,
        scores: {
            Clarity: clarityMatch ? Number(clarityMatch[1]) : null,
            Experience: experienceMatch ? Number(experienceMatch[1]) : null,
            Impact: impactMatch ? Number(impactMatch[1]) : null,
        },
        hireability: hireabilityMatch ? hireabilityMatch[1] : "Unknown"
    };
}

router.post('/', async (req, res) => {
    const { text, role, field } = req.body;

    const prompt = `
    You are a highly experienced ${role} in the field of ${field}. Evaluate the following resume or profile text and return:

    1. A brief summary of strengths/weaknesses
    2. Scores out of 10 for:
       - Clarity
       - Experience
       - Impact
    3. Overall hireability: Yes, No, or Maybe

    Content:
    ${text}
    `;

    try {
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });

        const rawOutput = chatResponse.choices[0].message.content;
        console.log(rawOutput);
        const parsedOutput = parseAIResponse(rawOutput);

        res.json(parsedOutput);
    } catch (err) {
        console.error("OpenAI error:", err);
        res.status(500).json({ error: "Failed to generate feedback" });
    }
});

module.exports = router;
