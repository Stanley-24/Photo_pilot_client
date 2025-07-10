import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  Tooltip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { Link as RouterLink } from "react-router-dom";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Product", href: "#product" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar({ hideHamburger = false, darkMode, toggleDarkMode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const handleSmoothScroll = (href) => {
    const target = document.querySelector(href);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
    if (isMobile) setMobileOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 150;
      let closest = null;
      let closestDistance = Infinity;

      navItems.forEach((item) => {
        const section = document.querySelector(item.href);
        if (section) {
          const distance = Math.abs(section.offsetTop - scrollY);
          if (distance < closestDistance) {
            closest = item.href;
            closestDistance = distance;
          }
        }
      });

      if (closest) setActiveSection(closest);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderNavLinks = () =>
    navItems.map((item) => (
      <Button
        key={item.label}
        onClick={() => handleSmoothScroll(item.href)}
        sx={{
          color: activeSection === item.href ? "primary.main" : "text.primary",
          fontWeight: activeSection === item.href ? 700 : 400,
          textTransform: "none",
        }}
      >
        {item.label}
      </Button>
    ));

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        PhotoPilot
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => handleSmoothScroll(item.href)}
              selected={activeSection === item.href}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/auth"
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar component="nav" position="sticky" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            PhotoPilot
          </Typography>

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {renderNavLinks()}

              {/* 🌙 Dark mode toggle */}
              <Tooltip title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
                <IconButton onClick={toggleDarkMode}>
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>

              <Button
                component={RouterLink}
                to="/auth"
                variant="outlined"
                size="small"
                sx={{ textTransform: "none" }}
              >
                Login
              </Button>
            </Box>
          )}

          {!hideHamburger && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: 220 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
