import {
  CLEAR_AUTH_ERROR,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "./actionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_UP_REQUEST:
    case SIGN_IN_REQUEST:
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return { ...state, isLoading: false, error: null };
    case GET_USER_SUCCESS:
      return { ...state, isLoading: false, error: null, user: payload };
    case SIGN_UP_FAILURE:
    case SIGN_IN_FAILURE:
    case GET_USER_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case SIGN_OUT:
      return { ...state, user: null, error: null, isLoading: false };
    case CLEAR_AUTH_ERROR:
      return { ...state, isLoading: false, error: null };
    default:
      return state;
  }
};
