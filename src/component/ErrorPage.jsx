import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 px-4">
            <div className="text-center max-w-md space-y-6">

                <h1 className="text-6xl font-bold text-indigo-600">404</h1>

                <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>

                <p className="text-gray-600">
                    Sorry, the page you are looking for doesn’t exist or has been moved.
                </p>

                <Link
                    to="/"
                    className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}
