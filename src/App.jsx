// Remove the duplicate import statement
import Hero from "./components/Hero";
import Features from "./components/Features";
import Reviews from "./components/Reviews";
import LogosScroller from "./components/LogosScroller";
import CTA from "./components/Cta";
import Pricing from "./components/Pricing";
import Faqs from "./components/Faqs";
import Footer from "./components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Chatbot from "./components/Chatbot";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import Contact from "./components/Contact";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />
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
    </ThemeProvider>
  );
}

export default App;
