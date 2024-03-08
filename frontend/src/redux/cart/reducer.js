import { SIGN_OUT } from "../user/actionType";
import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  CLEAR_CART_ERROR,
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

const initialState = {
  cart: null,
  cartItems: [],
  isLoading: false,
  error: null,
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ITEM_TO_CART_REQUEST:
      return { ...state, isLoading: true, error: null };
    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        error: null,
        cartItems: [...state.cartItems, payload.cartItems],
        cart: payload,
        isLoading: false,
      };
    case ADD_ITEM_TO_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case GET_CART_REQUEST:
      return {
        error: null,
        ...state,
        isLoading: false,
      };
    case GET_CART_SUCCESS:
      return {
        ...state,
        error: null,
        cartItems: payload.cartItems,
        cart: payload,
        isLoading: false,
      };
    case GET_CART_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case REMOVE_CART_ITEM_REQUEST:
    case UPDATE_CART_ITEM_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        error: null,
        cartItems: state.cartItems.filter((item) => item.id !== payload),
        isLoading: false,
      };
    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === payload.id ? payload : item,
        ),
        error: null,
        isLoading: false,
      };
    case REMOVE_CART_ITEM_FAILURE:
    case UPDATE_CART_ITEM_FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case CLEAR_CART_ERROR:
      return {
        ...state,
        error: null,
      };
    case SIGN_OUT:
      return {
        ...state,
        cart: null,
        cartItems: [],
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};
