import { Route, Routes } from 'react-router-dom'
import Cart from '../Pages/Cart'
import Home from '../Pages/Home'
import { ROUTES } from './routePaths'
import Order from '../Pages/Order'
import MyOrder from '../Pages/MyOrder'
import Menu from '../Pages/Menu'
import Contact from '../Pages/Contact'

function AppRoutes() {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route path={ROUTES.ORDER} element={<Order />} />
            <Route path={ROUTES.MYORDER} element={<MyOrder />} />
            <Route path={ROUTES.MENU} element={<Menu />} />
            <Route path={ROUTES.CONTACT} element={<Contact />} />
        </Routes>
    )
}

export default AppRoutes
