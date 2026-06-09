import CartTotal from '../components/UI/carts/CartTotal'
import DeliverForm from '../components/UI/DeliverForm'

function Order() {
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
