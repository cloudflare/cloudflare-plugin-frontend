import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router";
import configureStore from "./store/configureStore";
import routes from "./routes";
import createHistory from "history/lib/createHashHistory";
import http from "cf-util-http";
import { syncHistoryWithStore } from "react-router-redux";

const store = configureStore(createHistory());
const history = syncHistoryWithStore(createHistory(), store);

/*
 * Register our RestProxyCallback to send all cf-util-http calls to
 * our backend instead of their actual endpoint.
 */
http.beforeSend(RestProxyCallback);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById("root")
);
