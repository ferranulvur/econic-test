import { CATEGORY_LIST, CATEGORY_ERROR } from "./CategoryTypes";

const initialState = {
  categories: [],
  error: {},
};

export const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_LIST:
      return {
        ...state,
        categories: [...payload.categories],
        pages: payload.pages,
        page: payload.page,
      };

    case CATEGORY_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};
