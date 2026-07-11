import { ArchiveBoxIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { apiService, type APIResponse } from "../../services/genericService";
import { ENDPOINT } from "../../shared/constants/api_urls";
import { ORDER_STATUS } from "../../shared/constants/order";
import type { TOrderType } from "../../shared/types/orders";
import { formatCurrency } from "../../shared/utils/cartFn";
import { notify } from "../../shared/utils/toast";

function Orders() {
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

  const onChangeStatus = (val: string) => {
    console.log(val)
  }


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
                <select onChange={(event) => onChangeStatus(event?.target.value)}
                  className="outline-0 border-0 bg-red-100 hover:bg-red-100 px-6 py-3 rounded text-gray-700 cursor-pointer transition">
                  <option className="cursor-pointer" selected>{ORDER_STATUS.PENDING}</option>
                  <option className="cursor-pointer" value={ORDER_STATUS.PREPARING}>{ORDER_STATUS.PREPARING}</option>
                  <option className="cursor-pointer" value={ORDER_STATUS.OUT_OF_DELIVERY}>{ORDER_STATUS.OUT_OF_DELIVERY}</option>
                  <option className="cursor-pointer" value={ORDER_STATUS.DELIVERED}>{ORDER_STATUS.DELIVERED}</option>
                  <option className="cursor-pointer" value={ORDER_STATUS.CANCELLED}>{ORDER_STATUS.CANCELLED}</option>
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
