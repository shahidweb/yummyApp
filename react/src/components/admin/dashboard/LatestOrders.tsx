import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routePaths";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { allAdminOrders } from "../../../store/slices/orderSlice";
import StatusBadge from "./StatusBadge";

function LatestOrders() {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(state => state.myOrders.data);

    useEffect(() => {
        dispatch(allAdminOrders());
    }, [])


    const latestOrders = useMemo(() => {
        return [...orders]
            .sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            )
            .slice(0, 5);
    }, [orders]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold"> Latest Orders</h2>
                <button className="text-orange-600 font-medium hover:underline">
                    <Link
                        to={ROUTES.ADMIN.ORDER}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        View All
                    </Link>
                </button>
            </div>
            <div>
                {latestOrders.map(order => (
                    <div key={order._id} className="flex justify-between items-center py-2.5 hover:bg-gray-50 transition">
                        <div>
                            <h3 className="font-semibold">{order.items.length === 1 ? order.items[0].name : `${order.items[0].name}...`} </h3>
                            <p className="text-sm text-gray-500">{order.deliveryAddress.fullName}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">₹ {order.total_price}</p>
                            <StatusBadge status={order.status} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LatestOrders;