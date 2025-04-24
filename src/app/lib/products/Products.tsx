// counterSlice.ts
'use client'
import apiRoutes from '@/app/__AllCommponent/utils/apiRoutes'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    allproduct: [],
    isloading: boolean,
    isError: any,
    oneProduct: any, // Add state for one product
}

const initialState: CounterState = { allproduct: [], isloading: false, isError: null, oneProduct: null }

export let getAllproduct = createAsyncThunk('product/getAllproduct', async () => {
    let response = await fetch(apiRoutes.products.list)
    let data = await response.json()
    return data
})

// Update getoneproduct to accept an id and fetch the specific product
export let getoneproduct = createAsyncThunk(
    'product/getOneProduct',
    async (id: string) => { // id parameter
        let response = await fetch(`${apiRoutes.products.list}/${id}`) // Use the id in the API request
        let data = await response.json()
        return data
    }
)

export const products = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        // getAllproduct - success
        builder.addCase(getAllproduct.fulfilled, (state, action) => {
            state.allproduct = action?.payload?.data
        })
    
        // getOneProduct - pending
        builder.addCase(getoneproduct.pending, (state) => {
            state.isloading = true
            state.isError = null
        })
    
        // getOneProduct - success
        builder.addCase(getoneproduct.fulfilled, (state, action) => {
            state.isloading = false
            state.oneProduct = action?.payload?.data
        })
    
        // getOneProduct - error
        builder.addCase(getoneproduct.rejected, (state, action) => {
            state.isloading = false
            state.isError = action.error.message
        })
    }
    ,
    reducers: {}
})

export let productReducer = products.reducer
