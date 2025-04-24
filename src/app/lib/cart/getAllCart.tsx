// src/app/__AllCommponent/store/cartSlice.ts

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiRoutes from '@/app/__AllCommponent/utils/apiRoutes'
import axios from 'axios'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

const initialState = {
  cartData: null,
  isLoading: false,
  isError: null as string | null,
}

// ✅ Get All Cart
export const getAllcart = createAsyncThunk(
  'cart/getAllcart',
  async (_, thunkAPI) => {
    const token = Cookies.get('token')

    if (!token) {
      // toast.error('You are not logged in. Please login to get access')
      return thunkAPI.rejectWithValue('You are not logged in.')
    }

    try {
      const res = await axios.get(apiRoutes.addtocart.list, {
        headers: { token },
      })

      if (res.status !== 200) {
        throw new Error(res.data?.message || 'Failed to fetch cart')
      }

      return {
        items: res.data ,
        message: res.data.message,
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'An error occurred while fetching the cart'
      toast.error(errorMessage)
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)


export const Deletecart = createAsyncThunk(
  'cart/Deletecart',
  async (id: string, thunkAPI) => {
    const token = Cookies.get('token')

    if (!token) {
      toast.error('You are not logged in. Please login to get access')
      return thunkAPI.rejectWithValue('You are not logged in.')
    }

    try {
      const res = await axios.delete(`${apiRoutes.addtocart.list}/${id}`, {
        headers: { token },
      })

      if (res.status !== 200) {
        throw new Error(res.data?.message || 'Failed to delete cart item')
      }

      toast.success('Delete Success')

      return id
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'An error occurred while deleting cart item'
      toast.error(errorMessage)
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)


export const Updatecartitem = createAsyncThunk(
  'cart/Updatecartitem',
  async ({ id, count }: { id: string; count: number }, thunkAPI) => {
    const token = Cookies.get('token')

    if (!token) {
      toast.error('You are not logged in. Please login to get access')
      return thunkAPI.rejectWithValue('You are not logged in.')
    }

    try {
      const res = await axios.put(`${apiRoutes.addtocart.list}/${id}`, {
        count,
      }, {
        headers: { token },
      })

      if (res.status !== 200) {
        throw new Error(res.data?.message || 'Failed to update cart item')
      }

      toast.success('Update Success')

      return res.data
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'An error occurred while updating cart item'
      toast.error(errorMessage)
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)

export const paymentcartitem = createAsyncThunk(
  'cart/paymentcartitem',
  async (
    { id, url, formvalues }: { id: string[]; url: string; formvalues: { details: string; phone: string; city: string } },
    thunkAPI
  ) => {
    const token = Cookies.get('token');

    if (!token) {
      toast.error('You are not logged in. Please login to get access');
      return thunkAPI.rejectWithValue('You are not logged in.');
    }

    try {
      const res = await axios.post(
        `${apiRoutes.parment.list}/${id}?url`,
        {
          productIds: id, // مصفوفة المنتجات
          shippingAddress: formvalues,
        },
        {
          headers: { token },
        }
      );

      if (res.status !== 200) {
        throw new Error(res.data?.message || 'Failed to complete payment');
      }

      toast.success('Payment Success');
      return res.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'An error occurred during payment';
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);



const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ✅ Get All Cart
      .addCase(getAllcart.pending, (state) => {
        state.isLoading = true
        state.isError = null
      })
      .addCase(getAllcart.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartData = action.payload.items
      })
      .addCase(getAllcart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = action.payload as string
      })

      // ✅ Delete Cart Item
      .addCase(Deletecart.pending, (state) => {
        state.isLoading = true
        state.isError = null
      })
      .addCase(Deletecart.fulfilled, (state, action) => {
        state.isLoading = false
        const deletedId = action.payload
        console.log("Before Delete:", state.cartData)
        if (state.cartData && Array.isArray(state.cartData)) {
          state.cartData = state.cartData?.filter((item: any) => item._id !== deletedId)
          console.log("After Delete:", state.cartData)
        }
      })
      
      .addCase(Deletecart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = action.payload as string
      })

      // ✅ Update Cart Item
      .addCase(Updatecartitem.pending, (state) => {
        state.isLoading = true
        state.isError = null
      })
      .addCase(Updatecartitem.fulfilled, (state, action) => {
        state.isLoading = false
        // You can update the specific item in cartData if needed
        // Example: update quantity if item exists
      })
      .addCase(Updatecartitem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = action.payload as string
      })
  },
})

export const cartReducer = cartSlice.reducer
