import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/app/counter/counterSlice';
import checkoutSlice from './counter/checkoutSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        checkout: checkoutSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch