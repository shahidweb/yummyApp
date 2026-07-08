import {
  CubeIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Card, LatestOrders, OrderStatus, TopProducts } from "../../components/admin";


function Dashboard() {
  const cards = [
    {
      id: 1,
      title: "Total Products",
      value: 125,
      icon: CubeIcon,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: 2,
      title: "Total Orders",
      value: 38,
      icon: ShoppingBagIcon,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      title: "Revenue",
      value: "$25,430",
      icon: CurrencyDollarIcon,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 4,
      title: "Customers",
      value: 418,
      icon: UsersIcon,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800"> Dashboard </h1>
        <p className="mt-1 text-gray-500"> Welcome back 👋 Here's what's happening today. </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
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