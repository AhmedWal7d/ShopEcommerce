'use client'

import apiRoutes from '@/app/__AllCommponent/utils/apiRoutes'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import axios from 'axios'

// ========= Interfaces =========
interface CartItem {
  productId: string
}

interface CartData {
  items: CartItem[]
  message?: string
}

interface AddToCartState {
  cartData: CartData | null
  isLoading: boolean
  isError: string | {} | null
}

// ========= Initial State =========
const initialState: AddToCartState = {
  cartData: null,
  isLoading: false,
  isError: null,
}

// ========= Thunk =========
export const addToCart = createAsyncThunk<
  CartData,
  { productId: string }
>(
  'cart/addToCart',
  async ({ productId }, thunkAPI) => {
    const headers = {
      token: Cookies.get('token'),
    }

    if (!headers.token) {
      toast.error('Please sign in to continue')
      return thunkAPI.rejectWithValue('No token found')
    }

    try {
      const res = await axios.post(
        `${apiRoutes.addtocart.list}`,
        { productId },
        { headers }
      )

      toast.success('Product added to cart successfully')

      if (res.status !== 200) {
        throw new Error(res.data?.message || 'Failed to add product to cart')
      }

      return {
        items: res.data.items,
        message: res.data.message,
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'An error occurred while adding to the cart'
      toast.error(errorMessage)
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)
// ========= Slice =========

const addToCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true
        state.isError = null
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartData>) => {
        state.cartData = action.payload
        state.isLoading = false
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isError = action.payload || 'Unknown error'
        state.isLoading = false
      })
  },
})

// ========= Export Reducer =========
export const addToCartReducer = addToCartSlice.reducer
