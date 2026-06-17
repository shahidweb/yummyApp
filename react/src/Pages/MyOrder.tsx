import { useEffect, useState } from "react"
import { formatCurrency } from "../shared/utils/cartFn";
import { ArchiveBoxIcon } from "@heroicons/react/16/solid";

type IItems = {
    name: string;
    quantity: number
}

type myOrderType = {
    _id: string;
    status: string;
    items: IItems[];
    total_price: number,
    currency: string,
}

function MyOrder() {
    const [orders, setOrders] = useState<myOrderType[]>([])

    useEffect(() => {
        let data = [
            {
                "_id": "ORD-001",
                "status": "Food Processing",
                "items": [
                    { "name": "Greek salad", "quantity": 2 },
                    { "name": "Peri Peri Rolls", "quantity": 3 }
                ],
                "total_price": 65.00,
                "currency": "USD",
            },
            {
                "_id": "ORD-002",
                "status": "Delivered",
                "items": [
                    { "name": "Margherita Pizza", "quantity": 1 }
                ],
                "total_price": 15.50,
                "currency": "USD",
            }
        ]
        setOrders(data)
    }, [])


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
                            <div className="w-40">
                                <span className="text-orange-500 mr-1">●</span>
                                <span>{order.status}</span>
                            </div>

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
