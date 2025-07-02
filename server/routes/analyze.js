import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
    const { text, role } = req.body;

    // Fake feedback — we'll hook OpenAI in later
    const feedback = {
        summary: `Analyzing for role: ${role}. Strong communication, but be more specific.`,
        scores: {
            clarity: 7,
            experience: 6,
            impact: 4
        },
        hireability: "Unclear"
    };

    res.json(feedback);
});

export default router;
