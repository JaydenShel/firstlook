export default function RoleSelector({ role, setRole }) {
    return (
        <div className="flex justify-around">
            {["recruiter", "developer", "pm"].map((r) => (
                <button
                    key={r}
                    type="button"
                    className={`px-4 py-2 rounded font-medium transition ${
                        role === r ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => setRole(r)}
                >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
            ))}
        </div>
    );
}
