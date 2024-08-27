import {
  clearError,
  forgotPasswordFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  logoutSuccess,
  registerFail,
  registerRequest,
  registerSuccess,
  resetPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  updatePasswordFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updateProfileFail,
  updateProfileRequest,
  updateProfileSuccess,
} from "../Slices/authSlice";
import axios from "axios";
import { deleteUserFail, deleteUserRequest, deleteUserSuccess, updateUserFail, updateUserRequest, updateUserSuccess, userFail, userRequest, usersFail, usersRequest, usersSuccess, userSuccess } from "../Slices/userSlice";


axios.defaults.withCredentials = true;


export const Login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const { data } = await axios.post(`/cart/login`, {
      email,
      password,
    });

    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response?.data?.message || error.message));
  }
};

export const Register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    };

    const { data } = await axios.post(
      `/cart/register`,
      userData,
      config
    );

    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response?.data?.message || error.message));
  }
};

export const UpdateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());

    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    };

    const { data } = await axios.put(
      `/cart/update`,
      userData,
      config
    );

    dispatch(updateProfileSuccess(data));
  } catch (error) {
    dispatch(updateProfileFail(error.response?.data?.message || error.message));
  }
};

export const UpdatePassword = (formData) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    await axios.put(
      `/cart/password/change`,
      formData,
      config
    );

    dispatch(updatePasswordSuccess());
  } catch (error) {
    dispatch(updatePasswordFail(error.response?.data?.message || error.message));
  }
};

export const loadUser = async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get(`/cart/myprofile`);

    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFail(error.response?.data?.message || error.message));
  }
};

export const logoutUser = async (dispatch) => {
  try {
    await axios.get(`/cart/logout`);

    dispatch(logoutSuccess());
  } catch (error) {
    // Handle logout errors if necessary
    console.error("Logout error:", error);
  }
};

export const clearAuthError = (dispatch) => {
  dispatch(clearError());
};

export const ForgotPassword = (formData) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `/cart/password/forgot`,
      formData,
      config
    );

    dispatch(forgotPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordFail(error.response?.data?.message || error.message));
  }
};

export const ResetPassword = (formData, token) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `/cart/password/reset/${token}`,
      formData,
      config
    );

    dispatch(resetPasswordSuccess(data));
  } catch (error) {
    dispatch(resetPasswordFail(error.response?.data?.message || error.message));
  }
};





// Admin get all User ==================


export const getUsers = async (dispatch) => {
  try {
    dispatch(usersRequest());
    const { data } = await axios.get(`/cart/admin/users`);

    dispatch(usersSuccess(data));
  } catch (error) {
    dispatch(usersFail(error.response?.data?.message || error.message));
  }
};
export const getUser =id => async (dispatch) => {
  try {
    dispatch(userRequest());
    const { data } = await axios.get(`/cart/admin/user/${id}`);

    dispatch(userSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response?.data?.message || error.message));
  }
};

export const deleteUser =id => async (dispatch) => {
  try {
    dispatch(deleteUserRequest());
     await axios.delete(`/cart/admin/user/${id}`);

    dispatch(deleteUserSuccess());
  } catch (error) {
    dispatch(deleteUserFail(error.response?.data?.message || error.message));
  }
};




export const UpdateUser = (id, formData) => async (dispatch) => {
  try {
    dispatch(updateUserRequest());

  
    const { data } = await axios.put(
      `/cart/admin/user/${id}`,
      formData
    );

    dispatch(updateUserSuccess(data));
  } catch (error) {
    dispatch(updateUserFail(error.response?.data?.message || error.message));
  }
};

