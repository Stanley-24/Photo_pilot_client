import {
  Box,
  Typography,
  Card,
  Button,
  Grid,
  Chip,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const pricingData = {
  monthly: [
    {
      name: "Free",
      price: "₦0",
      features: ["Basic editing tools", "1 Portfolio", "Limited storage"],
      buttonText: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      price: "₦4,500/mo",
      features: ["Advanced tools", "Unlimited portfolios", "Analytics & AI"],
      buttonText: "Start Free Trial",
      highlight: true,
    },
    {
      name: "Business",
      price: "₦12,000/mo",
      features: ["Team accounts", "Custom branding", "Dedicated support"],
      buttonText: "Contact Us",
      highlight: false,
    },
  ],
  annual: [
    {
      name: "Free",
      price: "₦0",
      features: ["Basic editing tools", "1 Portfolio", "Limited storage"],
      buttonText: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      price: "₦45,000/yr",
      features: ["Advanced tools", "Unlimited portfolios", "Analytics & AI"],
      buttonText: "Start Free Trial",
      highlight: true,
    },
    {
      name: "Business",
      price: "₦120,000/yr",
      features: ["Team accounts", "Custom branding", "Dedicated support"],
      buttonText: "Contact Us",
      highlight: false,
    },
  ],
};

export default function Pricing() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const [billing, setBilling] = useState("monthly");
  const plans = pricingData[billing];

  const handleRedirect = (planName) => {
    if (planName === "Free") navigate("/auth");
    else if (planName === "Pro") navigate("/pricing/pro");
    else if (planName === "Business") navigate("/contact");
  };

  return (
    <Box
      id="pricing"
      sx={{
        py: 10,
        px: { xs: 2, md: 6 },
        background: isDark
          ? theme.palette.background.default
          : "linear-gradient(135deg, #f8fafc, #e0f2fe)",
      }}
    >
      <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
        Flexible Pricing for Every Creator
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center" mb={4}>
        Start for free. Upgrade when you're ready.
      </Typography>

      <Stack direction="row" justifyContent="center" mb={6}>
        <ToggleButtonGroup
          value={billing}
          exclusive
          onChange={(e, val) => val && setBilling(val)}
          size="small"
          color="primary"
        >
          <ToggleButton value="monthly">Monthly</ToggleButton>
          <ToggleButton value="annual">Annual</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                p: 4,
                borderRadius: 4,
                backgroundColor: isDark ? theme.palette.background.paper : "#fff",
                border: plan.highlight
                  ? `2px solid ${theme.palette.primary.main}`
                  : `1px solid ${isDark ? "#444" : "#ddd"}`,
                boxShadow: plan.highlight ? 6 : 2,
                transform: plan.highlight ? "scale(1.03)" : "none",
                transition: "0.3s",
              }}
            >
              <Stack spacing={2} alignItems="center">
                {plan.highlight && (
                  <Chip
                    icon={<EmojiEventsIcon fontSize="small" />}
                    label="Most Popular"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  />
                )}
                <Typography variant="h6" fontWeight={700}>
                  {plan.name}
                </Typography>
                <Typography variant="h4" fontWeight={800} color="primary">
                  {plan.price}
                </Typography>
                <Box>
                  {plan.features.map((feat, i) => (
                    <Typography key={i} variant="body2" color="text.secondary" mb={0.5}>
                      ✅ {feat}
                    </Typography>
                  ))}
                </Box>
                <Button
                  variant={plan.highlight ? "contained" : "outlined"}
                  color="primary"
                  size="medium"
                  fullWidth
                  onClick={() => handleRedirect(plan.name)}
                >
                  {plan.buttonText}
                </Button>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
