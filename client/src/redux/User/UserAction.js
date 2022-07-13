import axios from "axios";

import {
  USER_LIST,
  USER_ERROR,
  USER_CLEAN,
  USER_UPD_USERNAME,
  USER_UPD_NAME,
  USER_UPD_LASTNAME,
  USER_UPD_EMAIL,
  USER_UPD_PHONE,
  USER_UPD_COUNTRY,
  USER_UPD_CITY,
  USER_UPD_ADDRESS,
  USER_UPD_POSTCODE,
  USER_UPD_FAILURE,
  USER_UPD_REQUEST,
  USER_UPD_SUCCESS,
} from "./UserTypes";

export const listUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/user/${id}`, {
      headers: {
        //Authorization: `Bearer ${userInfo.user.token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(data);
    dispatch({
      type: USER_LIST,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (key, value) => async (dispatch) => {
  try {
    switch (key) {
      case "username":
        dispatch({
          type: USER_UPD_USERNAME,
          payload: value,
        });
        break;
      case "name":
        dispatch({
          type: USER_UPD_NAME,
          payload: value,
        });
        break;
      case "lastname":
        dispatch({
          type: USER_UPD_LASTNAME,
          payload: value,
        });
        break;
      case "email":
        dispatch({
          type: USER_UPD_EMAIL,
          payload: value,
        });
        break;
      case "phone":
        dispatch({
          type: USER_UPD_PHONE,
          payload: value,
        });
        break;
      case "address":
        dispatch({
          type: USER_UPD_ADDRESS,
          payload: value,
        });
        break;
      case "city":
        dispatch({
          type: USER_UPD_CITY,
          payload: value,
        });
        break;
      case "country":
        dispatch({
          type: USER_UPD_COUNTRY,
          payload: value,
        });
        break;
      case "postcode":
        dispatch({
          type: USER_UPD_POSTCODE,
          payload: value,
        });
        break;
      default:
        break;
    }
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserAction =
  (
    id,
    username,
    name,
    lastname,
    email,
    phone,
    address,
    city,
    country,
    postcode
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_UPD_REQUEST });
      //const { userLogin: {userInfo} } = getState();

      const config = {
        headers: {
          //'Authorization': `Bearer ${userInfo.user.token}`,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/user/edit-user`,
        {
          id,
          username,
          name,
          lastname,
          email,
          phone,
          country,
          city,
          address,
          postcode,
        },
        config
      );

      console.log(data);
      dispatch({ type: USER_UPD_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: USER_UPD_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
