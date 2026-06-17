import { Route, Routes } from 'react-router-dom'
import Cart from '../Pages/Cart'
import Home from '../Pages/Home'
import { ROUTES } from './routePaths'
import Order from '../Pages/Order'
import MyOrder from '../Pages/myOrder'

function AppRoutes() {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route path={ROUTES.ORDER} element={<Order />} />
            <Route path={ROUTES.MYORDER} element={<MyOrder />} />
        </Routes>
    )
}

export default AppRoutes
