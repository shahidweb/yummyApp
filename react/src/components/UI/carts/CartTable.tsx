import React from "react"
import { formatCurrency } from "../../../shared/utils/cartFn"
import type { ProductType } from "../../../store/slices/productSlice";

interface CartTableProps {
    activeCartItems: ProductType[];
    onDeleteItem: (id: string) => void;
}

function CartTable({ activeCartItems, onDeleteItem }: CartTableProps) {

    const headers = ['Items', "Title", "Price", "Quantity", "Total", "Remove"]

    return (
        <table className="w-full">
            <thead>
                <tr className="border-b border-gray-300 text-gray-500">
                    {headers.map((header) =>
                        <th key={header} className="text-left py-4">{header}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {activeCartItems.map((item) => (
                    <tr className="border-b border-gray-200" key={item._id}>
                        <td className="py-4">
                            <img className="w-14 h-14 object-cover rounded" src={item.image} alt={item.name} />
                        </td>
                        <td className="font-medium">{item.name}</td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>{item.qty}</td>
                        <td>{formatCurrency(item.price * (item.qty ?? 1))}</td>
                        <td>
                            <button
                                onClick={() => onDeleteItem(item._id)}
                                aria-label={`Remove ${item.name}`}
                                className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                            >
                                ×
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table >
    )
}

export default React.memo(CartTable)
