import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import greekSalad from "../../assets/greeksalad.png";
import { apiService, type APIResponse } from "../../services/genericService";
import type { RootState } from "../store";
import { ENDPOINT } from "../../shared/constants/api_urls";

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
            const response = await apiService.get<APIResponse<ProductType[]>>(ENDPOINT.GET_ALL_PRODUCTS);
            if (response.success && response.data) {
                return response.data.map((item) => ({ ...item, image: greekSalad }));
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
    reducers: {},
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



export default productSlice.reducer