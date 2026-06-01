import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import greekSalad from "../../assets/greeksalad.png";
import { apiService } from "../../shared/services/genericService";

export type ProductType = {
    _id: string;
    name: string;
    price: number;
    description: string;
    rating: number;
    category: string;
    image: string;
    qty?:number;
}

type ProductState = {
    products: ProductType[];
    loading: boolean,
    error: string | null,
}

export const fetchProducts = createAsyncThunk<ProductType[], void, { rejectValue: string }>(
    "products/fetchProducts", async (_, thunkAPI) => {
        try {
            const response = await apiService.get<ProductType[]>("product");
            return response.map((item) => ({ ...item, image: greekSalad }));
        } catch (error) {
            const err = error as Error;
            return thunkAPI.rejectWithValue(err.message)
        }
    })

const initialState: ProductState = { products: [], loading: false, error: null }

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
                state.loading = false;
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.products = [];
                state.error = action.payload ?? action.error.message ?? "Something went wrong";
            })
    }
})



export default productSlice.reducer