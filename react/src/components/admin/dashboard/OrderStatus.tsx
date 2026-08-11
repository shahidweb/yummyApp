import { useMemo } from "react";
import { ORDER_STATUS } from "../../../shared/constants/order";
import { useAppSelector } from "../../../store/hooks";

function OrderStatus() {
    const orders = useAppSelector(state => state.myOrders.data)

    const statusCount = useMemo(() => {
        return orders.reduce<Record<number, number>>((count, order) => {
            count[order.status] = (count[order.status] ?? 0) + 1;
            return count;
        }, {});
    }, [orders]);

    const latestStatus = useMemo(() => {
        return ORDER_STATUS.map((status) => ({
            ...status,
            total: statusCount[status.value] ?? 0,
        }));
    }, [statusCount]);


    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Order Status</h2>
            <div>
                {latestStatus.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.value} className="flex items-center justify-between py-2.5 hover:bg-gray-50 transition">
                            <div className="flex items-center gap-4">
                                <div className={`${item.bgColor} p-3 rounded-full`}>
                                    <Icon className={`w-6 h-6 ${item.textColor}`} />
                                </div>
                                <span className="font-medium">{item.label}</span>
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