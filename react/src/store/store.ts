import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice';
import productReducer from "./slices/productSlice";
import OrderReducer from "./slices/orderSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productReducer,
        myOrders: OrderReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch