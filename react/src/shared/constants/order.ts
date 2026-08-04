export const ORDER_STATUS_LABEL = {
    PENDING: "Pending",
    PREPARING: "Preparing",
    OUT_OF_DELIVERY: "Out of Delivery",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
} as const;

export const ORDER_STATUS = [
    { value: 1, label: ORDER_STATUS_LABEL.PENDING, textColor: "text-yellow-700", bgColor: "bg-yellow-100" },
    { value: 2, label: ORDER_STATUS_LABEL.PREPARING, textColor: "text-blue-700", bgColor: "bg-blue-100" },
    { value: 3, label: ORDER_STATUS_LABEL.OUT_OF_DELIVERY, textColor: "text-purple-700", bgColor: "bg-purple-100" },
    { value: 4, label: ORDER_STATUS_LABEL.DELIVERED, textColor: "text-green-700", bgColor: "bg-green-100" },
    { value: 5, label: ORDER_STATUS_LABEL.CANCELLED, textColor: "text-red-700", bgColor: "bg-red-100" },
] as const;



export const PRODUCT_CATEGORIES = ['Salad', "Rolls", "Deserts", "Sandwich", "Cake", "Pure Veg", "Pasta", "Noodles"]