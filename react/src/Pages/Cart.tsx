import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartTable from "../components/UI/carts/CartTable";
import CartTotal from "../components/UI/carts/CartTotal";
import PromoCode from "../components/UI/carts/PromoCode";
import { useAppDispatch } from "../store/hooks";
import { selectProductsWithCart } from "../store/selectors/combinedSelectors";
import { deleteItem } from "../store/slices/cartSlice";

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
                <CartTable activeCartItems={activeCartItems} onDeleteItem={(id: string) => displatch(deleteItem({ _id: id, qty: 0 }))} />
            </div>
            <div className="flex flex-col lg:flex-row gap-16 mt-16">
                <CartTotal />
                <PromoCode />
            </div>
        </div>
    )
}

export default Cart
