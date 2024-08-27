import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
   loading:false,
    orderDetail:{},
    userOrders:[],
    adminOrders:[],
    isOrderDeleted:false,
    isOrderUpdated:false


    
  },

  reducers: {

    createOrderRequest(state,action){

        return {
            ...state,
            loading:true
        }
    },
   
    createOrderSuccess(state,action){

        return {
            ...state,
            loading:false,
            orderDetail:action.payload.order
        }
    },
    createOrderFail(state,action){

        return {
            ...state,
            loading:false,
            error:action.payload
        }
    },
    userOrderRequest(state,action){

        return {
            ...state,
            loading:true
        }
    },
   
    userOrderSuccess(state,action){

        return {
            ...state,
            loading:false,
            userOrders:action.payload.orders
        }
    },
    userOrderFail(state,action){

        return {
            ...state,
            loading:false,
            error:action.payload
        }
    },
    orderDetailRequest(state,action){

        return {
            ...state,
            loading:true
        }
    },
   
    orderDetailSuccess(state,action){

        return {
            ...state,
            loading:false,
            orderDetail:action.payload.order
        }
    },
    orderDetailFail(state,action){

        return {
            ...state,
            loading:false,
            error:action.payload
        }
    },
    clearOrderError(state,action){
        return {
            ...state,
            error:null
        }
    },

    adminOrdersRequest(state,action){

        return {
            ...state,
            loading:true
        }
    },
   
    adminOrdersSuccess(state,action){

        return {
            ...state,
            loading:false,
           adminOrders:action.payload.orders
        }
    },
    adminOrdersFail(state,action){

        return {
            ...state,
            loading:false,
            error:action.payload
        }
    },
    deleteOrderRequest(state,action){

        return {
            ...state,
            loading:true
        }
    },
   
    deleteOrderSuccess(state,action){

        return {
            ...state,
            loading:false,
            isOrderDeleted:true
        }
    },
    deleteOrderFail(state,action){

        return {
            ...state,
            loading:false,
            error:action.payload
        }
    },
    updateOrderRequest(state,action){

        return {
            ...state,
            loading:true
        }
    },
   
    updateOrderSuccess(state,action){

        return {
            ...state,
            loading:false,
            isOrderUpdated:true
        }
    },
    updateOrderFail(state,action){

        return {
            ...state,
            loading:false,
            error:action.payload
        }
    },
    clearOrderDelete(state,action){
        return{
            ...state,
            isOrderDeleted:false

        }
    },
    clearOrderUpdate(state,action){
        return{
            ...state,
            isOrderUpdated:false

        }
    }
    


 

    
    
  }
});

const { actions, reducer } = orderSlice;

export const {
    createOrderFail,
    createOrderRequest,
    createOrderSuccess,
    clearOrderError,
    userOrderFail,
    userOrderRequest,
    userOrderSuccess,
    orderDetailFail,
    orderDetailRequest,
    orderDetailSuccess,
    adminOrdersRequest,
    adminOrdersSuccess,
    adminOrdersFail,
    deleteOrderRequest,
    deleteOrderSuccess,
    deleteOrderFail,
    updateOrderRequest,
    updateOrderSuccess,
    updateOrderFail,
    clearOrderDelete,
    clearOrderUpdate
 
} = actions;

export default reducer;
