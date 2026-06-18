import { Link } from "react-router-dom";
import { ROUTES } from "../../router/routePaths";
import { useAuth } from "../../context/AuthContext";

function UserNavs({ onHide }: any) {
    const { logout } = useAuth();
    return (
        <ul className="min-w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 text-end">
            <li onClick={onHide}>
                <Link to="/profile" className="block px-4 py-2 hover:bg-orange-50">Profile</Link>
            </li>
            <li onClick={onHide}>
                <Link to={ROUTES.MYORDER} className="block px-4 py-2 hover:bg-orange-50">
                    My Orders
                </Link>
            </li>
            <li onClick={() => { onHide(); logout() }} className="px-4 py-2 cursor-pointer hover:bg-orange-50text-red-500">
                Logout
            </li>
        </ul >
    );
}

export default UserNavs;