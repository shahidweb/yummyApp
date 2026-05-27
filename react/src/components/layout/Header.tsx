import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DialogModel from "../UI/DialogModel";
import Login from "./Login";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const navs = [
    { id: 1, name: "home", path: "/" },
    { id: 2, name: "menu", path: "/menu" },
    { id: 3, name: "mobile app", path: "/app" },
    { id: 4, name: "contact us", path: "/contact-us" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-5 px-5">
      <header className="flex items-center justify-between">
        {/* logo */}
        <h1 className="cursor-pointer text-3xl font-bold text-orange-600">
          Yummy.
        </h1>
        {/* navigations */}
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-6">
            {navs.map((nav) => (
              <li key={nav.id}>
                <NavLink
                  to={nav.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-600 underline font-bold"
                      : "hover:text-orange-600"
                  }
                >
                  {nav.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        {/* Actions */}
        <div className="flex items-center gap-6">
          <button aria-label="Search">
            <MagnifyingGlassIcon className="w-6 h-6 hover:text-orange-500 cursor-pointer" />
          </button>
          <button aria-label="Cart">
            <ShoppingCartIcon className="w-6 h-6 hover:text-orange-500 cursor-pointer" />
            {cartItems.length >= 1 && <>
              <span className="text-red-800">*</span>
            </>}
          </button>
          {!user ? <button
            onClick={() => setIsOpen(true)}
            aria-label="Search"
            className="cursor-pointer rounded-3xl border px-4 py-1 hover:bg-orange-600 hover:text-white transition"
          >
            sign in
          </button> :
            <UserIcon className="w-6 h-6 text-gray-700 cursor-pointer" />
          }
        </div>
      </header>
      <DialogModel isOpen={isOpen}>
        <Login onClose={() => setIsOpen(false)} />
      </DialogModel>
    </div>
  );
}

export default Header;
