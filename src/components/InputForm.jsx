import Select from "react-select";
import { useState } from "react";

const jobFields = [
    "Software Engineering", "Product Management", "Data Science", "UX/UI Design",
    "Marketing", "Sales", "Human Resources", "Finance", "Healthcare", "Education",
    "Legal", "Construction", "Customer Service", "Operations", "Real Estate"
];

const fieldOptions = jobFields.map(field => ({
    value: field,
    label: field,
}));

export default function InputForm() {
    const [text, setText] = useState("");
    const [role, setRole] = useState("");
    const [field, setField] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text || !role || !field) return;

        const res = await fetch("http://localhost:5000/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, role, field: field.value }),
        });

        const data = await res.json();
        localStorage.setItem("firstlook-feedback", JSON.stringify(data));
        window.location.href = "/result";
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white p-6 rounded shadow">
      <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste resume or profile text here"
          className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
      />

            <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Enter desired role (e.g. Software Engineer)"
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <Select
                options={fieldOptions}
                value={field}
                onChange={setField}
                placeholder="Select a job field"
                className="mb-4"
            />

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
            >
                Analyze
            </button>
        </form>
    );
}
