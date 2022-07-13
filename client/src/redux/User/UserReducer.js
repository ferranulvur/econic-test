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
  USER_UPD_ORDERS,
} from "./UserTypes";

const initialState = {
  users: [],
  error: {},
};

const initialStateIndividual = {
  user: {
    id: "",
    username: "",
    name: "",
    lastname: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    postcode: "",
  },
  error: {},
};

export const userReducer = (state = initialStateIndividual, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LIST:
      return {
        ...state,
        user: payload,
      };

    case USER_ERROR:
      return {
        ...state,
        error: payload,
      };
    case USER_CLEAN:
      return {
        ...state,
        user: [],
      };
    case USER_UPD_USERNAME:
      return {
        ...state,
        user: {
          ...state.user,
          username: payload,
        },
      };
    case USER_UPD_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          name: payload,
        },
      };
    case USER_UPD_LASTNAME:
      return {
        ...state,
        user: {
          ...state.user,
          lastname: payload,
        },
      };
    case USER_UPD_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          email: payload,
        },
      };
    case USER_UPD_PHONE:
      return {
        ...state,
        user: {
          ...state.user,
          phone: payload,
        },
      };
    case USER_UPD_ADDRESS:
      return {
        ...state,
        user: {
          ...state.user,
          address: payload,
        },
      };
    case USER_UPD_CITY:
      return {
        ...state,
        user: {
          ...state.user,
          city: payload,
        },
      };
    case USER_UPD_COUNTRY:
      return {
        ...state,
        user: {
          ...state.user,
          country: payload,
        },
      };
    case USER_UPD_POSTCODE:
      return {
        ...state,
        user: {
          ...state.user,
          postcode: payload,
        },
      };
    case USER_UPD_ORDERS:
      return {
        ...state,
        user: {
          ...state.user,
          orders: payload,
        },
      };

    default:
      return state;
  }
};

export const userUpdateReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_UPD_REQUEST:
      return { loading: true };
    case USER_UPD_SUCCESS:
      return { loading: false, success: true };
    case USER_UPD_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
