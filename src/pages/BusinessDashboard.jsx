import { Box, Typography } from "@mui/material";

export default function BusinessDashboard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Business Dashboard</Typography>
      <Typography>
        You're on the <strong>Business Plan</strong>. Unlimited everything, full control!
      </Typography>
    </Box>
  );
}
