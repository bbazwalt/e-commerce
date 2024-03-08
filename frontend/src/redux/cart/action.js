import axios from "axios";
import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./actionType";

export const getCart = () => async (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });
  try {
    const { data } = await axios.get("/cart");
    dispatch({ type: GET_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CART_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const addItemToCart = (reqData) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
  try {
    const { data } = await axios.post("/cart", reqData);
    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
    dispatch(getCart());
    dispatch(reqData.navigate("/cart"));
  } catch (error) {
    dispatch({
      type: ADD_ITEM_TO_CART_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const updateCartItem = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });
  try {
    const { data } = await axios.put(
      `/cart-items/${reqData.cartItemId}`,
      reqData.data,
    );
    dispatch(getCart());
    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_CART_ITEM_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const removeCartItem = (cartItemId) => async (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM_REQUEST });
  try {
    const { data } = await axios.delete(`/cart-items/${cartItemId}`);
    dispatch(getCart());
    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REMOVE_CART_ITEM_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};
