'use client'

import apiRoutes from '@/app/__AllCommponent/utils/apiRoutes'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { toast } from 'react-toast'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

// ========= Interfaces ===========
interface User {
  name: string
  email: string
  password: string
  rePassword: string
  phone: string
}
interface UserData {
  token: string
  user: User
}
interface registerState {
  userData: UserData | null
  isLoading: boolean
  isError: string | null
}

// ========= Initial State =========
const initialState: registerState = {
  userData: null,
  isLoading: false,
  isError: null,
}

// ========= Thunk =========
export const registerUser = createAsyncThunk<
  UserData, // return type
  { email: string; password: string; name: string; rePassword: string; phone: string }, 
  { rejectValue: string }
>(
  'auth/register',
  async ({ email, password, name, rePassword, phone }, thunkAPI) => {
    try {
      const res = await fetch(`${apiRoutes.register.list}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, rePassword, phone }), // Pass all fields
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      Cookies.set('token', data?.token, { expires: 1 })
      toast.success(data?.message || 'Registration successful')
      window.location.href = '/' 

      return data
    } catch (error) {
      const errorMessage = error?.message || 'حدث خطأ أثناء تسجيل الدخول'
      toast.error(errorMessage)
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)

// ========= Slice =========
const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.isError = null
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.userData = action.payload
        state.isLoading = false
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = action.payload || 'Unknown error'
        state.isLoading = false
      })
  },
})

export const registerReducer = registerSlice.reducer
