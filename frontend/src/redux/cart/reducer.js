import { SIGN_OUT } from "../user/actionType";
import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  CLEAR_CART_ERROR,
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
    case FIND_CART_REQUEST:
      return {
        error: null,
        ...state,
        isLoading: false,
      };
    case FIND_CART_SUCCESS:
      return {
        ...state,
        error: null,
        cartItems: payload.cartItems,
        cart: payload,
        isLoading: false,
      };
    case FIND_CART_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case DELETE_CART_ITEM_REQUEST:
    case UPDATE_CART_ITEM_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DELETE_CART_ITEM_SUCCESS:
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
    case DELETE_CART_ITEM_FAILURE:
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
