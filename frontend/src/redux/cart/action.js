import axios from "axios";
import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  FIND_CART_FAILURE,
  FIND_CART_REQUEST,
  FIND_CART_SUCCESS,
  DELETE_CART_ITEM_FAILURE,
  DELETE_CART_ITEM_REQUEST,
  DELETE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./actionType";

export const findCart = () => async (dispatch) => {
  dispatch({ type: FIND_CART_REQUEST });
  try {
    const { data } = await axios.get("/cart");
    dispatch({ type: FIND_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_CART_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const addItemToCart = (reqData) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
  try {
    const { data } = await axios.post("/cart", reqData);
    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
    dispatch(findCart());
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
    dispatch(findCart());
    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_CART_ITEM_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const deleteCartItem = (cartItemId) => async (dispatch) => {
  dispatch({ type: DELETE_CART_ITEM_REQUEST });
  try {
    const { data } = await axios.delete(`/cart-items/${cartItemId}`);
    dispatch(findCart());
    dispatch({ type: DELETE_CART_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_CART_ITEM_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};
