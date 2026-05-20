import ProductFilter from './ProductFilter'
import ProductItems from './ProductItems'

function Products() {
  return (
    <div>
      <ProductFilter/>
      <hr className='my-5 text-gray-300 border'/>
      <ProductItems/>
    </div>
  )
}

export default Products
