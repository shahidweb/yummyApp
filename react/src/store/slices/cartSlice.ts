import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartItems = {
    _id: string;
    qty: number;
}

type CartState = {
    carts: CartItems[],
}

const initialState: CartState = { carts: [] }

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: () => { },
        removeFromCart: (state, action: PayloadAction<CartItems>) => {
            state.carts = state.carts.filter((item => item._id !== action.payload._id))
        },
        increaseQty: (state, action: PayloadAction<CartItems>) => {
            const item = state.carts.find(item => item._id == action.payload._id)
            if (item) item.qty += 1;
            else state.carts.push({ _id: action.payload._id, qty: 1 })
        },
        decreaseQty: (state, action: PayloadAction<CartItems>) => {
            const item = state.carts.find(item => item._id == action.payload._id)
            if (item && item.qty > 0) item.qty -= 1;
            state.carts = state.carts.filter((item => item.qty >= 1))
        },
        clearCart: () => initialState
    }
})


export const { addToCart, clearCart, decreaseQty, increaseQty, removeFromCart } = cartSlice.actions

export default cartSlice.reducer