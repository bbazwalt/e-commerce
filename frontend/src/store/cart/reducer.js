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

const initialState = {
  cart: null,
  cartItems: [],
  isLoading: false,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART_REQUEST:
      return { ...state, isLoading: true, error: null };
    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        error: null,
        cartItems: [...state.cartItems, action.payload.cartItems],
        cart: action.payload,
        isLoading: false,
      };
    case ADD_ITEM_TO_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
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
        cartItems: action.payload.cartItems,
        cart: action.payload,
        isLoading: false,
      };
    case GET_CART_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
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
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
        isLoading: false,
      };
    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        error: null,
        isLoading: false,
      };
    case REMOVE_CART_ITEM_FAILURE:
    case UPDATE_CART_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
