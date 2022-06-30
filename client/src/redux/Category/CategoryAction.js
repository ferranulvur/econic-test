import axios from "axios";

import { CATEGORY_LIST, CATEGORY_ERROR } from "./CategoryTypes";

export const listCategories =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/categories?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: CATEGORY_LIST,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CATEGORY_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
