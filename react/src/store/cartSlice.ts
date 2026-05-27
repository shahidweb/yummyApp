import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CartItems = {
    _id: string;
    qty: number;
}

type CartState = {
    items: CartItems[],
}

const initialState: CartState = { items: [] }

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: () => { },
        removeFromCart: (state, action: PayloadAction<CartItems>) => {
            state.items = state.items.filter((item => item._id !== action.payload._id))
        },
        increaseQty: (state, action: PayloadAction<CartItems>) => {
            const item = state.items.find(item => item._id == action.payload._id)
            if (item) item.qty += 1;
            else state.items.push({ _id: action.payload._id, qty: 1 })
        },
        decreaseQty: (state, action: PayloadAction<CartItems>) => {
            const item = state.items.find(item => item._id == action.payload._id)
            if (item && item.qty > 0) item.qty -= 1;
            state.items = state.items.filter((item => item.qty >= 1))
        },
        clearCart: () => initialState
    }
})


export const { addToCart, clearCart, decreaseQty, increaseQty, removeFromCart } = cartSlice.actions

export default cartSlice.reducer