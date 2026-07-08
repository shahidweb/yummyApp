import { Outlet } from "react-router-dom";
import { SideBar, TopBar } from "../components/admin";

function AdminLayout() {
    return (
        <div>
            <TopBar />
            <div className="flex">
                <SideBar />
                <main className="p-6">
                    <Outlet />
                    <h1>hi admin</h1>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;