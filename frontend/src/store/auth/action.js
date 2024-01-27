import axios from "axios";
import { API_BASE_URL } from "../../api/apiConfig";
import { getCart } from "../cart/action";
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

const signupRequest = () => ({ type: SIGNUP_REQUEST });
const signupSuccess = (user) => ({ type: SIGNUP_SUCCESS, payload: user });
const signupFailure = (error) => ({ type: SIGNUP_FAILURE, payload: error });

export const signup = (userData) => async (dispatch) => {
  dispatch(signupRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;
    if (user.jwt) {
      localStorage.removeItem("jwt");
      localStorage.setItem("jwt", user.jwt);
    }
    dispatch(signupSuccess(user.jwt));
  } catch (error) {
    error.response && dispatch(signupFailure(error.response.data));
  }
};

const signinRequest = () => ({ type: SIGNIN_REQUEST });
const signinSuccess = (user) => ({ type: SIGNIN_SUCCESS, payload: user });
const signinFailure = (error) => ({ type: SIGNIN_FAILURE, payload: error });

export const signin = (userData) => async (dispatch) => {
  dispatch(signinRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    if (user.jwt) {
      localStorage.removeItem("jwt");
      localStorage.setItem("jwt", user.jwt);
      dispatch(signinSuccess(user.jwt));
      dispatch(getCart());
    }
  } catch (error) {
    dispatch(signinFailure(error.response.data.message));
  }
};

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const user = response.data;
    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

export const signout = () => async (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: SIGNOUT });
};
