import "./styles/global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

const root = document.querySelector<HTMLDivElement>("#app");
if (!root) throw new Error("Missing #app root element");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
