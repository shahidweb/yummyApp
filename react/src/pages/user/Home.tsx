import Banner from "../../components/user/sections/Banner";
import Products from "../../components/user/sections/products/Products";

function Home() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <Banner />
      <Products/>
    </div>
  );
}

export default Home;
