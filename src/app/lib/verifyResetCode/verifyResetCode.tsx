'use client'

import apiRoutes from '@/app/__AllCommponent/utils/apiRoutes'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

// ========= Interfaces ===========
interface User {

  resetCode: string
}

interface UserData {
  token: string
  user: User
}

interface verifyResetCodesState {
  userData: UserData | null
  isLoading: boolean
  isError: string | null
}

// ========= Initial State =========
const initialState: verifyResetCodesState = {
  userData: null,
  isLoading: false,
  isError: null,
}

// ========= Thunk =========
export const verifyResetCodesUser = createAsyncThunk<
  UserData, // return type
  { resetCode: string }, 
  { rejectValue: string } 
>(
  'auth/verifyResetCodes',
  async ({ resetCode }, thunkAPI) => {
    try {
      const res = await fetch(`${apiRoutes.verifyResetCode.list}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetCode }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'verifyResetCodes failed')
      }

    //   Cookies.set('token', data?.token, { expires: 1 })
      toast.success(data?.message || 'verifyResetCodes successful')
      window.location.href = '/ResetPassword' 

      return data
    } catch (error) {
      const errorMessage = error?.message || 'حدث خطأ أثناء تسجيل الدخول'
      toast.error(errorMessage)
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)

// ========= Slice =========
const verifyResetCodesSlice = createSlice({
  name: 'verifyResetCodes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyResetCodesUser.pending, (state) => {
        state.isLoading = true
        state.isError = null
      })
      .addCase(verifyResetCodesUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.userData = action.payload
        state.isLoading = false
      })
      .addCase(verifyResetCodesUser.rejected, (state, action) => {
        state.isError = action.payload || 'Unknown error'
        state.isLoading = false
      })
  },
})

export const verifyResetCodesReducer = verifyResetCodesSlice.reducer;
