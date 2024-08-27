import axios from "axios";
import {
  adminOrdersFail,
  adminOrdersRequest,
  adminOrdersSuccess,
  createOrderFail,
  createOrderRequest,
  createOrderSuccess,
  deleteOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  orderDetailFail,
  orderDetailRequest,
  orderDetailSuccess,
  updateOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
  userOrderFail,
  userOrderRequest,
  userOrderSuccess,
} from "../Slices/orderSlice";



export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());

    let { data } = await axios.post(
      `/cart/order/new`,
      order
    );

    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(createOrderFail(error.response?.data?.message || error.message));
  }
};

export const UserOrders = async (dispatch) => {
  try {
    dispatch(userOrderRequest());

    let { data } = await axios.get(`/cart/myorders`);

    dispatch(userOrderSuccess(data));
  } catch (error) {
    dispatch(userOrderFail(error.response?.data?.message || error.message));
  }
};
export const OrderDetail = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailRequest());

    let { data } = await axios.get(`/cart/order/${id}`);

    dispatch(orderDetailSuccess(data));
  } catch (error) {
    dispatch(orderDetailFail(error.response?.data?.message || error.message));
  }
};

export const AdminOrders = async (dispatch) => {
  try {
    dispatch(adminOrdersRequest());

    let { data } = await axios.get(`/cart/admin/orders`);

    dispatch(adminOrdersSuccess(data));
  } catch (error) {
    dispatch(adminOrdersFail(error.response?.data?.message || error.message));
  }
};
export const DeleteOrder = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequest());

    await axios.delete(`/cart/admin/order/${id}`);

    dispatch(deleteOrderSuccess());
  } catch (error) {
    dispatch(deleteOrderFail(error.response?.data?.message || error.message));
  }
};
export const UpdateOrder = (id,orderData) => async (dispatch) => {
  try {
    dispatch(updateOrderRequest());

   let {data}= await axios.put(`/cart/admin/order/${id}`,orderData);

    dispatch(updateOrderSuccess(data));
  } catch (error) {
    dispatch(updateOrderFail(error.response?.data?.message || error.message));
  }
};
