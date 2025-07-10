import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AppHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    sessionStorage.setItem("auth_error", "You've been logged out.");
    navigate("/auth");
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      color="default"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 10, // Ensure it's above drawers, menus, etc.
        backgroundColor: "#fff",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight={700} color="primary">
          📸 PhotoPilot
        </Typography>

        <Box>
          <IconButton onClick={handleAvatarClick} size="small">
            <Avatar alt="User Avatar" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1.5,
                zIndex: 2000, // 🔥 Prevent overlapping by pushing it above your app content
                minWidth: 160,
              },
            }}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
