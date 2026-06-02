import { Route, Routes } from 'react-router-dom'
import Cart from '../Pages/Cart'
import Home from '../Pages/Home'
import { ROUTES } from './routePaths'

function AppRoutes() {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.CART} element={<Cart />} />
        </Routes>
    )
}

export default AppRoutes
