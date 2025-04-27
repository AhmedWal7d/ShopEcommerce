'use client'

import apiRoutes from '@/app/__AllCommponent/utils/apiRoutes'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

// ========= Interfaces ===========
interface User {
  name: string
  email: string
  // تقدر تضيف خصائص تانية هنا لو الـ API بيرجع أكتر
}

interface UserData {
  token: string
  user: User
}

interface LoginState {
  userData: UserData | null
  isLoading: boolean
  isError: string | null
}

// ========= Initial State =========
const initialState: LoginState = {
  userData: null,
  isLoading: false,
  isError: null,
}

// ========= Thunk =========
export const loginUser = createAsyncThunk<
  UserData, // return type
  { email: string; password: string }, // argument type
  { rejectValue: string } // reject value type
>(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await fetch(`${apiRoutes.login.list}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Login failed')
      }

      Cookies.set('token', data?.token, { expires: 1 })
      Cookies.set('useName', data?.user?.name, { expires: 1 })

      

      toast.success(`Welcome ${data?.user?.name || 'بك'}!`)

      window.location.href = '/' 

      return {
        token: data.token,
        user: {
          name: data.user.name,
          email: data.user.email,
        }
      }
      
    } catch (error) {
      const errorMessage = error?.message || 'حدث خطأ أثناء تسجيل الدخول'
      toast.error(errorMessage)
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)

// ========= Slice =========
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.isError = null
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.userData = action.payload
        state.isLoading = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = action.payload || 'Unknown error'
        state.isLoading = false
      })
  },
})

// ========= Export Reducer =========
export const loginReducer = loginSlice.reducer
