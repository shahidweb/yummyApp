function Footer() {
  return (
    <div className="bg-gray-900 fixed w-full bottom-0">
      <footer className="max-w-7xl mx-auto py-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          <div>
            <h1 className="cursor-pointer text-3xl font-bold text-orange-600">
              Yummy
            </h1>
            <p className="text-gray-300 leading-7 max-w-md">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis, in nemo adipisci quae vero fugit deserunt facilis
              pariatur ad voluptate explicabo est rem iusto ullam consectetur
              natus eligendi quaerat qui. Sunt laboriosam laudantium ex,
              praesentium corrupti earum, possimus ea.
            </p>
            <div className="logos flex items-center justify-start text-white">
              <div>Facebook</div>
              <div>Twitter</div>
              <div>In</div>
            </div>
          </div>
          <div>
            <h1 className="mb-5 cursor-pointer text-xl font-bold text-gray-300">
              COMPANY
            </h1>
            <nav>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-orange-500 cursor-pointer">Home</li>
                <li className="hover:text-orange-500 cursor-pointer">
                  About Us
                </li>
                <li className="hover:text-orange-500 cursor-pointer">
                  Delivery
                </li>
                <li className="hover:text-orange-500 cursor-pointer">
                  Privacy Policy
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <h1 className="cursor-pointer text-xl font-bold text-gray-300 mb-5">
              GET IN TOUCH
            </h1>
            <div className="space-y-3 text-gray-400">
              <p>+1-212-4560-7890</p>
              <p>contact@yummy.dev</p>
            </div>
          </div>
        </div>
        <hr className="border-gray-700 my-10" />
        <p className="text-center text-gray-500 text-sm">
          Copyright {new Date().getFullYear()} @Yummy.com - ALl Right Reserved.
        </p>
      </footer>
    </div>
  );
}

export default Footer;
