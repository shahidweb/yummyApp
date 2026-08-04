import { ArchiveBoxIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import NoFound from "../../components/user/sections/NoFound";
import { apiService, type APIResponse } from "../../services/genericService";
import { ENDPOINT } from "../../shared/constants/api_urls";
import { ORDER_STATUS } from "../../shared/constants/order";
import type { TOrderType } from "../../shared/types/orders";
import { formatCurrency } from "../../shared/utils/cartFn";
import { notify } from "../../shared/utils/toast";



function MyOrder() {
    const [orders, setOrders] = useState<TOrderType[]>([])

    useEffect(() => {
        fetchOrders();
    }, [])

    const fetchOrders = async () => {
        try {
            const response = await apiService.get<APIResponse<TOrderType[]>>(ENDPOINT.ORDER_HISTORY);
            if (response.success && Array.isArray(response.data))
                setOrders(response.data);
        } catch (error) {
            setOrders([])
            const err = error as Error;
            notify.error(err.message)
        }
    }

    if (orders.length == 0) {
        return <NoFound title="Your Order history is empty" description="Looks like you haven't order anything yet." />
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-5">
            <div className="overflow-x-auto">
                <h1 className="text-2xl font-bold mb-5">My Orders</h1>
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="border border-gray-300 px-5 py-4 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-5 w-2/5">
                                <ArchiveBoxIcon className="w-10 h-10 text-orange-500" />
                                <p className="text-sm text-gray-700">
                                    {order.items.map((item, index) => (
                                        <span key={item.name}>
                                            {item.name} x {item.quantity}
                                            {index !== order.items.length - 1 && ", "}
                                        </span>
                                    ))}
                                </p>
                            </div>

                            {/* Total */}
                            <div className="font-medium w-36">
                                {formatCurrency(order.total_price)}
                            </div>

                            {/* Items Count */}
                            <div className="text-gray-700 w-36">
                                Items: {order.items.length}
                            </div>

                            {/* Status */}
                            {ORDER_STATUS.map(s =>
                                s.value === order.status ?
                                    <div key={s.value} className="w-40">
                                        <span className={`mr-1 ${s.textColor}`}>●</span>
                                        <span className={`mr-1 ${s.textColor}`}>{s.label}</span>
                                    </div>
                                    : ''
                            )}

                            {/* Track Button */}
                            <div>
                                <button className="w-40 bg-red-100 hover:bg-red-200 px-6 py-3 rounded text-gray-700 cursor-pointer transition">
                                    Track Order
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default MyOrder
