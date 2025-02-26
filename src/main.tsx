import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./Styles/index.css";
import "./Styles/bonebutton.css";
import { FavoritesProvider } from "./Components/FavoritesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <FavoritesProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </FavoritesProvider>
);
