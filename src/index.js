import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

const obj = {
  id: "1",
  data: { queueId: "96d2aac4-5a0e-4c45-bd5c-8bd692596a79" },
  rol: "suscriber",
};

root.render(
  <React.StrictMode>
    <App {...obj} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
