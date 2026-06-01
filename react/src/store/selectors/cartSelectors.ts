import { type RootState } from "../store";

export const selectCartItems = (state: RootState) => state.cart.carts;