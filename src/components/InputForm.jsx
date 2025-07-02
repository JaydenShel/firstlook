import { useState } from "react";
import RoleSelector from "./RoleSelector";
import { useNavigate } from "react-router-dom";

export default function InputForm() {
    const [text, setText] = useState("");
    const [role, setRole] = useState("recruiter");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text, role })
            });

            const data = await res.json();
            localStorage.setItem("firstlook-feedback", JSON.stringify(data));
            navigate("/result");
        } catch (err) {
            console.error("Error contacting server:", err);
            alert("Server error. Try again later.");
        }
    };



    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white p-6 rounded-xl shadow-lg space-y-4">
      <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your content here..."
          className="w-full h-40 p-4 border border-gray-300 rounded resize-none"
          required
      />
            <RoleSelector role={role} setRole={setRole} />
            <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
            >
                Analyze
            </button>
        </form>
    );
}
