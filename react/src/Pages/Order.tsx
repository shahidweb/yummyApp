import { Navigate } from 'react-router-dom'
import CartTotal from '../components/UI/carts/CartTotal'
import DeliverForm from '../components/UI/DeliverForm'
import { useAppSelector } from '../store/hooks'
import { selectCartItems } from '../store/selectors/cartSelectors'

function Order() {
    const cartItems = useAppSelector(selectCartItems);
    if (cartItems.length === 0) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-5">
            <div className="flex flex-col lg:flex-row gap-16 mt-16">
                <CartTotal />
                <DeliverForm />
            </div>
        </div>
    )
}

export default Order
