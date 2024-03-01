import axios from "axios";
import {
  CANCEL_ORDER_FAILURE,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CONFIRM_ORDER_FAILURE,
  CONFIRM_ORDER_REQUEST,
  CONFIRM_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELIVER_ORDER_FAILURE,
  DELIVER_ORDER_REQUEST,
  DELIVER_ORDER_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  PENDING_ORDER_FAILURE,
  PENDING_ORDER_REQUEST,
  PENDING_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  SHIP_ORDER_FAILURE,
  SHIP_ORDER_REQUEST,
  SHIP_ORDER_SUCCESS,
} from "./actionType";

export const getOrders = () => async (dispatch) => {
  dispatch({ type: GET_ORDERS_REQUEST });
  try {
    const { data } = await axios.get("/admin/orders");
    dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ORDERS_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const pendingOrder = (orderId) => async (dispatch) => {
  dispatch({ type: PENDING_ORDER_REQUEST });
  try {
    const { data } = await axios.put(`/admin/orders/${orderId}/pending`);
    dispatch({ type: PENDING_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PENDING_ORDER_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const placeOrder = (orderId) => async (dispatch) => {
  dispatch({ type: PLACE_ORDER_REQUEST });
  try {
    const { data } = await axios.put(`/admin/orders/${orderId}/place`);
    dispatch({ type: PLACE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const confirmOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CONFIRM_ORDER_REQUEST });
  try {
    const { data } = await axios.put(`/admin/orders/${orderId}/confirm`);
    dispatch({ type: CONFIRM_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONFIRM_ORDER_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};
export const cancelOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CANCEL_ORDER_REQUEST });
  try {
    const { data } = await axios.put(`/admin/orders/${orderId}/cancel`);
    dispatch({ type: CANCEL_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CANCEL_ORDER_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};
export const shipOrder = (orderId) => async (dispatch) => {
  dispatch({ type: SHIP_ORDER_REQUEST });
  try {
    const { data } = await axios.put(`/admin/orders/${orderId}/ship`);
    dispatch({ type: SHIP_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SHIP_ORDER_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const deliverOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELIVER_ORDER_REQUEST });
  try {
    const { data } = await axios.put(`/admin/orders/${orderId}/deliver`);
    dispatch({ type: DELIVER_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELIVER_ORDER_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELETE_ORDER_REQUEST });
  try {
    await axios.delete(`/admin/orders/${orderId}`);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: orderId });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};
