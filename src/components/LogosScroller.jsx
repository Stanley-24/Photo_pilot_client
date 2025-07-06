import { Box, Typography } from "@mui/material";
import adobe from "../assets/logo-adobe.png";
import canva from "../assets/logo-canva.png";
import lightroom from "../assets/logo-lightroom.png";
import pixieset from "../assets/logo-pixiest.png";
import photoshop from "../assets/logo-photoshop.png";
import unsplash from "../assets/logo-unsplash.png";
import behance from "../assets/logo-behance.png";
import pexels from "../assets/logo-pexels.png";

const logos = [adobe, canva, lightroom, pixieset, photoshop, unsplash, behance, pexels];

export default function Logos() {
  return (
    <Box sx={{ backgroundColor: "#fff", py: 6, position: "relative" }}>
      <Typography
        variant="h6"
        fontWeight={600}
        textAlign="center"
        mb={3}
        color="text.secondary"
      >
        Trusted and Used by
      </Typography>

      {/* Fade masks */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 80,
          height: "100%",
          zIndex: 1,
          background: "linear-gradient(to right, #fff, transparent)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 80,
          height: "100%",
          zIndex: 1,
          background: "linear-gradient(to left, #fff, transparent)",
        }}
      />

      {/* Scroller */}
      <Box sx={{ overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            gap: 6,
            animation: "scroll 30s linear infinite",
            width: "fit-content",
            "@keyframes scroll": {
              "0%": { transform: "translateX(0%)" },
              "100%": { transform: "translateX(-50%)" }, // Move half, then loop
            },
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <Box
              component="img"
              key={index}
              src={logo}
              alt={`logo-${index}`}
              sx={{
                height: 40,
                opacity: 0.7,
                transition: "opacity 0.3s",
                "&:hover": {
                  opacity: 1,
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
