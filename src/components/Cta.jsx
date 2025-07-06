// components/CTA.jsx
import { Box, Typography, Button, Card, CardContent, Stack } from "@mui/material";
import backgroundImage from "../assets/cta-bg1.jpg"; // 🔁 Replace with your preferred background

export default function CTA() {
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
      {/* Optional overlay for softening */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255, 255, 255, 0.45)",
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
          backgroundColor: "#ffffff",
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Ready to Elevate Your Photography?
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Join thousands of creators using our smart tools to edit, sell, and grow. It’s free to start.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button variant="contained" size="large" color="primary">
              Get Started Free
            </Button>
            <Button variant="outlined" size="large" color="primary">
              Book a Demo
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
