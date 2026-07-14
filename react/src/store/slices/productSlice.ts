import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import greekSalad from "../../assets/greeksalad.png";
import { apiService, type APIResponse } from "../../services/genericService";
import { ENDPOINT } from "../../shared/constants/api_urls";
import type { RootState } from "../store";

export type ProductType = {
    _id: string;
    name: string;
    price: number;
    description: string;
    rating: number;
    category: string;
    image: string;
    qty?: number;
}

type ProductState = {
    products: ProductType[];
    loading: boolean,
    error: string | null,
    fetched: boolean;
}

export const fetchProducts = createAsyncThunk<ProductType[], void, { rejectValue: string }>(
    "products/fetchProducts", async (_, thunkAPI) => {
        try {
            const response = await apiService.get<APIResponse<ProductType[]>>(ENDPOINT.PRODUCTS);
            if (response.success && response.data) {
                return response.data.map((item) => ({ ...item, image: item.image ? item.image : greekSalad }));
            }
            return [];
        } catch (error) {
            const err = error as Error;
            return thunkAPI.rejectWithValue(err.message)
        }
    }, {
    condition: (_, { getState }) => {
        const state = getState() as RootState;
        return !state.products.fetched;
    }
})

const initialState: ProductState = { products: [], loading: false, error: null, fetched: false }

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ProductType>) => {
            state.products = [...state.products, action.payload]
        },
        updateProduct: (state, action: PayloadAction<ProductType>) => {
            state.products = state.products.map(product => product._id === action.payload._id ? { ...product, ...action.payload } : product)
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(item => item._id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.fetched = false;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
                state.loading = false;
                state.products = action.payload
                state.fetched = true;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.fetched = false;
                state.products = [];
                state.error = action.payload ?? action.error.message ?? "Something went wrong";
            })
    }
})

export const { addProduct, updateProduct, removeProduct } = productSlice.actions

export default productSlice.reducer