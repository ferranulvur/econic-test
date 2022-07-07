import {
  ORDER_LIST,
  ORDER_ERROR,
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

const INITIAL_STATE = {
  orders: [],
  error: {},
};

const initialStateIndividual = {
  order: {
    name: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postcode: "",
    notes: "",
    price: "",
    orderitems: [],
  },
  error: {},
};

export const OrderReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ORDER_LIST:
      return {
        ...state,
        orders: payload,
      };

    case ORDER_ERROR:
      return {
        error: payload,
      };

    default:
      return state;
  }
};

export const individualOrderReducer = (
  state = initialStateIndividual,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case INDIVIDUAL_ORDER_LIST:
      return {
        ...state,
        order: payload,
      };

    case INDIVIDUAL_ORDER_ERROR:
      return {
        ...state,
        error: payload,
      };
    case INDIVIDUAL_ORDER_CLEAN:
      return {
        ...state,
        order: [],
      };
    case INDIVIDUAL_ORDER_UPD_NAME:
      return {
        ...state,
        order: {
          ...state.order,
          name: payload,
        },
      };
    case INDIVIDUAL_ORDER_UPD_LASTNAME:
      return {
        ...state,
        order: {
          ...state.order,
          lastname: payload,
        },
      };
    case INDIVIDUAL_ORDER_UPD_EMAIL:
      return {
        ...state,
        order: {
          ...state.order,
          email: payload,
        },
      };

    case INDIVIDUAL_ORDER_UPD_PHONE:
      return {
        ...state,
        order: {
          ...state.order,
          phone: payload,
        },
      };
    case INDIVIDUAL_ORDER_UPD_ADDRESS:
      return {
        ...state,
        order: {
          ...state.order,
          address: payload,
        },
      };
    case INDIVIDUAL_ORDER_UPD_CITY:
      return {
        ...state,
        order: {
          ...state.order,
          city: payload,
        },
      };
    case INDIVIDUAL_ORDER_UPD_COUNTRY:
      return {
        ...state,
        order: {
          ...state.order,
          country: payload,
        },
      };
    case INDIVIDUAL_ORDER_UPD_POSTCODE:
      return {
        ...state,
        order: {
          ...state.order,
          postcode: payload,
        },
      };
    case INDIVIDUAL_ORDER_UPD_NOTES:
      return {
        ...state,
        order: {
          ...state.order,
          notes: payload,
        },
      };
    case INDIVIDUAL_ORDER_UPD_PRICE:
      return {
        ...state,
        order: {
          ...state.order,
          price: payload,
        },
      };
    case INDIVIDUAL_ORDER_UPD_ORDERITEMS:
      return {
        ...state,
        order: {
          ...state.order,
          orderitems: payload,
        },
      };

    default:
      return state;
  }
};
