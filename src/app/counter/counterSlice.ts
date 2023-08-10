import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CartState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchCartData = createAsyncThunk('cart/fetchCartData', async () => {
  try {
    const response = await axios.get('/api/cart');
    console.log("response you got on redux from api is....", response.data.message1.length);
    return response.data.message1.length;
  } catch (error) {
    throw new Error('Failed to fetch cart data');
  }
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default cartSlice.reducer;
