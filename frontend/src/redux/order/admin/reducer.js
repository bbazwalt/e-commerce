import { SIGN_OUT } from "../../user/actionType";
import {
  CANCEL_ORDER_FAILURE,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CLEAR_ADMIN_ORDER_ERROR,
  CONFIRM_ORDER_FAILURE,
  CONFIRM_ORDER_REQUEST,
  CONFIRM_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELIVER_ORDER_FAILURE,
  DELIVER_ORDER_REQUEST,
  DELIVER_ORDER_SUCCESS,
  FIND_ORDERS_FAILURE,
  FIND_ORDERS_REQUEST,
  FIND_ORDERS_SUCCESS,
  PENDING_ORDER_SUCCESS,
  PLACE_ORDER_SUCCESS,
  SHIP_ORDER_FAILURE,
  SHIP_ORDER_REQUEST,
  SHIP_ORDER_SUCCESS,
} from "./actionType";

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
};

export const adminOrderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FIND_ORDERS_REQUEST:
    case CONFIRM_ORDER_REQUEST:
    case SHIP_ORDER_REQUEST:
    case DELIVER_ORDER_REQUEST:
    case CANCEL_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FIND_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: payload,
        error: null,
      };
    case PENDING_ORDER_SUCCESS:
    case PLACE_ORDER_SUCCESS:
    case CONFIRM_ORDER_SUCCESS:
    case CANCEL_ORDER_SUCCESS:
    case SHIP_ORDER_SUCCESS:
    case DELIVER_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: state.orders.map((order) =>
          order.id === payload.id ? payload : order,
        ),
        error: null,
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: state.orders.filter((order) => order.id !== payload),
        error: null,
      };
    case FIND_ORDERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        orders: [],
        error: payload,
      };
    case CONFIRM_ORDER_FAILURE:
    case SHIP_ORDER_FAILURE:
    case DELIVER_ORDER_FAILURE:
    case CANCEL_ORDER_FAILURE:
    case DELETE_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case CLEAR_ADMIN_ORDER_ERROR:
      return {
        ...state,
        error: null,
      };
    case SIGN_OUT:
      return {
        orders: [],
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};
