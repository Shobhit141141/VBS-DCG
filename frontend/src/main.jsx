import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BackgroundProvider } from "./context/BgContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BackgroundProvider>
        <App />
      </BackgroundProvider>
    </AuthProvider>
  </React.StrictMode>
);
