import {
  CLEAR_PRODUCT_ERROR,
  CLEAR_PRODUCT_MESSAGE,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
} from "./actionType";

const initialState = {
  products: [],
  product: null,
  productsByCategory: {},
  isLoading: false,
  error: null,
  message: null,
};

export const productReducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case FIND_PRODUCTS_REQUEST:
    case FIND_PRODUCT_BY_ID_REQUEST:
    case GET_ALL_PRODUCTS_REQUEST:
    case CREATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
      return { ...state, isLoading: true, error: null, message: null };
    case FIND_PRODUCTS_SUCCESS:
      const { category, data } = payload;
      return {
        ...state,
        isLoading: false,
        message: null,
        error: null,
        products: payload,
        productsByCategory: {
          ...state.productsByCategory,
          [category]: data,
        },
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        message: "Product created successfully",
      };
    case FIND_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        message: null,
        product: payload,
      };
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        message: null,
        products: payload,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        message: null,
        products: state.products.filter((item) => item.id !== payload),
      };

    case FIND_PRODUCTS_FAILURE:
    case FIND_PRODUCT_BY_ID_FAILURE:
    case GET_ALL_PRODUCTS_FAILURE:
    case CREATE_PRODUCT_FAILURE:
    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: null,
        error: payload,
      };
    case CLEAR_PRODUCT_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case CLEAR_PRODUCT_ERROR:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
