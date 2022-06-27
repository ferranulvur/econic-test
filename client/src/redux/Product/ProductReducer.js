import {
  PRODUCT_LIST,
  PRODUCT_ERROR,
  PRODUCT_UPDATE_FAILURE,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "./ProductTypes";

const initialState = {
  products: [],
  error: {},
};

export const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_LIST:
      return {
        ...state,
        products: [...payload.products],
        pages: payload.pages,
        page: payload.page,
      };

    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export const productUpdateReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_UPDATE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
