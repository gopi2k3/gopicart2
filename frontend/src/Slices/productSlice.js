import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    product:{},
    isReviewSubmited:false,
    isProductCreated:false,
    isProductDeleted:false,
    isProductUpdated:false,
    isReviewDeleted:false,
    reviews:[]

  },
  reducers: {
    productRequest(state, action) {
      return {
        ...state,
        loading: true,
        product:{}
      };
    },
    productSuccess(state, action) {
      return {...state,
        loading: false,
        product: action.payload.product,
      };
    },
    productFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    createReviewRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    createReviewSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isReviewSubmited:true
      };
    },
    createReviewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearReviewSubmitted(state,action){
      return{
        ...state,
        isReviewSubmited:false
      }
    },
    clearError(state,action){
      return {
        ...state,
        error:null
      }
    },
    clearProduct(state,action){
      return {
          ...state,
          product:{}
      }
  },
  newProductRequest(state, action) {
    return {
      ...state,
      loading: true,
      product:{}
    };
  },
  newProductSuccess(state, action) {
    return {...state,
      loading: false,
      product: action.payload.product,
      isProductCreated:true
    };
  },
  newProductFail(state, action) {
    return {
      ...state,
      loading: false,
      error: action.payload,
      isProductCreated:false
    };
  },
  clearProductCreated(state,action){
    return {
      ...state,
      isProductCreated:false
    }
  },
  deleteProductRequest(state, action) {
    return {
      ...state,
      loading: true,
    };
  },
  deleteProductSuccess(state, action) {
    return {...state,
      loading: false,
      isProductDeleted:true
     
    };
  },
  deleteProductFail(state, action) {
    return {
      ...state,
      loading: false,
      error: action.payload,

    };
  },
  clearProductDeleted(state,action){
    return {
      ...state,
      isProductDeleted:false

    }
  }
 ,
  updateProductRequest(state, action) {
    return {
      ...state,
      loading: true,
    };
  },
  updateProductSuccess(state, action) {
    return {...state,
      loading: false,
      product:action.payload.product,
      isProductUpdated:true
     
    };
  },
  updateProductFail(state, action) {
    return {
      ...state,
      loading: false,
      error: action.payload,

    };
  },
  clearProductUpdated(state,action){
    return {
      ...state,
      isProductUpdated:false

    }
  },

  reviewsRequest(state, action) {
    return {
      ...state,
      loading: true,
    };
  },
  reviewsSuccess(state, action) {
    return {...state,
      loading: false,
      reviews: action.payload.reviews,
    };
  },
  reviewsFail(state, action) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  deleteReviewRequest(state, action) {
    return {
      ...state,
      loading: true,
    };
  },
  deleteReviewSuccess(state, action) {
    return {...state,
      loading: false,
      isReviewDeleted:true
     
    };
  },
  deleteReviewFail(state, action) {
    return {
      ...state,
      loading: false,
      error: action.payload,

    };
  },
  deleteReviewClear(state,action){
    return {
      ...state,
      isReviewDeleted:false
    }
  }
 
  },
});

const { actions, reducer } = productSlice;

export const { productRequest, 
  productSuccess, 
  productFail ,

createReviewFail,
createReviewSuccess,
createReviewRequest,
clearError,
clearReviewSubmitted,
clearProduct,
newProductFail,
newProductSuccess,
newProductRequest,
clearProductCreated,
deleteProductFail,
deleteProductRequest,
deleteProductSuccess,
clearProductDeleted,
updateProductFail,
updateProductRequest,
updateProductSuccess,
clearProductUpdated,
deleteReviewClear,
deleteReviewRequest,
deleteReviewSuccess,
deleteReviewFail,
reviewsFail,
reviewsRequest,
reviewsSuccess
} = actions;

export default reducer;
