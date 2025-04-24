"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import cookies from "js-cookie";
import { toast } from "react-toastify";
import apiRoutes from "@/app/__AllCommponent/utils/apiRoutes";

interface FavoriteProduct {
  _id: string;
  name?: string;
  price?: number;
  image?: string;
}

export interface CounterState {
  allfavoriteproduct: FavoriteProduct[];
  isloading: boolean;
  isError: any;
  onefavoriteproduct: FavoriteProduct | null;
}

const token = cookies.get("token");

const axiosInstance = axios.create({
  headers: {
    token: token || "",
    "Content-Type": "application/json",
  },
});

const initialState: CounterState = {
  allfavoriteproduct: [],
  isloading: false,
  isError: null,
  onefavoriteproduct: null,
};

// ✅ Get All Favorites
export const getAllfavoriteproduct = createAsyncThunk(
  "favoriteproduct/getAllfavoriteproduct",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(apiRoutes.favoriteproduct.list);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "حدث خطأ");
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

// ✅ Delete Favorite Product
export const deleteFavoriteProduct = createAsyncThunk(
  "favoriteproduct/deleteFavoriteProduct",
  async (productId: string, thunkAPI) => {
    try {
     let data =  await axiosInstance.delete(`${apiRoutes.favoriteproduct.list}/${productId}`);
      toast.success(data.data.message);
      // console.log(data);
      
      return productId;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء الحذف");
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

// ✅ Add/Get One Favorite
export const getonefavoriteproduct = createAsyncThunk(
  "favoriteproduct/postfavoriteproduct",
  async (productId: string, thunkAPI) => {
    try {
      const res = await axiosInstance.post(apiRoutes.favoriteproduct.list, { productId });
      toast.success(res?.data?.message);
      console.log(res?.data?.message);
      
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء الإضافة");
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

// ✅ Slice
export const favoriteproducts = createSlice({
  name: "favoriteproducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAll
      .addCase(getAllfavoriteproduct.pending, (state) => {
        state.isloading = true;
        state.isError = null;
      })
      .addCase(getAllfavoriteproduct.fulfilled, (state, action) => {
        state.isloading = false;
        state.allfavoriteproduct = action.payload?.data || [];
      })
      .addCase(getAllfavoriteproduct.rejected, (state, action) => {
        state.isloading = false;
        state.isError = action.payload;
      })

      // get one / add
      .addCase(getonefavoriteproduct.pending, (state) => {
        state.isloading = true;
        state.isError = null;
      })
      .addCase(getonefavoriteproduct.fulfilled, (state, action) => {
        state.isloading = false;
        state.onefavoriteproduct = action.payload?.data;
      })
      .addCase(getonefavoriteproduct.rejected, (state, action) => {
        state.isloading = false;
        state.isError = action.payload;
      })

      // delete
      .addCase(deleteFavoriteProduct.pending, (state) => {
        state.isloading = true;
        state.isError = null;
      })
      .addCase(deleteFavoriteProduct.fulfilled, (state, action) => {
        state.isloading = false;
        state.allfavoriteproduct = state.allfavoriteproduct.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteFavoriteProduct.rejected, (state, action) => {
        state.isloading = false;
        state.isError = action.payload;
      });
  },
});

export const favoriteproductReducer = favoriteproducts.reducer;
