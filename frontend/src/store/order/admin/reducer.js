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
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  PENDING_ORDER_SUCCESS,
  PLACE_ORDER_SUCCESS,
  SHIP_ORDER_FAILURE,
  SHIP_ORDER_REQUEST,
  SHIP_ORDER_SUCCESS,
} from "./actionType";

const initialState = {
  isLoading: false,
  orders: [],
  error: null,
};

export const adminOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
    case CONFIRM_ORDER_REQUEST:
    case SHIP_ORDER_REQUEST:
    case DELIVER_ORDER_REQUEST:
    case CANCEL_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_ORDERS_SUCCESS:
      return {
        ...state,

        isLoading: false,

        orders: action.payload,
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
          order.id === action.payload.id ? action.payload : order,
        ),
        error: null,
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: state.orders.filter((order) => order.id !== action.payload),
        error: null,
      };
    case GET_ORDERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        orders: [],
        error: action.payload,
      };
    case CONFIRM_ORDER_FAILURE:
    case SHIP_ORDER_FAILURE:
    case DELIVER_ORDER_FAILURE:
    case CANCEL_ORDER_FAILURE:
    case DELETE_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CLEAR_ADMIN_ORDER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};
