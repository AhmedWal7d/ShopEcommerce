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

export const Deletecart = createAsyncThunk(
    'cart/Deletecart',
    async (id: string, thunkAPI) => {
      const token = Cookies.get('token')
  
      if (!token) {
        toast.error('You are not logged in. Please login to get access')
        return thunkAPI.rejectWithValue('You are not logged in. Please login to get access')
      }
  
      try {
        const headers = { token }
  
        const res = await axios.delete(`${apiRoutes.addtocart.list}/${id}`, { headers })
  
        if (res.status !== 200) {
          throw new Error(res.data?.message || 'Failed to fetch cart')
        }
        toast.success("Delete Success")

        
  
        return {
          items: res.data || [],
          message: res.data.message,
        }
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || 'An error occurred while fetching the cart'
        toast.error(errorMessage)
        return thunkAPI.rejectWithValue(errorMessage)
      }
    }
  )
  
  
  
  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(Deletecart.pending, (state) => {
          state.isLoading = true
          state.isError = null
        })
   
        .addCase(Deletecart.rejected, (state, action) => {
            state.isError = action.payload as string
            state.isLoading = false
            toast.error(state.isError)
          })
          .addCase(Deletecart.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = null
            const deletedId = action.meta.arg // الـ id المرسل في الـ thunk
            if (state.cartData && Array.isArray(state.cartData)) {
              state.cartData = state.cartData.filter((item: any) => item._id !== deletedId)
            }
          })
          
          
          
    },
  })
  
  export const DeletecartReducer = cartSlice.reducer
  