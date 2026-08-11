import { ArchiveBoxIcon } from "@heroicons/react/16/solid";
import { useEffect } from "react";
import { apiService, type APIResponse } from "../../services/genericService";
import { ENDPOINT } from "../../shared/constants/api_urls";
import { ORDER_STATUS } from "../../shared/constants/order";
import type { TOrderStatus, TOrderType } from "../../shared/types/orders";
import { formatCurrency } from "../../shared/utils/cartFn";
import { notify } from "../../shared/utils/toast";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { allAdminOrders, updateState } from "../../store/slices/orderSlice";

function Orders() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.myOrders.data);

  useEffect(() => {
    dispatch(allAdminOrders());
  }, [])


  const onChangeStatus = async (id: string, statusId: string) => {
    try {
      const response = await apiService.put<APIResponse<TOrderType[]>, TOrderStatus>(ENDPOINT.ORDER_STATUS, id, { status: Number(statusId) });
      if (response.success && Array.isArray(response.data)) {
        dispatch(updateState({ id, status: Number(statusId) }))
        notify.success(response.message)
      }
    } catch (error) {
      const err = error as Error;
      notify.error(err.message)
    }
  }

  const currentStatus = (status: number) => ORDER_STATUS.find((s) => s.value === status) ?? ORDER_STATUS[0];



  return (
    <div className="max-w-7xl py-10 px-5">
      <div className="overflow-x-auto">
        <h1 className="text-2xl font-bold mb-5">Order Page</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border-2 border-gray-300 px-5 py-4 flex items-start justify-between"
            >
              <div className="flex items-start gap-5 w-2/5 ">
                <ArchiveBoxIcon className="w-10 h-10 text-orange-500" />
                <div className="">
                  <p className="text-sm text-gray-700 pb-7">
                    {order.items.map((item, index) => (
                      <span key={item.name} className="font-semibold">
                        {item.name} x {item.quantity}
                        {index !== order.items.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p className="font-semibold uppercase"> {order.deliveryAddress.fullName}</p>
                    <p>{order.deliveryAddress.street}</p>
                    <p>
                      {order.deliveryAddress.city}, {order.deliveryAddress.state} -{" "} {order.deliveryAddress.zipCode}
                    </p>
                    <p>{order.deliveryAddress.phone}</p>
                  </div>
                </div>
              </div>

              <div className="font-medium w-36"> {formatCurrency(order.total_price)} </div>
              <div className="text-gray-700 w-36"> Items: {order.items.length} </div>

              {/* Track Button */}
              <div>
                <select name="status" disabled={order.status > 3} value={order.status} onChange={(event) => onChangeStatus(order._id, event?.target.value)}
                  className={`
                    ${currentStatus(order.status).bgColor}                     
                    ${order.status > 3
                      ? "cursor-not-allowed opacity-60"
                      : `hover:${currentStatus(order.status).textColor} cursor-pointer`
                    }
                      outline-0 border-0 px-6 py-3 rounded text-gray-700 transition`}>
                  {ORDER_STATUS.map((status) => (
                    <option key={status.value} disabled={status.value < order.status} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders
