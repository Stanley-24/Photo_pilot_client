import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom"; // ✅ Import router navigation
import heroImage from "../assets/home-bg.png";

export default function Hero() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate(); // ✅ Router navigation hook

  const handleScroll = () => {
    const nextSection = document.getElementById("features");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetStarted = () => {
    navigate("/auth"); // ✅ Redirect to your auth route
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "80vh", md: "85vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: isMobile ? "scroll" : "fixed",
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 10 },
        color: theme.palette.text.primary,
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))",
          zIndex: 1,
        }}
      />

      {/* Content Card */}
      <Card
        sx={{
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(12px)",
          borderRadius: 4,
          boxShadow: 8,
          px: { xs: 3, md: 5 },
          py: { xs: 4, md: 6 },
          maxWidth: 640,
          width: "100%",
        }}
      >
        <CardContent>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: theme.palette.common.white,
              mb: 2,
              animation: "fadeIn 0.8s ease-out",
            }}
          >
            Power Your Photography
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: theme.palette.grey[300],
              mb: 4,
              animation: "fadeIn 1.1s ease-out",
            }}
          >
            Discover tools, data, and insights built for modern photographers.
            Boost your creativity with smart AI and simple workflows.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 2,
              animation: "fadeIn 1.3s ease-out",
            }}
          >
            <Button variant="contained" color="primary" size="large" onClick={handleGetStarted}>
              Get Started
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              size="large"
              sx={{
                borderColor: theme.palette.common.white,
                color: theme.palette.common.white,
                "&:hover": {
                  borderColor: theme.palette.common.white,
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Book a Demo
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Scroll Indicator */}
      <KeyboardArrowDownIcon
        fontSize="large"
        onClick={handleScroll}
        sx={{
          position: "absolute",
          bottom: 24,
          zIndex: 2,
          color: theme.palette.common.white,
          cursor: "pointer",
          animation: "bounce 1.5s infinite",
          "@keyframes bounce": {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(10px)" },
          },
        }}
      />

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
}
