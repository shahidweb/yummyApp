import {
  CubeIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { Card, LatestOrders, OrderStatus, TopProducts } from "../../components/admin";
import { apiService, type APIResponse } from "../../services/genericService";
import { notify } from "../../shared/utils/toast";
import { ENDPOINT } from "../../shared/constants/api_urls";


function Dashboard() {

  const [totalCounts, setTotalCounts] = useState(null);

  const cards = [
    {
      id: 1,
      label: "products",
      title: "Total Products",
      value: 0,
      icon: CubeIcon,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: 2,
      label: "orders",
      title: "Total Orders",
      value: 0,
      icon: ShoppingBagIcon,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      title: "Revenue",
      label: "revenue",
      value: 0,
      icon: CurrencyDollarIcon,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 4,
      label: "customers",
      title: "Customers",
      value: 0,
      icon: UsersIcon,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  useEffect(() => {
    fetchDashbardCounts();
  }, [])

  const latestTotalCounts = useMemo(() => {
    return cards.map((card => ({ ...card, value: totalCounts ? totalCounts[card.label] : 0 })))
  }, [totalCounts])

  const fetchDashbardCounts = async () => {
    try {
      const response = await apiService.get<APIResponse<any>>(ENDPOINT.ADMIN_DASHBOARD_SUMMARY);
      if (response.success && response.data) {
        setTotalCounts(response.data)
        notify.success(response.message)
      }
    } catch (error) {
      const err = error as Error;
      notify.error(err.message)
    }

  }

  return (
    <section className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800"> Dashboard </h1>
        <p className="mt-1 text-gray-500"> Welcome back 👋 Here's what's happening today. </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {latestTotalCounts.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <LatestOrders />
        <TopProducts />
        <OrderStatus />
      </div>
    </section>
  );
}

export default Dashboard;