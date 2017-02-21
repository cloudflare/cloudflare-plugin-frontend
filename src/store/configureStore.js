import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import rootReducer from "../reducers";
import { routerMiddleware } from "react-router-redux";

export default function configureStore(history, initialState) {
  const router = routerMiddleware(history);

  const logger = createLogger({ collapsed: true });

  const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    logger,
    router
  )(createStore);
  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
}
