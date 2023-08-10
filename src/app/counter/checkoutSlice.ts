import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type data = {
    id: number,
    userid: string,
    productid: string,
    title: string,
    price: number,
    image: string,
    quantity: number
}

interface CheckoutState {
  data: data[];
  loading: boolean;
  error: string | null;
}

const initialState: CheckoutState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchCheckoutData = createAsyncThunk('cart/fetchCheckoutData', async () => {
  try {
    const response = await axios.get('/api/cart');
    console.log("response you got on redux from api is....", response.data.message1);
    return response.data.message1;
  } catch (error) {
    throw new Error('Failed to fetch cart data');
  }
});

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    increaseQuantity: (state, action) => {
      const { productId } = action.payload;
      const product = state.data.find((item) => item.id === productId);
      if (product) {
        product.quantity += 1;
        console.log("quantity",product.quantity)
      }
    },
    decreaseQuantity: (state, action) => {
      const { productId } = action.payload;
      const product = state.data.find((item) => item.id === productId);
      if (product && product.quantity > 0) {
        product.quantity -= 1;
        console.log("quantity",product.quantity)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckoutData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCheckoutData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCheckoutData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { increaseQuantity, decreaseQuantity } = checkoutSlice.actions;
export default checkoutSlice.reducer;
