import StatusBadge from "./StatusBadge";

function LatestOrders() {

    const orders = [
        {
            id: 1,
            item: "Greek Salad",
            customer: "Shahid",
            amount: 240,
            status: "Pending",
        },
        {
            id: 2,
            item: "Cheese Burger",
            customer: "Aman",
            amount: 180,
            status: "Preparing",
        },
        {
            id: 3,
            item: "Veg Pizza",
            customer: "Rahul",
            amount: 450,
            status: "Delivered",
        },
        {
            id: 4,
            item: "Pasta",
            customer: "Ankit",
            amount: 320,
            status: "Delivered",
        },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold"> Latest Orders</h2>
                <button className="text-orange-600 font-medium hover:underline"> View All</button>
            </div>
            <div>
                {orders.map(order => (
                    <div key={order.id} className="flex justify-between items-center py-2.5 hover:bg-gray-50 transition">
                        <div>
                            <h3 className="font-semibold">{order.item} </h3>
                            <p className="text-sm text-gray-500">{order.customer}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">₹ {order.amount}</p>
                            <StatusBadge status={order.status} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LatestOrders;