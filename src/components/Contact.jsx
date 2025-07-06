// src/sections/Contact.jsx
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";

export default function Contact() {
  return (
    <Box
      id="contact"
      sx={{
        pt: 10,
        pb: 0,
        mb: 0,
        backgroundColor: "#f9fafb",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h3" fontWeight={700} textAlign="center" mb={6}>
          Get in Touch
        </Typography>

        <Paper elevation={3} sx={{ p: 5, borderRadius: 3 }}>
          <form>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                label="Your Name"
                fullWidth
                required
                size="medium"
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                size="medium"
              />
              <TextField
                label="Message"
                multiline
                rows={5}
                fullWidth
                required
                size="medium"
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  background: "linear-gradient(90deg, #3f51b5, #2196f3)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  py: 1.5,
                  borderRadius: "999px",
                  transition: "all 0.3s ease",
                  ":hover": {
                    background: "linear-gradient(90deg, #2196f3, #3f51b5)",
                    opacity: 0.9,
                  },
                }}
              >
                Send Message
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
