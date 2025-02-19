import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import route from "./routes/route.jsx";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./providers/AuthProvider.jsx";
import DarkModeProvider from "./providers/DarkModeProvider.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <DarkModeProvider>
          <RouterProvider router={route} />
        </DarkModeProvider>
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>
);
