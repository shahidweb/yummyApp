import { Route, Routes } from 'react-router-dom'
import { AdminLayout, UserLayout } from '../layouts'
import { AddProduct, Dashboard, Orders, Products } from '../pages/admin'
import NotFound from '../pages/common/NotFound'
import UnderConstruction from '../pages/common/UnderConstruction'
import { Cart, Home, Menu, MyOrder, Order } from '../pages/user'
import { ROUTES } from '../shared/constants/routePaths'
import AdminRoute from './AdminRoute'
import ProtectedRoute from './ProtectedRoute'

function AppRoutes() {
    return (
        <Routes>

            {/* User Layout */}

            <Route element={<UserLayout />}>
                <Route path={ROUTES.USER.HOME} element={<Home />} />
                <Route path={ROUTES.USER.MENU} element={<Menu />} />
                <Route path={ROUTES.USER.APP} element={<UnderConstruction />} />
                <Route path={ROUTES.USER.CONTACT} element={<UnderConstruction />} />
                <Route path={ROUTES.USER.CART} element={<ProtectedRoute> <Cart /> </ProtectedRoute>} />
                <Route path={ROUTES.USER.ORDER} element={<ProtectedRoute> <Order /> </ProtectedRoute>} />
                <Route path={ROUTES.USER.MYORDER} element={<ProtectedRoute> <MyOrder /></ProtectedRoute>} />
                <Route path={ROUTES.USER.PROFILE} element={<ProtectedRoute> <UnderConstruction /></ProtectedRoute>}
                />
                <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin */}

            <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminRoute><AdminLayout /></AdminRoute>}>
                <Route index element={<Dashboard />} />
                <Route path={`${ROUTES.ADMIN.ADD_PRODUCT}/:id?`} element={<AddProduct />} />
                <Route path={ROUTES.ADMIN.VIEW_PRODUCT} element={<Products />} />
                <Route path={ROUTES.ADMIN.ORDER} element={<Orders />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
