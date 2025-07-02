import InputForm from "../components/InputForm";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">FirstLook</h1>
            <p className="text-lg mb-6 text-gray-700 text-center max-w-xl">
                Paste your resume, GitHub, or LinkedIn content. Select a role. Get instant feedback.
            </p>
            <InputForm />
        </div>
    );
}
