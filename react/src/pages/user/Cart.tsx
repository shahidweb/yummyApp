import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/hooks";
import { selectProductsWithCart } from "../../store/selectors/combinedSelectors";
import { deleteItem } from "../../store/slices/cartSlice";
import NoFound from "../../components/user/sections/NoFound";
import CartTable from "../../components/user/sections/carts/CartTable";
import CartTotal from "../../components/user/sections/carts/CartTotal";
import PromoCode from "../../components/user/sections/carts/PromoCode";

function Cart() {
    const cartItems = useSelector(selectProductsWithCart);
    const displatch = useAppDispatch()

    const activeCartItems = useMemo(
        () => cartItems.filter(item => item.qty > 0),
        [cartItems]
    );

    if (activeCartItems.length == 0) {
        return <NoFound title="Your cart is empty" description="Looks like you haven't added anything yet." />
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
