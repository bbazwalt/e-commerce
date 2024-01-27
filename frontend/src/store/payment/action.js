import { getApi } from "../../api/apiConfig";

export const createPayment = (orderId) => async (dispatch) => {
  dispatch({ type: "CREATE_PAYMENT_REQUEST" });
  try {
    const { data } = await  getApi(localStorage.getItem("jwt")).post(`/api/v1/payments/${orderId}`, {});
    if (data.payment_link_url) {
      window.location.href = data.payment_link_url;
    }
    dispatch({ type: "CREATE_PAYMENT_SUCCESS" });
  } catch (error) {
    dispatch({ type: "CREATE_PAYMENT_FAILURE", payload: error.message });
  }
};

export const skipPayment = (orderId, navigate) => async (dispatch) => {
  dispatch({ type: "UPDATE_PAYMENT_REQUEST" });
  try {
    const { data } = await  getApi(localStorage.getItem("jwt")).post(`/api/v1/payments/place/${orderId}`, {});
    dispatch({ type: "UPDATE_PAYMENT_SUCCESS", payload: data });
    navigate(`/payment/${orderId}`);
  } catch (error) {
    dispatch({ type: "UPDATE_PAYMENT_FAILURE", payload: error.message });
  }
};

export const updatePayment = (reqData) => async (dispatch) => {
  dispatch({ type: "UPDATE_PAYMENT_REQUEST" });
  try {
    const { data } = await  getApi(localStorage.getItem("jwt")).get(
      `/api/v1/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`
    );
    dispatch({ type: "UPDATE_PAYMENT_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "UPDATE_PAYMENT_FAILURE", payload: error.message });
  }
};
