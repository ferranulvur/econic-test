import axios from "axios";
import {
  ORDER_LIST,
  ORDER_ERROR,
  INDIVIDUAL_ORDER_UPD_USER_ID,
  INDIVIDUAL_ORDER_UPD_NAME,
  INDIVIDUAL_ORDER_UPD_LASTNAME,
  INDIVIDUAL_ORDER_UPD_EMAIL,
  INDIVIDUAL_ORDER_UPD_PHONE,
  INDIVIDUAL_ORDER_UPD_ADDRESS,
  INDIVIDUAL_ORDER_UPD_CITY,
  INDIVIDUAL_ORDER_UPD_COUNTRY,
  INDIVIDUAL_ORDER_UPD_POSTCODE,
  INDIVIDUAL_ORDER_UPD_NOTES,
  INDIVIDUAL_ORDER_UPD_PRICE,
  INDIVIDUAL_ORDER_UPD_ORDERITEMS,
  INDIVIDUAL_ORDER_CLEAN,
  INDIVIDUAL_ORDER_ERROR,
  INDIVIDUAL_ORDER_LIST,
} from "./OrderTypes";

export const listOrders = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/order`);

    dispatch({
      type: ORDER_LIST,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ORDER_ERROR,
      payload: message,
    });
  }
};

export const listOrder = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/order/fetch-order/${id}`, {
      headers: {
        //Authorization: `Bearer ${userInfo.user.token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(data);
    dispatch({
      type: INDIVIDUAL_ORDER_LIST,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: INDIVIDUAL_ORDER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateOrderState = (key, value) => async (dispatch) => {
  try {
    switch (key) {
      case "name":
        dispatch({
          type: INDIVIDUAL_ORDER_UPD_NAME,
          payload: value,
        });
        break;
      case "userId":
        dispatch({
          type: INDIVIDUAL_ORDER_UPD_USER_ID,
          payload: value,
        });
        break;
      case "lastname":
        dispatch({
          type: INDIVIDUAL_ORDER_UPD_LASTNAME,
          payload: value,
        });
        break;
      case "email":
        dispatch({
          type: INDIVIDUAL_ORDER_UPD_EMAIL,
          payload: value,
        });
        break;
      case "phone":
        dispatch({
          type: INDIVIDUAL_ORDER_UPD_PHONE,
          payload: value,
        });
        break;
      case "country":
        dispatch({
          type: INDIVIDUAL_ORDER_UPD_COUNTRY,
          payload: value,
        });
        break;
      case "address":
        dispatch({
          type: INDIVIDUAL_ORDER_UPD_ADDRESS,
          payload: value,
        });
        break;
      case "city":
        dispatch({
          type: INDIVIDUAL_ORDER_UPD_CITY,
          payload: value,
        });
        break;
      case "postcode":
        dispatch({
          type: INDIVIDUAL_ORDER_UPD_POSTCODE,
          payload: value,
        });
        break;
      case "notes":
        dispatch({
          type: INDIVIDUAL_ORDER_UPD_NOTES,
          payload: value,
        });
        break;
      case "price":
        dispatch({
          type: INDIVIDUAL_ORDER_UPD_PRICE,
          payload: value,
        });
        break;
      case "orderItems":
        dispatch({
          type: INDIVIDUAL_ORDER_UPD_ORDERITEMS,
          payload: value,
        });
        break;
      default:
        break;
    }
  } catch (error) {
    dispatch({
      type: INDIVIDUAL_ORDER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const cleanOrder = () => async (dispatch) => {
  try {
    dispatch({
      type: INDIVIDUAL_ORDER_CLEAN,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: INDIVIDUAL_ORDER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
