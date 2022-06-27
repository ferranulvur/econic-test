import axios from "axios";

import {
  PRODUCT_LIST,
  PRODUCT_ERROR,
  PRODUCT_UPDATE_FAILURE,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "./ProductTypes";

export const listProducts =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: PRODUCT_LIST,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateProductAction =
  (id, name, description, type, price, inStock, image) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });
      //const { userLogin: {userInfo} } = getState();

      const config = {
        headers: {
          //'Authorization': `Bearer ${userInfo.user.token}`,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/products/edit-product`,
        { id, name, description, type, price, inStock, image },
        config
      );

      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: PRODUCT_UPDATE_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
