import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import RootReducer from "./RootReducer";
import thunk from "redux-thunk";

const middlewares = [thunk];
//const store = createStore(RootReducer, applyMiddleware(...middlewares));
const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
