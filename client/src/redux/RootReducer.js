import { combineReducers } from "redux";
import {
  productReducer,
  productUpdateReducer,
  productDeleteReducer,
  productAddReducer,
  individualProductReducer,
} from "./Product/ProductReducer";
import OrderReducer from "./Order/OrderReducer";
import PasswordReducer from "./ResetPassword/PasswordReducer";

export default combineReducers({
  productAddReducer,
  individualProductReducer,
  productDeleteReducer,
  productUpdateReducer,
  productReducer,
  OrderReducer,
  PasswordReducer,
});
