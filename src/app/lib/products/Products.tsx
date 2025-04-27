// src/app/lib/products/Products.tsx
'use client'
import apiRoutes from '@/app/__AllCommponent/utils/apiRoutes'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Product {
  id: string;
  // Add other product properties as needed
  // Example:
  // title: string;
  // price: number;
  // description: string;
}

interface ApiResponse<T> {
  data?: T;
  message?: string;
  // Add other response properties as needed
}

export interface CounterState {
  allproduct: Product[];
  isloading: boolean;
  isError: string | null;
  oneProduct: Product | null;
}

const initialState: CounterState = { 
  allproduct: [], 
  isloading: false, 
  isError: null, 
  oneProduct: null 
}

export const getAllproduct = createAsyncThunk<
  ApiResponse<Product[]>,
  void,
  { rejectValue: string }
>('product/getAllproduct', async () => {
  const response = await fetch(apiRoutes.products.list);
  const data = await response.json();
  return data;
})

export const getoneproduct = createAsyncThunk<
  ApiResponse<Product>,
  string,
  { rejectValue: string }
>(
  'product/getOneProduct',
  async (id: string) => {
    const response = await fetch(`${apiRoutes.products.list}/${id}`);
    const data = await response.json();
    return data;
  }
)

export const products = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getAllproduct - success
    builder.addCase(getAllproduct.fulfilled, (state, action: PayloadAction<ApiResponse<Product[]>>) => {
      state.allproduct = action.payload?.data || [];
    })
  
    // getOneProduct - pending
    builder.addCase(getoneproduct.pending, (state) => {
      state.isloading = true;
      state.isError = null;
    })
  
    // getOneProduct - success
    builder.addCase(getoneproduct.fulfilled, (state, action: PayloadAction<ApiResponse<Product>>) => {
      state.isloading = false;
      state.oneProduct = action.payload?.data || null;
    })
  
    // getOneProduct - error
    builder.addCase(getoneproduct.rejected, (state, action) => {
      state.isloading = false;
      state.isError = action.payload as string || 'Failed to fetch product';
    })
  }
})

export const productReducer = products.reducer;