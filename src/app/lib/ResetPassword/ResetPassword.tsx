'use client'

import apiRoutes from '@/app/__AllCommponent/utils/apiRoutes'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { toast } from 'react-toast'
import { toast } from 'react-toastify'

// ========= Interfaces ===========
interface User {

    email: string
    newPassword: string
}

interface UserData {
  token: string
  user: User
}

interface resetPasswordState {
  userData: UserData | null
  isLoading: boolean
  isError: string | null
}

const initialState: resetPasswordState = {
  userData: null,
  isLoading: false,
  isError: null,
}

export const resetPasswordUser = createAsyncThunk<
  UserData,
  { email: string; newPassword: string } 
>(
  'auth/resetPassword',
  async ({ email, newPassword }, thunkAPI) => {
    try {
      const res = await fetch(`${apiRoutes.resetPassword.list}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'resetPassword failed')
      }

      toast.success(data?.message || 'Reset password successful')

      return data
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'حدث خطأ أثناء تغيير كلمة المرور'
      toast.error(errorMessage)
      return thunkAPI.rejectWithValue(errorMessage)
    }
    
  }
)


// ========= Slice =========
const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPasswordUser.pending, (state) => {
        state.isLoading = true
        state.isError = null
      })
      .addCase(resetPasswordUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.userData = action.payload
        state.isLoading = false
      })
      .addCase(resetPasswordUser.rejected, (state, action) => {
        state.isError = (action.payload as string) || 'Unknown error'
        state.isLoading = false
      })
  },
})

export const resetPasswordReducer = resetPasswordSlice.reducer
