import {
  CLEAR_USER_ERROR,
  FIND_REQ_USER_FAILURE,
  FIND_REQ_USER_REQUEST,
  FIND_REQ_USER_SUCCESS,
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

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_UP_REQUEST:
    case SIGN_IN_REQUEST:
    case FIND_REQ_USER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return { ...state, isLoading: false, error: null };
    case FIND_REQ_USER_SUCCESS:
      return { ...state, isLoading: false, error: null, user: payload };
    case SIGN_UP_FAILURE:
    case SIGN_IN_FAILURE:
    case FIND_REQ_USER_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case CLEAR_USER_ERROR:
      return { ...state, error: null };
    case SIGN_OUT:
      return { ...state, user: null, isLoading: false, error: null };
    default:
      return state;
  }
};
