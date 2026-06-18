import { Route, Routes } from 'react-router-dom'
import Cart from '../Pages/Cart'
import Home from '../Pages/Home'
import { ROUTES } from './routePaths'
import Order from '../Pages/Order'
import MyOrder from '../Pages/MyOrder'
import Menu from '../Pages/Menu'
import Contact from '../Pages/Contact'
import ProtectedRoute from './ProtectedRoute'

function AppRoutes() {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.MENU} element={<Menu />} />
            <Route path={ROUTES.CONTACT} element={<Contact />} />
            <Route path={ROUTES.CART} element={<ProtectedRoute> <Cart /></ProtectedRoute>} />
            <Route path={ROUTES.ORDER} element={<ProtectedRoute> <Order /></ProtectedRoute>} />
            <Route path={ROUTES.MYORDER} element={<ProtectedRoute> <MyOrder /></ProtectedRoute>} />
        </Routes>
    )
}

export default AppRoutes
