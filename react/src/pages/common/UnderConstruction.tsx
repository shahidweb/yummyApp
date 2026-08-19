import { Link } from "react-router-dom";
import { ROUTES } from "../../shared/constants/routePaths";

function UnderConstruction() {
    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-5 bg-gray-50">
            <div className="max-w-lg w-full text-center bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">

                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-4xl">🚧</span>
                </div>

                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    Coming Soon
                </h1>

                {/* Description */}
                <p className="text-gray-500 leading-6 mb-8">
                    We're working hard to bring this feature to you.
                    <br />
                    Please check back soon!
                </p>

                {/* Button */}
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

export default UnderConstruction;