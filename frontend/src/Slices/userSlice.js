import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    user:{},
    users:[],
    isUserUpdated:false,
    isUserDeleted:false
  },
  reducers: {
    usersRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    usersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        users:action.payload.Users
       
      };
    },
    usersFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    userRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    userSuccess(state, action) {
      return {
        ...state,
        loading: false,
        user:action.payload.User
       
      };
    },
    userFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    deleteUserRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteUserSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isUserDeleted:true
       
      };
    },
    deleteUserFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    updateUserRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateUserSuccess(state, action) {
      return {
        ...state,
        loading: false,
       isUserUpdated:true
       
      };
    },
    updateUserFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    
    clearUserError(state,action){
      return{
        ...state,
        error:null
      }
    },

    clearUserDelete(state,action){
        return{
            ...state,
            isUserDeleted:false
        }
    },
    clearUserUpdate(state,action){
        return{
            ...state,
            isUserUpdated:false
        }
    }
  },
});

const { actions, reducer } = UserSlice;

export const {

    usersRequest,
    usersSuccess,
    usersFail,
    userRequest,
    userSuccess,
    userFail,
    deleteUserFail,
    deleteUserRequest,
    deleteUserSuccess,
    updateUserFail,
    updateUserSuccess,
    updateUserRequest,
    clearUserDelete,
    clearUserUpdate,
    clearUserError
  
  } = actions;

export default reducer;
