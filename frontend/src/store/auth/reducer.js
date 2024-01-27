import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNOUT,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./actionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case SIGNIN_REQUEST:
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case SIGNUP_SUCCESS:
    case SIGNIN_SUCCESS:
      return { ...state, isLoading: false, error: null, jwt: action.payload };
    case GET_USER_SUCCESS:
      return { ...state, isLoading: false, error: null, user: action.payload };
    case SIGNUP_FAILURE:
    case SIGNIN_FAILURE:
    case GET_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case SIGNOUT:
      return initialState;
    default:
      return state;
  }
};
