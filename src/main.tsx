import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  // TODO: StrictMode был выключён из-за двойного вызова useEffect
  // <StrictMode>
  <App />
  // </StrictMode>
);
