// src/sections/CTA.jsx
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  useTheme,
} from "@mui/material";
import backgroundImage from "../assets/cta-bg1.jpg"; // Your preferred background
import { useNavigate } from "react-router-dom";

export default function CTA() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 10, md: 14 },
        px: { xs: 2, md: 6 },
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#f5f5ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      {/* Theme-based overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: isDark
            ? "rgba(0, 0, 0, 0.4)"
            : "rgba(255, 255, 255, 0.45)",
          zIndex: 2,
        }}
      />

      <Card
        sx={{
          position: "relative",
          zIndex: 3,
          maxWidth: 800,
          width: "100%",
          textAlign: "center",
          borderRadius: 4,
          p: { xs: 4, md: 6 },
          boxShadow: 4,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Ready to Elevate Your Photography?
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Join thousands of creators using our smart tools to edit, sell, and
            grow. It’s free to start.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => navigate("/auth")}
            >
              Get Started Free
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              onClick={() => navigate("/auth")}
            >
              Book a Demo
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
