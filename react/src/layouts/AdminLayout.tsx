import { Outlet } from "react-router-dom";
import { SideBar, TopBar } from "../components/admin";

function AdminLayout() {
    return (
        <div>
            <TopBar />
            <div className="flex">
                <SideBar />
                <main className="w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;