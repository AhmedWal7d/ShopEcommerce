'use client'

import apiRoutes from '@/app/__AllCommponent/utils/apiRoutes'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { toast } from 'react-toast'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

// ========= Interfaces ===========
interface User {

  email: string
}

interface UserData {
  token: string
  user: User
}

interface forgotPasswordsState {
  userData: UserData | null
  isLoading: boolean
  isError: string | null
}

// ========= Initial State =========
const initialState: forgotPasswordsState = {
  userData: null,
  isLoading: false,
  isError: null,
}

// ========= Thunk =========
export const forgotPasswordsUser = createAsyncThunk<
  UserData, // return type
  { email: string; password: string }, 
  { rejectValue: string } 
>(
  'auth/forgotPasswords',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await fetch(`${apiRoutes.forgetpassword.list}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'forgotPasswords failed')
      }

    //   Cookies.set('token', data?.token, { expires: 1 })
      toast.success(data?.message || 'forgotPasswords successful')
      window.location.href = '/verifyResetCode' 

      return data
    } catch (error: any) {
      const errorMessage = error?.message || 'حدث خطأ أثناء تسجيل الدخول'
      toast.error(errorMessage)
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)

// ========= Slice =========
const forgotPasswordsSlice = createSlice({
  name: 'forgotPasswords',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordsUser.pending, (state) => {
        state.isLoading = true
        state.isError = null
      })
      .addCase(forgotPasswordsUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.userData = action.payload
        state.isLoading = false
      })
      .addCase(forgotPasswordsUser.rejected, (state, action) => {
        state.isError = action.payload || 'Unknown error'
        state.isLoading = false
      })
  },
})

export const forgotPasswordsReducer = forgotPasswordsSlice.reducer
