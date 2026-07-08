import greekSalad from "../../../assets/greeksalad.png";

function TopProducts() {

    const products = [
        {
            id: 1,
            name: "Greek Salad",
            orders: 120,
            price: 12,
            image: greekSalad
        },
        {
            id: 2,
            name: "Veg Burger",
            orders: 95,
            price: 10,
            image: greekSalad
        },
        {
            id: 3,
            name: "Pizza",
            orders: 82,
            price: 18,
            image: greekSalad
        },
        {
            id: 4,
            name: "Pasta",
            orders: 76,
            price: 15,
            image: greekSalad
        }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold"> Top Selling Products</h2>
                <button className="text-orange-600 font-medium hover:underline">View All</button>
            </div>
            <div>
                {products.map(product => (
                    <div key={product.id} className="flex justify-between items-center py-2.5 hover:bg-gray-50 transition">
                        <div className="flex items-center gap-4">
                            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
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