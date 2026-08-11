import { ArrowPathIcon, CheckCircleIcon, ClockIcon, FireIcon, XCircleIcon } from "@heroicons/react/16/solid";

export const ORDER_STATUS_LABEL = {
    PENDING: "Pending",
    PREPARING: "Preparing",
    OUT_OF_DELIVERY: "Out of Delivery",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
} as const;

export const ORDER_STATUS = [
    { value: 1, icon: ClockIcon, label: ORDER_STATUS_LABEL.PENDING, textColor: "text-yellow-700", bgColor: "bg-yellow-100", total:0 },
    { value: 2, icon: FireIcon, label: ORDER_STATUS_LABEL.PREPARING, textColor: "text-blue-700", bgColor: "bg-blue-100", total:0 },
    { value: 3, icon: ArrowPathIcon, label: ORDER_STATUS_LABEL.OUT_OF_DELIVERY, textColor: "text-purple-700", bgColor: "bg-purple-100", total:0 },
    { value: 4, icon: CheckCircleIcon, label: ORDER_STATUS_LABEL.DELIVERED, textColor: "text-green-700", bgColor: "bg-green-100", total:0 },
    { value: 5, icon: XCircleIcon, label: ORDER_STATUS_LABEL.CANCELLED, textColor: "text-red-700", bgColor: "bg-red-100", total:0 },
] as const;



export const PRODUCT_CATEGORIES = ['Salad', "Rolls", "Deserts", "Sandwich", "Cake", "Pure Veg", "Pasta", "Noodles"]