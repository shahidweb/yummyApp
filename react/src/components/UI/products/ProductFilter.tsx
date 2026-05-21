import { useState } from "react";
import cake from "../../../assets/cake.png";
import deserts from "../../../assets/deserts.png";
import noodle from "../../../assets/noodles.png";
import pasta from "../../../assets/pasta.png";
import pureveg from "../../../assets/pureveg.png";
import roll from "../../../assets/roll.png";
import salad from "../../../assets/salad.png";
import sandwich from "../../../assets/sandwich.png";

function ProductFilter() {
  const [selectedItem, setSelectedItem] = useState(0);
  const filters = [
    { id: 1, name: "Salad", img: `${salad}` },
    { id: 2, name: "Rolls", img: `${roll}` },
    { id: 3, name: "Deserts", img: `${deserts}` },
    { id: 4, name: "Sandwich", img: `${sandwich}` },
    { id: 5, name: "Cake", img: `${cake}` },
    { id: 6, name: "Pure Veg", img: `${pureveg}` },
    { id: 7, name: "Pasta", img: `${pasta}` },
    { id: 8, name: "Noodles", img: `${noodle}` },
  ];

  const selectFilterId = (id: number) => {
    setSelectedItem(selectedItem !== id ? id : 0);
  };
  return (
    <div>
      <h1 className="font-bold text-gray-900 text-3xl mt-5">Explore or menu</h1>
      <p className="text-gray-900 lg:w-3/5 mt-3">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elavate your dining experience,
        one delicious meal at a time
      </p>
      <ul className="flex items-center gap-6 mt-5 overflow-x-auto scrollbar-hide">
        {filters.map((item) => (
          <li
            key={item.id}
            className="text-center cursor-pointer"
            onClick={() => selectFilterId(item.id)}
          >
            <img
              className={`w-20 h-20 md:w-full md:h-full object-cover mb-3 rounded-full hover:border-orange-600 hover:border-3 ${selectedItem === item.id ? "border-3 border-orange-600" : ""}`}
              src={item.img}
              alt={item.name}
              width="100px"
            />
            <span className="text-gray-600">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductFilter;
