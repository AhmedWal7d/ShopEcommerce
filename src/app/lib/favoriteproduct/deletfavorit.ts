// counterSlice.ts
"use client";
import apiRoutes from "@/app/__AllCommponent/utils/apiRoutes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import cookies from "js-cookie";
import { toast } from "react-toastify";

export interface CounterState {
  alldeletfavorit: [];
  isloading: boolean;
  isError: any;
  onedeletfavorit: any; 
}

let token = cookies.get("token");

const initialState: CounterState = {
  alldeletfavorit: [],
  isloading: false,
  isError: null,
  onedeletfavorit: null,
};


export let getAlldeletfavorit = createAsyncThunk(
  "deletfavorit/getAlldeletfavorit",
  async () => {
    
    let response = await fetch(apiRoutes.favoriteproduct.list, {
      headers: {
        'Content-Type': 'application/json',
        token: cookies.get('token') || '',
      }
    });
    let data = await response.json();
    console.log(data);

    return data;
  }
);

// Update getonedeletfavorit to accept an id and fetch the specific deletfavorit
export let getonedeletfavorit = createAsyncThunk(
    "deletfavorit/postdeletfavorit",
    async (productId: string, thunkAPI) => {
      try {
        const response = await fetch(apiRoutes.favoriteproduct.list, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: cookies.get('token') || '',
          },
          body: JSON.stringify({ productId }),
          
        }
    );
    toast.success('✅ Product successfully added to favorites');

    // console.log(response)

  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'فشل في جلب البيانات');
        }
  
        const data = await response.json();
        return data;
  
      } catch (error: any) {
        toast.error(error.message)
        return thunkAPI.rejectWithValue(error.message || 'حدث خطأ غير متوقع');
      }
    }
  );
  
  
export const deletfavorits = createSlice({
  name: "deletfavorits",
  initialState,
  extraReducers: (builder) => {
    // getAlldeletfavorit - pending
    builder.addCase(getAlldeletfavorit.pending, (state) => {
      state.isloading = true;
      state.isError = null;
    });

    // getAlldeletfavorit - success
    builder.addCase(getAlldeletfavorit.fulfilled, (state, action) => {
      state.isloading = false;
      state.alldeletfavorit = action?.payload?.data;
    });

    // getAlldeletfavorit - error
    builder.addCase(getAlldeletfavorit.rejected, (state, action) => {
      state.isloading = false;
      state.isError = action.error.message;
    });

    // getOnedeletfavorit - pending
    builder.addCase(getonedeletfavorit.pending, (state) => {
      state.isloading = true;
      state.isError = null;
    });

    // getOnedeletfavorit - success
    builder.addCase(getonedeletfavorit.fulfilled, (state, action) => {
      state.isloading = false;
      state.onedeletfavorit = action?.payload?.data;
    });

    // getOnedeletfavorit - error
    builder.addCase(getonedeletfavorit.rejected, (state, action) => {
      state.isloading = false;
      state.isError = action.error.message;
    });
  },

  reducers: {},
});

export let deletfavoritReducer = deletfavorits.reducer;
