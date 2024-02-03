import { getApi } from "../../../api/apiConfig";

export const getOrders = () => async (dispatch) => {
  dispatch({ type: "GET_ORDERS_REQUEST" });
  try {
    const { data } = await  getApi().get("/api/v1/admin/orders");
    dispatch({ type: "GET_ORDERS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_ORDERS_FAILURE", payload: error.message });
  }
};

export const confirmOrder = (orderId) => async (dispatch) => {
  dispatch({ type: "CONFIRM_ORDER_REQUEST" });
  try {
    const { data } = await  getApi().put(`/api/v1/admin/orders/${orderId}/confirm`);
    dispatch({ type: "CONFIRM_ORDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "CONFIRM_ORDER_FAILURE", payload: error.message });
  }
};

export const shipOrder = (orderId) => async (dispatch) => {
  dispatch({ type: "SHIP_ORDER_REQUEST" });
  try {
    const { data } = await  getApi().put(`/api/v1/admin/orders/${orderId}/ship`);
    dispatch({ type: "SHIP_ORDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "SHIP_ORDER_FAILURE", payload: error.message });
  }
};

export const deliverOrder = (orderId) => async (dispatch) => {
  dispatch({ type: "DELIVER_ORDER_REQUEST" });
  try {
    const { data } = await  getApi().put(`/api/v1/admin/orders/${orderId}/deliver`);
    dispatch({ type: "DELIVER_ORDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DELIVER_ORDER_FAILURE", payload: error.message });
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  dispatch({ type: "CANCEL_ORDER_REQUEST" });
  try {
    const { data } = await  getApi().put(`/api/v1/admin/orders/${orderId}/cancel`);
    dispatch({ type: "CANCEL_ORDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "CANCEL_ORDER_FAILURE", payload: error.message });
  }
};

export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch({ type: "DELETE_ORDER_REQUEST" });
  try {
    const { data } = await  getApi().delete(`/api/v1/admin/orders/${orderId}/delete`);
    dispatch({ type: "DELETE_ORDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DELETE_ORDER_FAILURE", payload: error.message });
  }
};
