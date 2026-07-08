import {
    ClockIcon,
    FireIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";

function OrderStatus() {
    const status = [
        {
            id: 1,
            title: "Pending",
            total: 8,
            icon: ClockIcon,
            bg: "bg-yellow-100",
            color: "text-yellow-600",
        },
        {
            id: 2,
            title: "Preparing",
            total: 12,
            icon: FireIcon,
            bg: "bg-blue-100",
            color: "text-blue-600",
        },
        {
            id: 3,
            title: "Delivered",
            total: 18,
            icon: CheckCircleIcon,
            bg: "bg-green-100",
            color: "text-green-600",
        },
        {
            id: 4,
            title: "Cancelled",
            total: 2,
            icon: XCircleIcon,
            bg: "bg-red-100",
            color: "text-red-600",
        },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Order Status</h2>
            <div>
                {status.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.id} className="flex items-center justify-between py-2.5 hover:bg-gray-50 transition">
                            <div className="flex items-center gap-4">
                                <div className={`${item.bg} p-3 rounded-full`}>
                                    <Icon className={`w-6 h-6 ${item.color}`} />
                                </div>
                                <span className="font-medium">{item.title}</span>
                            </div>
                            <span className="text-xl font-bold">{item.total}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default OrderStatus;