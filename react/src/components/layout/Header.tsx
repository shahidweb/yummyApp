import { NavLink } from "react-router-dom";
import CartIcon from "../../shared/utils/icons/Cart";
import SearchIcon from "../../shared/utils/icons/Search";
import Login from "./Login";
import DialogModel from "../UI/DialogModel";
import { useEffect, useState } from "react";
import { fetchUser } from "../../shared/services/loginService";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navs = [
    { id: 1, name: "home", path: "/" },
    { id: 2, name: "menu", path: "/menu" },
    { id: 3, name: "mobile app", path: "/app" },
    { id: 4, name: "contact us", path: "/contact-us" },
  ];

  useEffect(() => {
    fetchUser();
  }, []);

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
            <SearchIcon />
          </button>
          <button aria-label="Cart">
            <CartIcon />
          </button>
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Search"
            className="cursor-pointer rounded-3xl border px-4 py-1 hover:bg-orange-600 hover:text-white transition"
          >
            sign in
          </button>
        </div>
      </header>
      <DialogModel isOpen={isOpen}>
        <Login onClose={() => setIsOpen(false)} />
      </DialogModel>
    </div>
  );
}

export default Header;
