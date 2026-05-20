import Banner from "../components/UI/Banner";
import Products from "../components/UI/products/Products";

function Home() {
  return (
    <div className="max-w-7xl mx-auto py-10">
      <Banner />
      <Products/>
    </div>
  );
}

export default Home;
