import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartTotal from "../components/UI/CartTotal";
import { formatCurrency } from "../shared/utils/cartFn";
import { useAppDispatch } from "../store/hooks";
import { selectProductsWithCart } from "../store/selectors/combinedSelectors";
import { removeFromCart } from "../store/slices/cartSlice";

function Cart() {
    const cartItems = useSelector(selectProductsWithCart);
    const displatch = useAppDispatch()

    const activeCartItems = useMemo(
        () => cartItems.filter(item => item.qty > 0),
        [cartItems]
    );


    if (activeCartItems.length == 0) {
        return (
            <div className="max-w-7xl mx-auto px-5 py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">
                    Your cart is empty
                </h1>

                <p className="text-gray-500 mb-6">
                    Looks like you haven't added anything yet.
                </p>

                <Link
                    to="/"
                    className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }


    return (
        <div className="max-w-7xl mx-auto py-10 px-5">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-300 text-gray-500">
                            <th className="text-left py-4">Items</th>
                            <th className="text-left py-4">Title</th>
                            <th className="text-left py-4">Price</th>
                            <th className="text-left py-4">Quantity</th>
                            <th className="text-left py-4">Total</th>
                            <th className="text-left py-4">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeCartItems.map((item) => (
                            <tr className="border-b border-gray-200" key={item._id}>
                                <td className="py-4">
                                    <img className="w-14 h-14 object-cover rounded" src={item.image} alt={item.name} />
                                </td>
                                <td className="font-medium">{item.name}</td>
                                <td>{formatCurrency(item.price)}</td>
                                <td>{item.qty}</td>
                                <td>{formatCurrency(item.price * item.qty)}</td>
                                <td>
                                    <button
                                        onClick={() => displatch(removeFromCart({ _id: item._id, qty: 0 }))}
                                        aria-label={`Remove ${item.name}`}
                                        className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                                    >
                                        ×
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table >
            </div>
            <div className="flex flex-col lg:flex-row gap-16 mt-16">
                <CartTotal />
                <div className="w-full lg:w-1/2">
                    <p className="text-gray-600 mb-4">If you have a promo code, Enter it here</p>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Promo code"
                            className="flex-1 bg-gray-100 border border-gray-200 px-4 py-3 focus:outline-none focus:border-orange-500"
                        />
                        <button className="bg-black text-white px-8 py-3 hover:bg-gray-900 transition cursor-pointer">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
