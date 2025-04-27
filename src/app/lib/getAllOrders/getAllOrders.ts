// src/app/lib/getAllOrders/getAllOrders.ts
'use client'
import apiRoutes from '@/app/__AllCommponent/utils/apiRoutes'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Order {
  id: string;
  // Add other order properties as needed
  // Example:
  // customerName: string;
  // totalAmount: number;
  // status: string;
}

interface ApiResponse<T> {
  data?: T;
  message?: string;
  // Add other response properties as needed
}

export interface CounterState {
  allgetAllOrders: Order[];
  isloading: boolean;
  isError: string | null;
  onegetAllOrders: Order | null;
}

const initialState: CounterState = { 
  allgetAllOrders: [], 
  isloading: false, 
  isError: null, 
  onegetAllOrders: null 
}

export const getAllgetAllOrders = createAsyncThunk<
  ApiResponse<Order[]>,
  void,
  { rejectValue: string }
>('getAllOrders/getAllgetAllOrders', async () => {
  const response = await fetch(apiRoutes.getAllOrderss.list);
  const data = await response.json();
  return data;
})

export const getonegetAllOrders = createAsyncThunk<
  ApiResponse<Order>,
  string, // id parameter type
  { rejectValue: string }
>(
  'getAllOrders/getOnegetAllOrders',
  async (id: string) => {
    const response = await fetch(`${apiRoutes.getAllOrderss.list}/${id}`);
    const data = await response.json();
    return data;
  }
)

export const getAllOrderss = createSlice({
  name: 'getAllOrderss',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getAllgetAllOrders - success
    builder.addCase(getAllgetAllOrders.fulfilled, (state, action: PayloadAction<ApiResponse<Order[]>>) => {
      state.allgetAllOrders = action.payload?.data || [];
    })
  
    // getOnegetAllOrders - pending
    builder.addCase(getonegetAllOrders.pending, (state) => {
      state.isloading = true;
      state.isError = null;
    })
  
    // getOnegetAllOrders - success
    builder.addCase(getonegetAllOrders.fulfilled, (state, action: PayloadAction<ApiResponse<Order>>) => {
      state.isloading = false;
      state.onegetAllOrders = action.payload?.data || null;
    })
  
    // getOnegetAllOrders - error
    builder.addCase(getonegetAllOrders.rejected, (state, action) => {
      state.isloading = false;
      state.isError = action.payload as string || 'Failed to fetch order';
    })
  }
})

export const getAllOrdersReducer = getAllOrderss.reducer;