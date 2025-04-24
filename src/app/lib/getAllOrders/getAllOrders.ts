// counterSlice.ts
'use client'
import apiRoutes from '@/app/__AllCommponent/utils/apiRoutes'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    allgetAllOrders: [],
    isloading: boolean,
    isError: any,
    onegetAllOrders: any, // Add state for one getAllOrders
}

const initialState: CounterState = { allgetAllOrders: [], isloading: false, isError: null, onegetAllOrders: null }

export let getAllgetAllOrders = createAsyncThunk('getAllOrders/getAllgetAllOrders', async () => {
    let response = await fetch(apiRoutes.getAllOrderss.list)
    let data = await response.json()
    return data
})

// Update getonegetAllOrders to accept an id and fetch the specific getAllOrders
export let getonegetAllOrders = createAsyncThunk(
    'getAllOrders/getOnegetAllOrders',
    async () => { // id parameter
        let response = await fetch(`${apiRoutes.getAllOrderss.list}`) // Use the id in the API request
        let data = await response.json()
        return data
    }
)

export const getAllOrderss = createSlice({
    name: 'getAllOrderss',
    initialState,
    extraReducers: (builder) => {
        // getAllgetAllOrders - success
        builder.addCase(getAllgetAllOrders.fulfilled, (state, action) => {
            state.allgetAllOrders = action?.payload?.data
        })
    
        // getOnegetAllOrders - pending
        builder.addCase(getonegetAllOrders.pending, (state) => {
            state.isloading = true
            state.isError = null
        })
    
        // getOnegetAllOrders - success
        builder.addCase(getonegetAllOrders.fulfilled, (state, action) => {
            state.isloading = false
            state.onegetAllOrders = action?.payload?.data
        })
    
        // getOnegetAllOrders - error
        builder.addCase(getonegetAllOrders.rejected, (state, action) => {
            state.isloading = false
            state.isError = action.error.message
        })
    }
    ,
    reducers: {}
})

export let getAllOrdersReducer = getAllOrderss.reducer
