import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  Stack,
  Divider,
  TextField,
  Button,
  Fade,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0f172a", // Tailwind slate-900
        color: "#f1f5f9", // slate-100
        py: { xs: 6, md: 10 },
        mt: 10,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Logo & Intro */}
          <Grid item xs={12} md={4}>
            <Fade in timeout={800}>
              <Box>
                <Typography variant="h5" fontWeight={700} mb={1}>
                  PhotoPilot
                </Typography>
                <Typography variant="body2" color="gray">
                  Built for photographers. Powered by insights and simplicity.
                </Typography>
              </Box>
            </Fade>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={4}>
            <Fade in timeout={1000}>
              <Box>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Company
                </Typography>
                <Stack spacing={1}>
                  <Link href="/about" underline="hover" color="inherit">
                    About Us
                  </Link>
                  <Link href="/team" underline="hover" color="inherit">
                    Meet the Team
                  </Link>
                  <Link href="/blog" underline="hover" color="inherit">
                    Blog
                  </Link>
                  <Link href="/careers" underline="hover" color="inherit">
                    Careers
                  </Link>
                </Stack>
              </Box>
            </Fade>
          </Grid>

          {/* Support */}
          <Grid item xs={6} md={4}>
            <Fade in timeout={1200}>
              <Box>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Support
                </Typography>
                <Stack spacing={1}>
                  <Link href="/support" underline="hover" color="inherit">
                    Help Center
                  </Link>
                  <Link href="/contact" underline="hover" color="inherit">
                    Contact Us
                  </Link>
                  <Link href="/terms" underline="hover" color="inherit">
                    Terms of Service
                  </Link>
                  <Link href="/privacy" underline="hover" color="inherit">
                    Privacy Policy
                  </Link>
                </Stack>
              </Box>
            </Fade>
          </Grid>
        </Grid>

        {/* Newsletter */}
        <Fade in timeout={1500}>
          <Box mt={8} textAlign="center">
            <Typography variant="h6" fontWeight={600} mb={1}>
              Subscribe to our newsletter
            </Typography>
            <Typography variant="body2" color="gray" mb={3}>
              Get tips, updates, and inspiration delivered to your inbox.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
              maxWidth={500}
              mx="auto"
            >
              <TextField
                variant="outlined"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  input: { color: "#f1f5f9" },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1e293b",
                    borderRadius: 2,
                  },
                  width: "100%",
                }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ px: 4, borderRadius: 2 }}
                onClick={handleSubscribe}
              >
                Subscribe
              </Button>
            </Stack>

            {subscribed && (
              <Typography mt={2} color="success.main">
                ✅ Thank you for subscribing!
              </Typography>
            )}
          </Box>
        </Fade>

        <Divider sx={{ my: 5, borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Bottom Bar */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Typography variant="body2" color="gray">
            © {new Date().getFullYear()} PhotoPilot. All rights reserved.
          </Typography>

          <Box>
            <IconButton href="https://facebook.com" color="inherit">
              <FacebookIcon />
            </IconButton>
            <IconButton href="https://twitter.com" color="inherit">
              <TwitterIcon />
            </IconButton>
            <IconButton href="https://instagram.com" color="inherit">
              <InstagramIcon />
            </IconButton>
            <IconButton href="https://github.com" color="inherit">
              <GitHubIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
