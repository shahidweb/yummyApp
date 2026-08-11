import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { apiService, type APIResponse } from "../../services/genericService";
import { ENDPOINT } from "../../shared/constants/api_urls";
import type { TOrderType } from "../../shared/types/orders";
import type { RootState } from "../store";

type OrderState = {
    data: TOrderType[],
    loading: boolean,
    error: string | null,
    fetched: boolean;
}


const initialState: OrderState = { data: [], loading: false, error: '', fetched: false }


export const allAdminOrders = createAsyncThunk<TOrderType[], void, { rejectValue: string }>(
    'ENDPOINT.ORDER_ORDERS', async (_, thunkAPI) => {
        try {
            const response = await apiService.get<APIResponse<TOrderType[]>>(ENDPOINT.ORDER_ORDERS);
            if (response.success && response.data) {
                return response.data;
            }
            return [];
        } catch (error) {
            const err = error as Error;
            return thunkAPI.rejectWithValue(err.message)
        }
    }, {
    condition: (_, { getState }) => {
        const state = getState() as RootState;
        return !state.myOrders.fetched;
    }

})

export const OrderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        updateState: (state, action: PayloadAction<{ id: string, status: number }>) => {
            state.data = state.data.map(order => order._id === action.payload.id ? { ...order, status: action.payload.status } : order)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(allAdminOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.fetched = false;
            })
            .addCase(allAdminOrders.fulfilled, (state, action: PayloadAction<TOrderType[]>) => {
                state.loading = false;
                state.data = action.payload;
                state.fetched = true;
            })
            .addCase(allAdminOrders.rejected, (state, action) => {
                state.loading = false;
                state.fetched = false;
                state.data = [];
                state.error = action.payload ?? action.error.message ?? "Something went wrong";
            })
    },
})


export const { updateState } = OrderSlice.actions;
export default OrderSlice.reducer