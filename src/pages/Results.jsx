import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ScoreCard from "../components/ScoreCard";

export default function Result() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        if (!state?.text || !state?.role) {
            navigate("/");
            return;
        }

        // Simulate backend call
        setTimeout(() => {
            setFeedback({
                summary: "You show strong experience in backend development but lack specific quantifiable achievements.",
                scores: {
                    clarity: 7,
                    experience: 8,
                    impact: 5,
                },
                hireability: "Likely",
            });
            setLoading(false);
        }, 1000);
    }, [state, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-xl">Analyzing...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4 text-blue-700">Analysis Result</h2>
            <p className="max-w-xl text-center text-gray-700 mb-6">{feedback.summary}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
                {Object.entries(feedback.scores).map(([category, score]) => (
                    <ScoreCard key={category} title={category} score={score} />
                ))}
            </div>

            <div className="mt-8 text-xl font-semibold text-green-600">
                Overall Hireability: {feedback.hireability}
            </div>

            <button
                onClick={() => navigate("/")}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Run Another
            </button>
        </div>
    );
}
