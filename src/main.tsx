import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App/App";
import { EnableeView } from "./pages/EnableeView/EnableeView";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <EnableeView />
  </React.StrictMode>
);
