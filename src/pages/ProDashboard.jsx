import { Box, Typography } from "@mui/material";

export default function ProDashboard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Pro Dashboard</Typography>
      <Typography>
        You're on the <strong>Pro Plan</strong>. Enjoy advanced tools like background removal and auto-tagging!
      </Typography>
    </Box>
  );
}
