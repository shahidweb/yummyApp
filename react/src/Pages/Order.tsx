import { Navigate, useNavigate } from 'react-router-dom'
import CartTotal from '../components/UI/carts/CartTotal'
import type { IDeliveryAddress } from '../components/UI/DeliverForm'
import DeliverForm from '../components/UI/DeliverForm'
import { ROUTES } from '../router/routePaths'
import { ENDPOINT } from '../shared/services/APIURL'
import { apiService, type APIResponse } from '../shared/services/genericService'
import { notify } from '../shared/utils/toast'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectCartItems } from '../store/selectors/cartSelectors'
import { clearCart } from '../store/slices/cartSlice'

function Order() {
    const cartItems = useAppSelector(selectCartItems);
    if (cartItems.length === 0) {
        return <Navigate to="/" replace />
    }

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const onSubmitOrder = async (data: IDeliveryAddress) => {
        const items = cartItems.map((item) => ({ productId: item._id, quantity: item.qty }));
        const payload = {
            items,
            deliveryAddress: { ...data, fullName: `${data.fname} ${data.lname}` }
        }
        try {
            const res = await apiService.post
                <APIResponse, { items: { productId: string, quantity: number }[], deliveryAddress: IDeliveryAddress }>
                (ENDPOINT.ORDER_CREATED, payload)
            if (res.success) {
                notify.success(res.message)
                navigate(ROUTES.MYORDER);
                dispatch(clearCart())
            }
        } catch (error) {
            const err = error as Error;
            notify.error(err.message)
        }
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-5">
            <div className="flex flex-col lg:flex-row gap-16 mt-16">
                <CartTotal />
                <DeliverForm onSubmitOrder={onSubmitOrder} />
            </div>
        </div>
    )
}

export default Order
