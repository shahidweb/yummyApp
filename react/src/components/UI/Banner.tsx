import BannerImage from "../../assets/banner.png";

function Banner() {
  return (
    <div
      className="bg-black/20 w-full min-h-125 rounded-4xl flex items-center px-10 md:px-16 overflow-hidden"
      style={{
        backgroundImage: `url(${BannerImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full md:w-2/5 text-white">
        <h1 className="text-4xl font-bold md:text-6x1 leading-tight">
          Order your favourite food here
        </h1>
        <p className="mt-4 text-sm md:text-base leading-7 text-gray-100">
          Choose from a diverse menu featuring a delectable array of dished
          crafted wit the finest ingredeints and culinary expertiese. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time
        </p>
        <button className="mt-8 bg-white text-gray-800 px-8 py-3 rounded-full font-medium hover:bg-orange-100 transition cursor-pointer">
          View Menu
        </button>
      </div>
    </div>
  );
}

export default Banner;
