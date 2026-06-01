import { createSelector } from "@reduxjs/toolkit";
import { selectProducts } from "./productSelectors";
import { selectCartItems } from "./cartSelectors";
import type { ProductType } from "../slices/productSlice";
import type { CartItems } from "../slices/cartSlice";


export const selectProductsWithCart = createSelector(
    [selectProducts, selectCartItems], (products, carts) =>
    products.map((product: ProductType) => ({
        ...product,
        qty:
            carts.find(
                (cart: CartItems) => cart._id === product._id
            )?.qty ?? 0,
    }))
)