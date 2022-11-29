import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App/App";
import PageNumberCarousel from "./components/PageNumberCarousel/PageNumberCarousel";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <PageNumberCarousel totalPages={10} />
  </React.StrictMode>
);
