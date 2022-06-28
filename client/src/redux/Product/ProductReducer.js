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
} from "./ProductTypes";

const initialState = {
  products: [],
  error: {},
};

const initialStateIndividual = {
  product: {
    name: "",
    description: "",
    image: "",
    type: "",
    price: "",
    inStock: "",
  },
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

export const individualProductReducer = (
  state = initialStateIndividual,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case INDIVIDUAL_PRODUCT_LIST:
      return {
        ...state,
        product: payload,
      };

    case INDIVIDUAL_PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
      };
    case INDIVIDUAL_PRODUCT_CLEAN:
      return {
        ...state,
        product: [],
      };

    default:
      return state;
  }
};

export const productUpdateReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_UPDATE_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
export const productAddReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_ADD_REQUEST:
      return { loading: true };
    case PRODUCT_ADD_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_ADD_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
