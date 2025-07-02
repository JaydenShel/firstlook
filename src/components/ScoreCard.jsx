export default function ScoreCard({ title, score }) {
    return (
        <div className="bg-white p-4 rounded shadow text-center">
            <h3 className="text-lg font-medium capitalize mb-2 text-gray-800">{title}</h3>
            <div className="text-3xl font-bold text-blue-600">{score}/10</div>
        </div>
    );
}
