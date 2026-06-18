import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { notify } from "../../../shared/utils/toast";
import { errorMessages } from "../../../shared/utils/toastMessage";
import { scrollToTop } from "../../../shared/utils/windowFn";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectProductsWithCart } from "../../../store/selectors/combinedSelectors";
import { decreaseQty, increaseQty } from "../../../store/slices/cartSlice";
import { fetchProducts, type ProductType } from "../../../store/slices/productSlice";


function ProductItems() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProductsWithCart);
  const { isAuthenticated } = useAuth()


  useEffect(() => {
    dispatch(fetchProducts())
  }, []);

  const handleQuantityChange = (product: ProductType, isIncrease = false) => {
    if (!isAuthenticated) {
      scrollToTop();
      notify.error(errorMessages.isAuthFailed);
      return;
    }
    const payload = { _id: product._id, qty: product.qty ?? 0 }
    dispatch(isIncrease ? increaseQty(payload) : decreaseQty(payload))
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <li
          key={product._id}
          className="rounded-xl shadow-lg overflow-hidden bg-white transition duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
        >
          <div className="relative">
            <img
              className="w-full h-60 object-cover"
              src={product.image}
              alt={product.name}
            />
            <div className="absolute right-4 bottom-4">
              {product.qty !== undefined && product.qty > 0 ? (
                <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-full shadow-md">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => handleQuantityChange(product)}
                    className="w-8 h-8 rounded-full bg-red-100 text-red-600 text-xl cursor-pointer flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-medium">{product.qty}</span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => handleQuantityChange(product, true)}
                    className="w-8 h-8 rounded-full bg-green-100 text-green-600 text-xl cursor-pointer flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  aria-label="Add product"
                  onClick={() => handleQuantityChange(product, true)}
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
      ))
      }
    </ul >
  );
}

export default ProductItems;
