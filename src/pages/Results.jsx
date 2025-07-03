import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ScoreCard from "../components/ScoreCard";

export default function Result() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("firstlook-feedback");
        if (!stored) {
            navigate("/");
            return;
        }

        const parsed = JSON.parse(stored);
        setFeedback(parsed);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
            <h2 className="text-4xl font-bold text-blue-800 mb-6">🎯 Analysis Result</h2>

            {/* Strengths and Weaknesses Summary */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 w-full max-w-3xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Summary</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{feedback.summary}</p>
            </div>

            {/* Score Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mb-6">
                {Object.entries(feedback.scores).map(([category, score]) => (
                    <ScoreCard key={category} title={category} score={score} />
                ))}
            </div>

            {/* Hireability */}
            <div className="bg-green-100 text-green-800 text-lg font-bold px-6 py-3 rounded-lg shadow mb-6">
                Overall Hireability: {feedback.hireability}
            </div>

            {/* Run Again Button */}
            <button
                onClick={() => navigate("/")}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
                🔁 Run Another
            </button>

            {/* Raw Output */}
            <div className="mt-8 w-full max-w-3xl bg-white rounded-lg p-4 shadow-sm text-sm text-gray-600 whitespace-pre-wrap">
                <span className="block font-semibold text-gray-800 mb-2">Raw Output:</span>
                {feedback.raw}
            </div>
        </div>
    );
}
