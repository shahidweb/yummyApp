import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <div className="flex min-h-screen">
            {/* <Sidebar /> */}

            <div className="flex-1">
                {/* <Topbar /> */}

                <main className="p-6">
                    <Outlet />
                    <h1>hi admin</h1>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;