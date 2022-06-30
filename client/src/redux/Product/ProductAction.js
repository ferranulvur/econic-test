import axios from "axios";

import {
  PRODUCT_LIST,
  PRODUCT_ERROR,
  PRODUCT_UPDATE_FAILURE,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_ADD_FAILURE,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  INDIVIDUAL_PRODUCT_LIST,
  INDIVIDUAL_PRODUCT_ERROR,
  INDIVIDUAL_PRODUCT_CLEAN,
  INDIVIDUAL_PRODUCT_UPD_NAME,
  INDIVIDUAL_PRODUCT_UPD_DESCRIPTION,
  INDIVIDUAL_PRODUCT_UPD_PRICE,
  INDIVIDUAL_PRODUCT_UPD_IMAGES,
  INDIVIDUAL_PRODUCT_UPD_CATEGORY,
  INDIVIDUAL_PRODUCT_UPD_PUBLIC_IMAGE,
  INDIVIDUAL_PRODUCT_UPD_INSTOCK,
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

export const listProduct = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/products/fetch-product/${id}`, {
      headers: {
        //Authorization: `Bearer ${userInfo.user.token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(data);
    dispatch({
      type: INDIVIDUAL_PRODUCT_LIST,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: INDIVIDUAL_PRODUCT_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (key, value) => async (dispatch) => {
  try {
    switch (key) {
      case "name":
        dispatch({
          type: INDIVIDUAL_PRODUCT_UPD_NAME,
          payload: value,
        });
        break;
      case "description":
        dispatch({
          type: INDIVIDUAL_PRODUCT_UPD_DESCRIPTION,
          payload: value,
        });
        break;
      case "price":
        dispatch({
          type: INDIVIDUAL_PRODUCT_UPD_PRICE,
          payload: value,
        });
        break;
      case "images":
        dispatch({
          type: INDIVIDUAL_PRODUCT_UPD_IMAGES,
          payload: value,
        });
        break;
      case "category":
        dispatch({
          type: INDIVIDUAL_PRODUCT_UPD_CATEGORY,
          payload: value,
        });
        break;
      case "publicImage":
        dispatch({
          type: INDIVIDUAL_PRODUCT_UPD_PUBLIC_IMAGE,
          payload: value,
        });
        break;
      case "inStock":
        dispatch({
          type: INDIVIDUAL_PRODUCT_UPD_INSTOCK,
          payload: value,
        });
        break;
      default:
        break;
    }
  } catch (error) {
    dispatch({
      type: INDIVIDUAL_PRODUCT_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const cleanProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: INDIVIDUAL_PRODUCT_CLEAN,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: INDIVIDUAL_PRODUCT_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProductAction =
  (id, name, description, category, price, inStock, publicImage, images) =>
  async (dispatch) => {
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
        {
          id,
          name,
          description,
          category,
          price,
          inStock,
          publicImage,
          images,
        },
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

export const deleteProductAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    //const { userLogin: {userInfo} } = getState();

    const config = {
      headers: {
        //'Authorization': `Bearer ${userInfo.user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/products/delete-product`,
      { id },
      config
    );

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_DELETE_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const addProductAction =
  (name, description, category, price, inStock, image) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_ADD_REQUEST });
      //const { userLogin: {userInfo} } = getState();

      const config = {
        headers: {
          //'Authorization': `Bearer ${userInfo.user.token}`,
          "Content-Type": "application/json",
        },
      };

      const formData = new FormData();

      /* Collection formData Fields */
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("inStock", inStock);
      formData.append("file", image);

      /* Cloudinary formData Fields */
      formData.append("upload_preset", "vikings");

      /* Cloudinary Post */
      const cloudinaryData = await axios.post(
        "https://api.cloudinary.com/v1_1/dev-empty/image/upload",
        formData,
        config
      );

      /* Cloudinary formData Fields */
      formData.append("publicImage", cloudinaryData.data.public_id);

      /* add-product POST Request */
      const { data } = await axios.post(
        `/products/add-product`,
        formData,
        config
      );

      dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: PRODUCT_ADD_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
