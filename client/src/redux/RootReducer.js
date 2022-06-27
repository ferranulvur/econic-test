import { combineReducers } from "redux";
import { productReducer, productUpdateReducer } from "./Product/ProductReducer";
import OrderReducer from "./Order/OrderReducer";
import PasswordReducer from "./ResetPassword/PasswordReducer";

export default combineReducers({
  productUpdateReducer,
  productReducer,
  OrderReducer,
  PasswordReducer,
});
