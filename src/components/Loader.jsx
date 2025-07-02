export default function Loader() {
    return (
        <div className="flex items-center justify-center flex-col space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 text-lg font-medium">Analyzing your profile...</p>
        </div>
    );
}
