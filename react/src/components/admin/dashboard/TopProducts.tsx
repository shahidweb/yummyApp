import { useEffect, useState } from "react";
import defaultImage from "../../../assets/greeksalad.png";
import { apiService, type APIResponse } from "../../../services/genericService";
import type { TopSellingProduct } from "../../../shared/types/orders";
import { ENDPOINT } from "../../../shared/constants/api_urls";

function TopProducts() {
    const [products, setProducts] = useState<TopSellingProduct[]>([]);

    useEffect(() => {
        fetchTopProducts();
    }, [])


    const fetchTopProducts = async () => {
        const response = await apiService.get<APIResponse<TopSellingProduct[]>>(ENDPOINT.TOP_SELLING_PRODUCTS);
        if (response.success && response.data) {
            setProducts(response.data)
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold"> Top Selling Products</h2>
                <button className="text-orange-600 font-medium hover:underline">View All</button>
            </div>
            <div>
                {products.map(product => (
                    <div key={product._id} className="flex justify-between items-center py-2.5 hover:bg-gray-50 transition">
                        <div className="flex items-center gap-4">
                            <img src={product.image ? product.image : defaultImage} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                                <h3 className="font-semibold">{product.name}</h3>
                                <p className="text-sm text-gray-500">₹{product.price}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">{product.orders}</p>
                            <p className="text-xs text-gray-500"> Orders </p>
                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default TopProducts;