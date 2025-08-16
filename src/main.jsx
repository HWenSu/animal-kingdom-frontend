import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FilterProvider } from "./context/FilterContext";
import "./style/tailwind.css";
import "./style/index.scss";
import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FilterProvider>
        <AuthProvider>
          <Navbar />
          <App />
          <Footer />
        </AuthProvider>
      </FilterProvider>
    </BrowserRouter>
  </StrictMode>
);
