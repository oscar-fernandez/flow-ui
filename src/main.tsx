import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App/App";
import { PendingEnablement } from "./pages/PendingEnablementStart/PendingEnablementStart";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />

    <PendingEnablement />
  </React.StrictMode>
);
