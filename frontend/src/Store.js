import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsReducer from './Slices/productsSlice'
import productReducer from './Slices/productSlice'
import authReducer from './Slices/authSlice'
import cartReducer from './Slices/cartSlice'
import orderReducer from './Slices/orderSlice'
import userReducer from './Slices/userSlice'
// Define your reducers here
const reducer = combineReducers({
  productsState:productsReducer,
  productState:productReducer,
  authState:authReducer,
  cartState:cartReducer,
   orderState:orderReducer,
   userState:userReducer
});

// Configure the store
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
