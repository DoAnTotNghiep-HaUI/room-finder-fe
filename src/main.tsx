import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./css/font.css";
import "./css/global.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
