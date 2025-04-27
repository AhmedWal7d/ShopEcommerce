"use client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import cookies from "js-cookie";
import { toast } from "react-toastify";
import apiRoutes from "@/app/__AllCommponent/utils/apiRoutes";

interface FavoriteProduct {
  _id: string;
  name?: string;
  price?: number;
  image?: string;
  // Add other product properties as needed
}

interface ApiResponse<T> {
  data?: T;
  message?: string;
  // Add other response properties as needed
}

interface CounterState {
  allfavoriteproduct: FavoriteProduct[];
  isloading: boolean;
  isError: string | null;
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
export const getAllfavoriteproduct = createAsyncThunk<
  ApiResponse<FavoriteProduct[]>,
  void,
  { rejectValue: string }
>(
  "favoriteproduct/getAllfavoriteproduct",
  async (_, thunkAPI) => {
    try {
      const res: AxiosResponse<ApiResponse<FavoriteProduct[]>> = await axiosInstance.get(apiRoutes.favoriteproduct.list);
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage = axiosError.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// ✅ Delete Favorite Product
export const deleteFavoriteProduct = createAsyncThunk<
  string, // return type (productId)
  string, // argument type (productId)
  { rejectValue: string }
>(
  "favoriteproduct/deleteFavoriteProduct",
  async (productId: string, thunkAPI) => {
    try {
      const res: AxiosResponse<ApiResponse<{ message: string }>> = await axiosInstance.delete(
        `${apiRoutes.favoriteproduct.list}/${productId}`
      );
      toast.success(res.data.message || "Product removed from favorites");
      return productId;
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage = axiosError.response?.data?.message || "Failed to remove product";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// ✅ Add/Get One Favorite
export const getonefavoriteproduct = createAsyncThunk<
  ApiResponse<FavoriteProduct>,
  string, // productId
  { rejectValue: string }
>(
  "favoriteproduct/postfavoriteproduct",
  async (productId: string, thunkAPI) => {
    try {
      const res: AxiosResponse<ApiResponse<FavoriteProduct>> = await axiosInstance.post(
        apiRoutes.favoriteproduct.list, 
        { productId }
      );
      toast.success(res.data.message || "Product added to favorites");
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage = axiosError.response?.data?.message || "Failed to add product";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
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
      .addCase(getAllfavoriteproduct.fulfilled, (state, action: PayloadAction<ApiResponse<FavoriteProduct[]>>) => {
        state.isloading = false;
        state.allfavoriteproduct = action.payload.data || [];
      })
      .addCase(getAllfavoriteproduct.rejected, (state, action: PayloadAction<unknown>) => {
        state.isloading = false;
        state.isError = typeof action.payload === 'string' ? action.payload : "Failed to fetch favorites";
      })

      // get one / add
      .addCase(getonefavoriteproduct.pending, (state) => {
        state.isloading = true;
        state.isError = null;
      })
      .addCase(getonefavoriteproduct.fulfilled, (state, action: PayloadAction<ApiResponse<FavoriteProduct>>) => {
        state.isloading = false;
        state.onefavoriteproduct = action.payload.data || null;
      })
      .addCase(getonefavoriteproduct.rejected, (state, action: PayloadAction<unknown>) => {
        state.isloading = false;
        state.isError = typeof action.payload === 'string' ? action.payload : "Failed to add favorite";
      })

      // delete
      .addCase(deleteFavoriteProduct.pending, (state) => {
        state.isloading = true;
        state.isError = null;
      })
      .addCase(deleteFavoriteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.isloading = false;
        state.allfavoriteproduct = state.allfavoriteproduct.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteFavoriteProduct.rejected, (state, action: PayloadAction<unknown>) => {
        state.isloading = false;
        state.isError = typeof action.payload === 'string' ? action.payload : "Failed to delete favorite";
      });
  },
});

export const favoriteproductReducer = favoriteproducts.reducer;