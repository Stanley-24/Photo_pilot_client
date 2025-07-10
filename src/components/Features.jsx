import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // ⬅️ Added for routing
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import InsightsIcon from "@mui/icons-material/Insights";

import feature1 from "../assets/featured1.jpg";
import feature2 from "../assets/featured2.jpg";
import feature3 from "../assets/featured3.jpg";

const Features = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate(); // ⬅️ Router hook

  const features = [
    {
      title: "AI-Powered Editing",
      description:
        "Save hours of manual work with smart tools that auto-retouch, enhance, and organize your photos.",
      image: feature1,
      icon: <AutoFixHighIcon fontSize="large" color="primary" />,
      buttonText: "Try Editing",
    },
    {
      title: "Smart Portfolio Builder",
      description:
        "Create stunning portfolios with one click using our design templates and cloud sync.",
      image: feature2,
      icon: <DashboardCustomizeIcon fontSize="large" color="primary" />,
      buttonText: "Build Portfolio",
    },
    {
      title: "Market Insights",
      description:
        "Know what sells, where to sell it, and how to price with real-time data from global marketplaces.",
      image: feature3,
      icon: <InsightsIcon fontSize="large" color="primary" />,
      buttonText: "Explore Insights",
    },
  ];

  return (
    <Box
      id="features"
      sx={{
        px: { xs: 2, md: 4 },
        py: 6,
        backgroundColor: isDark ? theme.palette.background.default : "#fafafa",
      }}
    >
      {features.map((feature, index) => {
        const isEven = index % 2 !== 0;
        const isLast = index === features.length - 1;

        return (
          <Card
            key={index}
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: isEven ? "row-reverse" : "row",
              },
              mb: isLast ? 0 : 4,
              borderRadius: 3,
              overflow: "hidden",
              backgroundColor: theme.palette.background.paper,
              boxShadow: isDark ? 1 : 3,
            }}
          >
            {/* Image Section */}
            <Box sx={{ position: "relative", width: { xs: "100%", md: "40%" } }}>
              <Box
                component="img"
                src={feature.image}
                alt={feature.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  maxHeight: 280,
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.4))",
                }}
              />
            </Box>

            {/* Content Section */}
            <CardContent sx={{ flex: 1, p: { xs: 2, md: 3 } }}>
              <Box sx={{ mb: 1 }}>{feature.icon}</Box>
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                color="text.primary"
              >
                {feature.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                {feature.description}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => navigate("/auth")} // ⬅️ Redirects to auth
              >
                {feature.buttonText}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default Features;
