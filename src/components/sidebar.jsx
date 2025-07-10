// src/components/Sidebar.jsx
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const drawerWidth = 240;
const mobileDrawerWidth = 160; // thinner on mobile

export default function Sidebar({ user = {}, mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [collapsed, setCollapsed] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    sessionStorage.setItem("auth_error", "You've been logged out.");
    navigate("/auth");
  };

  const handleToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  const isOpen = isMobile ? mobileOpen : !collapsed;

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard/free",
    },
  ];

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isMobile ? "flex-start" : "center",
          px: 2,
          py: 2,
          minHeight: 56,
        }}
      >
        <IconButton
          onClick={handleToggle}
          sx={{
            "&:hover": {
              backgroundColor: "#D6EAF8",
            },
            color: "#2C3E50",
          }}
        >
          <Box sx={{ width: 24, height: 18, position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                width: 24,
                height: 2,
                backgroundColor: "text.primary",
                top: isOpen ? "8px" : "0px",
                transform: isOpen ? "rotate(45deg)" : "none",
                transition: "all 0.3s ease",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                width: 24,
                height: 2,
                backgroundColor: "text.primary",
                top: "8px",
                opacity: isOpen ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                width: 24,
                height: 2,
                backgroundColor: "text.primary",
                top: isOpen ? "8px" : "16px",
                transform: isOpen ? "rotate(-45deg)" : "none",
                transition: "all 0.3s ease",
              }}
            />
          </Box>
        </IconButton>

        {!isMobile && !collapsed && (
          <Typography variant="h6" fontWeight={600} ml={1}>
            Menu
          </Typography>
        )}
      </Box>

      {/* Avatar and name */}
      {!collapsed && (
        <Box textAlign="center" mb={2} sx={{ px: isMobile ? 0.5 : 0 }}>
          <Avatar
            src={user.avatar || ""}
            alt={user.name}
            sx={{
              width: isMobile ? 56 : 64,
              height: isMobile ? 56 : 64,
              mx: "auto",
              mb: 1,
            }}
          />
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ fontSize: isMobile ? "0.875rem" : undefined }}
          >
            {user.name || "User"}
          </Typography>
        </Box>
      )}

      <Divider />

      {/* Menu items */}
      <List sx={{ flexGrow: 1, mt: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <Tooltip title={collapsed ? item.text : ""} placement="right">
                <ListItemButton
                  selected={isActive}
                  onClick={() => {
                    navigate(item.path);
                    if (isMobile) setMobileOpen(false);
                  }}
                  sx={{
                    py: 1.5,
                    px: collapsed ? 1 : 3,
                    justifyContent: collapsed ? "center" : "flex-start",
                    color: isActive ? "#21618C" : "#2C3E50",
                    backgroundColor: isActive ? "#D6EAF8" : "transparent",
                    "&:hover": {
                      backgroundColor: "#D6EAF8",
                      color: "#21618C",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: collapsed ? 0 : 2,
                      justifyContent: "center",
                      color: isActive ? "#21618C" : "#2C3E50",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary={item.text} />}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      {/* Logout */}
      <Box sx={{ px: collapsed ? 0 : 2, pb: "7px", mt: "auto" }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              justifyContent: collapsed ? "center" : "flex-start",
              px: collapsed ? 1 : 3,
              "&:hover": {
                backgroundColor: "#FDEDEC",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "error.main",
                minWidth: 0,
                mr: collapsed ? 0 : 2,
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Logout" />}
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? mobileOpen : true}
      onClose={() => setMobileOpen(false)}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: isMobile ? mobileDrawerWidth : collapsed ? 72 : drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isMobile ? mobileDrawerWidth : collapsed ? 72 : drawerWidth,
          transition: "width 0.3s ease",
          boxSizing: "border-box",
          backgroundColor: "#EBF5FD",
          backdropFilter: "blur(10px)",
          borderRight: isMobile ? "none" : "1px solid #e0e0e0",
          ...(isMobile && {
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            borderRadius: 0,
            zIndex: theme.zIndex.drawer + 2,
          }),
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
