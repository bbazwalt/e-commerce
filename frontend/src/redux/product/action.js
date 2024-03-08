import axios from "axios";
import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  FIND_ALL_CATEGORIES_FAILURE,
  FIND_ALL_CATEGORIES_REQUEST,
  FIND_ALL_CATEGORIES_SUCCESS,
  FIND_ALL_PRODUCTS_FAILURE,
  FIND_ALL_PRODUCTS_REQUEST,
  FIND_ALL_PRODUCTS_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
} from "./actionType";

export const findProductsByCategory = (category) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  try {
    const { data } = await axios.get(`/products/category/${category}`);
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: { category, data } });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCTS_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  const {
    colors,
    storages,
    memories,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;
  const colorParam = colors ? colors.split(",") : [];
  const storageParam = storages ? storages.split(",") : [];
  const memoryParam = memories ? memories.split(",") : [];
  try {
    const { data } = await axios.get(
      `/products?colors=${colorParam}&storages=${storageParam}&memories=${memoryParam}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCTS_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const findProductById = (id) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  try {
    const { data } = await axios.get(`/products/${id}`);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
    dispatch(findProductsByCategory(data.category.name));
  } catch (error) {
    console.log(error);
    dispatch({
      type: FIND_PRODUCT_BY_ID_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const findAllProducts = () => async (dispatch) => {
  dispatch({ type: FIND_ALL_PRODUCTS_REQUEST });
  try {
    const { data } = await axios.get("/admin/products");
    dispatch({ type: FIND_ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_ALL_PRODUCTS_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    const { data } = await axios.post("/admin/products", productData);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    await axios.delete(`/admin/products/${productId}`);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const createCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    const { data } = await axios.post("/admin/categories", categoryData);
    dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const findAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: FIND_ALL_CATEGORIES_REQUEST });
    const { data } = await axios.get("/admin/categories");
    dispatch({ type: FIND_ALL_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_ALL_CATEGORIES_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};
