// src/App.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import Hero from "./components/Hero";
import Features from "./components/Features";
import Reviews from "./components/Reviews";
import LogosScroller from "./components/LogosScroller";
import CTA from "./components/Cta";
import Pricing from "./components/Pricing";
import Faqs from "./components/Faqs";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import Contact from "./components/Contact";

import AuthPage from "./pages/Authpage";
import FreeDashboard from "./pages/FreeDashboard";
import ProDashboard from "./pages/ProDashboard";
import BusinessDashboard from "./pages/BusinessDashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { lightTheme, darkTheme } from "./theme";

const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [token, setToken] = useState(getToken());
  const location = useLocation();

  useEffect(() => {
    const currentToken = getToken();
    setToken(currentToken);
  }, [location.pathname]);

  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/auth" replace />;
  };

  const hideNavbar =
    location.pathname.startsWith("/dashboard") || location.pathname === "/auth";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!hideNavbar && (
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode((prev) => !prev)}
          hideHamburger={hideNavbar}
        />
      )}
      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard/free"
          element={
            <ProtectedRoute>
              <FreeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/pro"
          element={
            <ProtectedRoute>
              <ProDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/business"
          element={
            <ProtectedRoute>
              <BusinessDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Features />
              <Product />
              <Reviews />
              <LogosScroller />
              <CTA />
              <Pricing />
              <Faqs />
              <Contact />
              <Chatbot />
              <Footer />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}
