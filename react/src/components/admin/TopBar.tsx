import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../shared/constants/routePaths";
import profile from '../../assets/photo.jpg'

function TopBar() {
  const { logout } = useAuth();
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-2 px-2">
        <div className="flex items-center justify-between">
          {/* logo */}
          <Link to={ROUTES.ADMIN.DASHBOARD}>
            <h1 className="cursor-pointer text-3xl font-bold text-orange-600">
              Yummy.
            </h1>
          </Link>
          {/* Actions */}
          <div className="flex items-center justify-between">
            <img src={profile} alt="profile" className="rounded-full w-9 h-9 mr-1 border-2 border-red-500" />
            <li onClick={() => { logout() }} className="inline-block px-4 py-2 cursor-pointer hover:bg-orange-50 text-red-500">
              <ArrowRightEndOnRectangleIcon width={30} />
            </li>
          </div>
        </div >
      </div >
    </div>
  )
}

export default TopBar
