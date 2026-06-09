import { useSelector } from 'react-redux';
import { deliveryFee, formatCurrency } from '../../../shared/utils/cartFn';
import { selectCartSubtotal } from '../../../store/selectors/combinedSelectors';

function CartTotal() {
    const subTotal = useSelector(selectCartSubtotal);
    return (
        <div className="w-full lg:w-1/2">
            <h1 className="text-2xl font-bold mb-5">Cart Totals</h1>
            <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-300 pb-2">
                    <span>SubTotal</span>
                    <span>{formatCurrency(subTotal)}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-2">
                    <span>Delivery Fee</span>
                    <span>{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(subTotal + deliveryFee)}</span>
                </div>
            </div>
            <button className="mt-8 bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition cursor-pointer">
                PROCEED TO CHECKOUT
            </button>
        </div>
    )
}

export default CartTotal
