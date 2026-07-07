import { Outlet } from "react-router-dom";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";

function UserLayout() {
    return (
        <>
            <Header />
            <main className="min-h-screen"> <Outlet /></main>
            <Footer />
        </>
    );
}

export default UserLayout;