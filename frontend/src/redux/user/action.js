import axios from "axios";
import { API_BASE_URL_V1, AUTH_API_BASE_URL } from "../../config/apiConfig";
import {
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

export const signUp = (reqData, authSignIn) => async (dispatch) => {
  dispatch({ type: SIGN_UP_REQUEST });
  try {
    axios.defaults.baseURL = AUTH_API_BASE_URL;
    const { data } = await axios.post("/signup", reqData);
    if (data.token) {
      authSignIn(data.token, data.admin);
    }
    dispatch({ type: SIGN_UP_SUCCESS });
  } catch (error) {
    dispatch({
      type: SIGN_UP_FAILURE,
      payload: error?.response?.data?.message,
    });
  } finally {
    axios.defaults.baseURL = API_BASE_URL_V1;
  }
};

export const signIn = (reqData, authSignIn) => async (dispatch) => {
  dispatch({ type: SIGN_IN_REQUEST });
  try {
    axios.defaults.baseURL = AUTH_API_BASE_URL;
    const { data } = await axios.post("/signin", reqData);
    if (data.token) {
      authSignIn(data.token, data.admin);
    }
    dispatch({ type: SIGN_IN_SUCCESS });
  } catch (error) {
    dispatch({
      type: SIGN_IN_FAILURE,
      payload: error?.response?.data?.message,
    });
  } finally {
    axios.defaults.baseURL = API_BASE_URL_V1;
  }
};

export const currentUser = (authSignOut) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const { data } = await axios.get("/users/profile");
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FAILURE,
      payload: error?.response?.data?.message,
    });
    if (error?.response?.data?.status === false) {
      dispatch(signOut(authSignOut));
    }
  }
};

export const signOut = (authSignOut) => async (dispatch) => {
  if (authSignOut) authSignOut();
  dispatch({ type: SIGN_OUT, payload: null });
};
