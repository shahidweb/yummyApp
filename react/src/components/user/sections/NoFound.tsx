import { Link } from 'react-router-dom';

type NoFoundTypes = {
    title: string,
    description: string
}

// Your cart is empty
// Looks like you haven't added anything yet.
function NoFound(props: NoFoundTypes) {
    return (
        <div className="max-w-7xl mx-auto px-5 py-20 text-center">
            <h1 className="text-3xl font-bold mb-4"> {props.title}</h1>
            <p className="text-gray-500 mb-6">{props.description}</p>

            <Link to="/" className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition">
                Continue Shopping
            </Link>
        </div>
    );
}

export default NoFound
