import { Link } from "react-router-dom";
import { ROUTES } from "../../shared/constants/routePaths";

function NotFound() {
    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-5 bg-gray-50">
            <div className="w-full max-w-lg text-center">

                {/* 404 */}
                <h1 className="text-8xl md:text-9xl font-bold text-orange-500">
                    404
                </h1>

                {/* Heading */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="text-gray-500 mt-3 mb-8 leading-6">
                    Sorry, the page you're looking for doesn't exist
                    <br />
                    or may have been moved.
                </p>

                {/* Back Home */}
                <Link
                    to={ROUTES.USER.HOME}
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-7 py-3 rounded-md transition"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;