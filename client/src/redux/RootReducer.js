import { combineReducers } from "redux";
import {
  productReducer,
  productUpdateReducer,
  productDeleteReducer,
  productAddReducer,
  individualProductReducer,
} from "./Product/ProductReducer";
import { OrderReducer, individualOrderReducer } from "./Order/OrderReducer";
import PasswordReducer from "./ResetPassword/PasswordReducer";
import { categoryReducer } from "./Category/CategoryReducer";

export default combineReducers({
  productAddReducer,
  individualProductReducer,
  productDeleteReducer,
  productUpdateReducer,
  productReducer,
  OrderReducer,
  individualOrderReducer,
  PasswordReducer,
  categoryReducer,
});
