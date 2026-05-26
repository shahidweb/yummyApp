import { useEffect, useState } from "react";
import greekSalad from "../../../assets/greeksalad.png";
import { apiService } from "../../../shared/services/genericService";

type IProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  category: string;
  image: string;
  qty: number;
};

function ProductItems() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await apiService.get<IProduct[]>("product");
      const res = response.map((item) => {
        return {
          ...item,
          image: greekSalad,
          qty: 0,
        };
      });
      setProducts(res);
    } catch (error) {
      console.warn(error);
    }
  };

  const onQtyHandler = (id: string, type: "inc" | "dec" = "inc") => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              qty:
                type === "inc" ? product.qty + 1 : Math.max(product.qty - 1, 0),
            }
          : product,
      ),
    );
  };

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <li
          key={product.id}
          className="rounded-xl shadow-lg overflow-hidden bg-white transition duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
        >
          <div className="relative">
            <img
              className="w-full h-60 object-cover"
              src={product.image}
              alt={product.name}
            />
            <div className="absolute right-4 bottom-4">
              {product.qty > 0 ? (
                <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-full shadow-md">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => onQtyHandler(product.id, "dec")}
                    className="w-8 h-8 rounded-full bg-red-100 text-red-600 text-xl cursor-pointer flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-medium">{product.qty}</span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => onQtyHandler(product.id)}
                    className="w-8 h-8 rounded-full bg-green-100 text-green-600 text-xl cursor-pointer flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  aria-label="Add product"
                  onClick={() => onQtyHandler(product.id)}
                  className="w-10 h-10 rounded-full bg-white shadow-md text-2xl cursor-pointer flex items-center justify-center"
                >
                  +
                </button>
              )}
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">{product.name}</h1>
              <div className="text-xl">
                <span className="text-orange-600">
                  {"*".repeat(product.rating)}
                </span>
                <span>{"*".repeat(5 - product.rating)}</span>
              </div>
            </div>
            <p className="text-gray-500 mt-3 leading-6 text-sm">
              {product.description}
            </p>
            <p className="text-orange-600 text-2xl font-semibold mt-4">
              ${product.price}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductItems;
