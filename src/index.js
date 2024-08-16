import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import App_Copy from "./src_copy/App_Copy";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {process.env.REACT_APP_VERSION === "1.1.2" ? <App /> : <App_Copy />}
    </Provider>
  </React.StrictMode>
);

console.log("version::", process.env);

if (process.env.REACT_APP_VERSION === "1.1.2") {
  // 현재 버전
} else {
  // 현재 버전 아님
}
