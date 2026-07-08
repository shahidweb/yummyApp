import { ClipboardDocumentListIcon, PlusCircleIcon, ShoppingBagIcon } from "@heroicons/react/16/solid";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../shared/constants/routePaths";

function SideBar() {

  const navs = [
    { id: 1, path: ROUTES.ADMIN.ADD_PRODUCT, value: "Add Items", icon: PlusCircleIcon },
    { id: 2, path: ROUTES.ADMIN.VIEW_PRODUCT, value: "List items", icon: ClipboardDocumentListIcon },
    { id: 3, path: ROUTES.ADMIN.ORDER, value: "Orders", icon: ShoppingBagIcon, }
  ]

  return (
    <ul className="w-64 h-[calc(100vh-64px)] border-r-2 border-gray-200 bg-white pt-8">
      {navs.map((nav) => {
        const Icon = nav.icon;
        return (
          <li key={nav.id} className="mb-4">
            <NavLink
              to={nav.path}
              className={({ isActive }) =>
                `flex items-center gap-3 w-full px-6 py-3 border border-r-0 rounded-l-md transition-all
            ${isActive
                  ? "bg-orange-50 border-orange-300 text-black text-lg font-medium "
                  : "border-gray-300 hover:bg-gray-50"
                }`
              }
            >
              <Icon className="w-6 h-6" />
              <span>{nav.value}</span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  )
}

export default SideBar
