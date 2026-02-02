import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import "./styles/index.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);