import ProductFilter from "./ProductFilter";
import ProductItems from "./ProductItems";

function Products() {
  return (
    <div>
      <ProductFilter />
      <hr className="my-5 text-gray-300 border" />
      <h1 className="text-2xl font-bold mb-5">Top dishes near you</h1>
      <ProductItems />
    </div>
  );
}

export default Products;
