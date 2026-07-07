import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../shared/constants/routePaths'
import ProtectedRoute from './ProtectedRoute'
import UserLayout from '../layouts/UserLayout'
import Home from '../pages/user/Home'
import Menu from '../pages/user/Menu'
import Contact from '../pages/user/Contact'
import Cart from '../pages/user/Cart'
import Order from '../pages/user/Order'
import MyOrder from '../pages/user/MyOrder'
import AdminRoute from './AdminRoute'
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/admin/Dashboard'

function AppRoutes() {
    return (
        <Routes>

            {/* User Layout */}

            <Route element={<UserLayout />}>
                <Route path={ROUTES.USER.HOME} element={<Home />} />
                <Route path={ROUTES.USER.MENU} element={<Menu />} />
                <Route path={ROUTES.USER.CONTACT} element={<Contact />} />
                <Route path={ROUTES.USER.CART} element={<ProtectedRoute> <Cart /> </ProtectedRoute>} />
                <Route path={ROUTES.USER.ORDER} element={<ProtectedRoute> <Order /> </ProtectedRoute>} />
                <Route path={ROUTES.USER.MYORDER} element={<ProtectedRoute> <MyOrder /></ProtectedRoute>}
                />
            </Route>

            {/* Admin */}

            <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminRoute><AdminLayout /></AdminRoute>}>
                <Route index element={<Dashboard />} />
                {/* <Route path="products" element={<ProductList />} /> */}
            </Route>

        </Routes>
    )
}

export default AppRoutes
