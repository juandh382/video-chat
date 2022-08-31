import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

const obj = {
  uid: "1050",
  data: { queueId: "49ab2496-0c94-475d-93a1-4b2198e7956e" },
  role: "subscriber",
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
