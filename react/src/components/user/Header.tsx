import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Login from "../../layouts/Login";
import { ROUTES } from "../../shared/constants/routePaths";
import { useAppSelector } from "../../store/hooks";
import { selectCartItems } from "../../store/selectors/cartSelectors";
import DialogModal from "./sections/DialogModal";
import UserNavs from "./sections/UserNavs";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const cartItems = useAppSelector(selectCartItems)
  const [showMenu, setShowMenu] = useState(false);

  const navs = [
    { id: 1, name: "home", path: "/" },
    { id: 2, name: "menu", path: "/menu" },
    { id: 3, name: "mobile app", path: "/app" },
    { id: 4, name: "contact us", path: "/contact" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-5 px-5">
      <header className="flex items-center justify-between">
        {/* logo */}
        <Link to={ROUTES.USER.HOME}>
          <h1 className="cursor-pointer text-3xl font-bold text-orange-600">
            Yummy.
          </h1>
        </Link>
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
          <Link to={ROUTES.USER.CART} aria-label="Cart">
            <div className="flex">
              <ShoppingCartIcon className="w-6 h-6 hover:text-orange-500 cursor-pointer" />
              {cartItems.length >= 1 && <>
                <span className="text-red-800">*</span>
              </>}
            </div>
          </Link>
          {!user ? <button
            onClick={() => setIsOpen(true)}
            aria-label="Search"
            className="cursor-pointer rounded-3xl border px-4 py-1 hover:bg-orange-600 hover:text-white transition"
          >
            sign in
          </button> :
            <div className="relative group">
              <div className="flex">
                <p className="me-3 first-letter:uppercase">{user.name}</p>
                <Bars3Icon className="w-6 h-6 text-gray-700 cursor-pointer" onClick={() => setShowMenu((prev) => !prev)} />
              </div>
              {showMenu &&
                <div className="absolute right-0 top-8 z-50">
                  <UserNavs onHide={() => setShowMenu((prev) => !prev)} />
                </div>
              }
            </div>
          }
        </div>
      </header>
      <DialogModal isOpen={isOpen}>
        <Login onClose={() => setIsOpen(false)} />
      </DialogModal>
    </div>
  );
}

export default Header;
