import { SIGN_OUT } from "../../user/actionType";
import {
  CLEAR_ORDER_ERROR,
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_PAYMENT_FAILURE,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  FIND_ORDERS_FAILURE,
  FIND_ORDERS_REQUEST,
  FIND_ORDERS_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_USER_ADDRESSES_FAILURE,
  GET_USER_ADDRESSES_REQUEST,
  GET_USER_ADDRESSES_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
} from "./actionType";

const initialState = {
  orders: [],
  order: null,
  error: null,
  isLoading: false,
};

export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_ORDER_REQUEST:
    case FIND_ORDERS_REQUEST:
    case GET_ORDER_BY_ID_REQUEST:
    case GET_USER_ADDRESSES_REQUEST:
    case CREATE_PAYMENT_REQUEST:
    case UPDATE_PAYMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: payload,
        error: null,
      };
    case FIND_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: payload,
        error: null,
      };
    case GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        order: payload,
      };
    case GET_USER_ADDRESSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addresses: payload,
        error: null,
      };
    case CREATE_PAYMENT_SUCCESS:
    case UPDATE_PAYMENT_SUCCESS:
      return { ...state, isLoading: false, error: null };
    case CREATE_ORDER_FAILURE:
    case FIND_ORDERS_FAILURE:
    case GET_ORDER_BY_ID_FAILURE:
    case GET_USER_ADDRESSES_FAILURE:
    case CREATE_PAYMENT_FAILURE:
    case UPDATE_PAYMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case CLEAR_ORDER_ERROR:
      return {
        ...state,
        error: null,
      };
    case SIGN_OUT:
      return {
        ...state,
        orders: [],
        order: null,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};
