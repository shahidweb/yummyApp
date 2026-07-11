import { PencilIcon } from "@heroicons/react/16/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectProductsWithCart } from "../../store/selectors/combinedSelectors";
import { fetchProducts } from "../../store/slices/productSlice";

function Products() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProductsWithCart);

  useEffect(() => {
    dispatch(fetchProducts())
  }, []);


  return (
    <div className="max-w-7xl py-10 px-5">
      <div className="overflow-x-auto">
        <h1 className="text-2xl font-bold mb-5">All Product List</h1>
        <div className="space-y-4">
          <table className="w-full border border-gray-200 border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-4 py-3"><img src={product.image} alt={product.name} className="w-14 h-14 rounded object-cover" /></td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">${product.price}</td>
                  <td className="px-4 py-3 w-5">
                    <div className="flex justify-center gap-2">
                      <button className="cursor-pointer px-3 py-1 rounded text-blue-500">
                        <PencilIcon className="w-5 h-5" />
                      </button>

                      <button className="cursor-pointer px-3 py-1 rounded text-red-500">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Products
