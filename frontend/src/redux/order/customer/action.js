import axios from "axios";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_PAYMENT_FAILURE,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  FIND_ORDERS_FAILURE,
  FIND_ORDERS_REQUEST,
  FIND_ORDERS_SUCCESS,
  FIND_ORDER_BY_ID_FAILURE,
  FIND_ORDER_BY_ID_REQUEST,
  FIND_ORDER_BY_ID_SUCCESS,
  FIND_USER_ADDRESSES_FAILURE,
  FIND_USER_ADDRESSES_REQUEST,
  FIND_USER_ADDRESSES_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
} from "./actionType";

export const createOrder = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const { data } = await axios.post("/orders", reqData.address);
    if (data.id) {
      reqData.navigate({ search: `step=3&orderId=${data.id}` });
    }
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const findOrders = (statuses) => async (dispatch) => {
  dispatch({ type: FIND_ORDERS_REQUEST });
  try {
    const queryString = statuses.join(",");
    const { data } = await axios.get(`/orders?statuses=${queryString}`);
    dispatch({ type: FIND_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_ORDERS_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const findOrderById = (orderId, navigate) => async (dispatch) => {
  dispatch({ type: FIND_ORDER_BY_ID_REQUEST });
  try {
    const { data } = await axios.get(`/orders/${orderId}`);
    dispatch({ type: FIND_ORDER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_ORDER_BY_ID_FAILURE,
      payload: error?.response?.data?.message,
    });
    if (navigate) {
      navigate("/");
    }
  }
};

export const findUserAddresses = () => async (dispatch) => {
  dispatch({ type: FIND_USER_ADDRESSES_REQUEST });
  try {
    const { data } = await axios.get("/users/addresses");
    dispatch({ type: FIND_USER_ADDRESSES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_USER_ADDRESSES_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const createPayment = (orderId) => async (dispatch) => {
  dispatch({ type: CREATE_PAYMENT_REQUEST });
  try {
    const { data } = await axios.post(`/payments/${orderId}`, {});
    if (data.paymentLinkUrl) {
      window.location.href = data.paymentLinkUrl;
    }
    dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PAYMENT_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const bypassPayment = (orderId, navigate) => async (dispatch) => {
  dispatch({ type: UPDATE_PAYMENT_REQUEST });
  try {
    const { data } = await axios.post(`/payments/place/${orderId}`, {});
    dispatch({ type: UPDATE_PAYMENT_SUCCESS, payload: data });
    navigate(`/payment/${orderId}`);
  } catch (error) {
    dispatch({
      type: UPDATE_PAYMENT_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const updatePayment = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PAYMENT_REQUEST });
  try {
    const { data } = await axios.get(
      `/payments?paymentId=${reqData.paymentId}&orderId=${reqData.orderId}`,
    );
    dispatch({ type: UPDATE_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PAYMENT_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};
