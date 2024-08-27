import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
  },
  reducers: {
    productsRequest(state, action) {
      return {
        loading: true,
      };
    },
    productsSuccess(state, action) {
      return {
        loading: false,
        products: action.payload.products,
        productsCount:action.payload.count,
        resPerPage:action.payload.resPerData
      };
    },
    productsFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    adminproductsRequest(state, action) {
      return {
        loading: true,
      };
    },
   adminproductsSuccess(state, action) {
      return {
        loading: false,
        products:action.payload.products
      };
    },
    adminproductsFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    clearError(state,action){
      return{
        ...state,
        error:null
      }
    }
  },
});

const { actions, reducer } = productsSlice;

export const { productsRequest,
   productsSuccess, 
   productsFail ,
   adminproductsFail,
   adminproductsRequest,
   adminproductsSuccess,
   clearError
  } = actions;

export default reducer;
