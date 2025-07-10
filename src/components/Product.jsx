import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Slide,
  useTheme,
} from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const features = [
  {
    title: "Smart Galleries",
    description: "Deliver galleries that are fast, responsive, and beautifully designed.",
    icon: <CollectionsIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Auto-Tagging",
    description: "Let AI auto-organize and tag your photos for lightning-fast sorting.",
    icon: <AutoAwesomeIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Client Proofing",
    description: "Get client feedback directly on photos with one-click approvals.",
    icon: <ThumbUpAltIcon sx={{ fontSize: 40 }} />,
  },
];

export default function Product() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      id="product"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default,
        scrollMarginTop: "100px",
      }}
    >
      <Container>
        <Typography
          variant="h3"
          fontWeight={700}
          textAlign="center"
          color="text.primary"
          mb={{ xs: 6, md: 8 }}
        >
          Explore the Product
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Slide
              key={index}
              direction="up"
              in
              timeout={400 + index * 200}
              mountOnEnter
              unmountOnExit
            >
              <Grid item xs={12} sm={8} md={4} lg={3}>
                <Card
                  sx={{
                    height: "100%",
                    p: 3,
                    borderRadius: 4,
                    boxShadow: isDark
                      ? "0 8px 24px rgba(0,0,0,0.4)"
                      : "0 8px 24px rgba(0,0,0,0.08)",
                    backgroundColor: theme.palette.background.paper,
                    backdropFilter: "blur(6px)",
                    transition: "all 0.3s ease",
                    mx: "auto",
                    maxWidth: 320,
                    ":hover": {
                      boxShadow: isDark
                        ? "0 12px 30px rgba(0,0,0,0.5)"
                        : "0 12px 30px rgba(0,0,0,0.12)",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                        borderRadius: "50%",
                        mb: 3,
                      }}
                    >
                      {feature.icon}
                    </Box>

                    <Typography
                      variant="h6"
                      fontWeight={600}
                      gutterBottom
                      sx={{ fontSize: { xs: "1.1rem", md: "1.25rem" } }}
                      color="text.primary"
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Slide>
          ))}
        </Grid>

        {/* CTA Section */}
        <Box textAlign="center" mt={{ xs: 8, md: 10 }}>
          <Typography
            variant="h5"
            fontWeight={600}
            mb={2}
            sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
            color="text.primary"
          >
            Ready to simplify your photography workflow?
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={4}>
            Try PhotoPilot free for 14 days. No credit card required.
          </Typography>

          <Box>
            <a href="/auth" style={{ textDecoration: "none" }}>
              <Box
                component="button"
                sx={{
                  background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  color: "#fff",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: "999px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  border: "none",
                  transition: "all 0.3s ease",
                  ":hover": {
                    opacity: 0.9,
                  },
                }}
              >
                Start Free Trial →
              </Box>
            </a>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
