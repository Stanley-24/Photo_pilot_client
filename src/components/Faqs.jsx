import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Link,
  Slide,
  TextField,
  Fab,
  Zoom,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import faqImage from "../assets/faq-illustration.svg";

// Helper to highlight text
const highlightText = (text, query) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={index}
        style={{ backgroundColor: "#fff59d", padding: "0 2px", borderRadius: "2px" }}
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const faqsData = [
  {
    question: "What is PhotoPilot?",
    answer:
      "PhotoPilot is an all-in-one platform that helps photographers manage, enhance, and sell their work using smart tools and data insights.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes! You can try all premium features free for 14 days. No credit card required.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. You’re free to cancel your subscription whenever you like—no strings attached.",
  },
  {
    question: "Do you offer support?",
    answer:
      "Yes. Our team offers 24/7 customer support via chat and email to help you succeed.",
  },
  {
    question: "Can I use PhotoPilot on mobile?",
    answer:
      "Yes, PhotoPilot is fully responsive and works seamlessly on mobile devices.",
  },
  {
    question: "Is my data secure?",
    answer:
      "We use industry-standard encryption to ensure your data is safe and secure.",
  },
  {
    question: "Do I need design experience?",
    answer:
      "No design experience is needed—PhotoPilot is built to be user-friendly for all levels.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply sign up with your email, and you’ll be guided through setup in minutes.",
  },
];

export default function Faqs() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [search, setSearch] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredFaqs = faqsData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      id="faqs"
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: isDark ? theme.palette.background.default : "#f9fafb",
        borderTop: `1px solid ${isDark ? "#333" : "#e5e7eb"}`,
        position: "relative",
      }}
    >
      <Container maxWidth="md">
        {/* Illustration */}
        <Box
          component="img"
          src={faqImage}
          alt="FAQs Illustration"
          sx={{
            width: { xs: "80%", sm: "60%", md: "50%" },
            maxWidth: 320,
            mx: "auto",
            display: "block",
            mb: 0,
          }}
        />

        {/* Heading + Search */}
        <Box textAlign="center" mb={0}>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Frequently Asked Questions
          </Typography>

          <TextField
            variant="outlined"
            placeholder="Search questions..."
            fullWidth
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              maxWidth: 400,
              mx: "auto",
              backgroundColor: isDark ? "#1e1e1e" : "#fff",
              mt: 2,
              borderRadius: 1,
              input: { color: isDark ? "#fff" : "inherit" },
            }}
          />
        </Box>

        {/* FAQs */}
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item, index) => (
            <Slide
              key={item.question}
              direction="up"
              in
              timeout={400 + index * 100}
              mountOnEnter
              unmountOnExit
            >
              <Accordion
                disableGutters
                sx={{
                  mb: 0,
                  borderRadius: 2,
                  backgroundColor: isDark ? "#1a1a1a" : "#fff",
                  color: isDark ? "#fff" : "inherit",
                  boxShadow: isDark
                    ? "0 2px 6px rgba(0,0,0,0.4)"
                    : "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <HelpOutlineIcon
                      sx={{
                        fontSize: 18,
                        color: "primary.main",
                      }}
                    />
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{ fontSize: "1rem" }}
                    >
                      {highlightText(item.question, search)}
                    </Typography>
                  </Box>
                </AccordionSummary>

                <AccordionDetails>
                  <Typography variant="body1" color="text.secondary">
                    {highlightText(item.answer, search)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Slide>
          ))
        ) : (
          <Box textAlign="center" mt={4}>
            <Typography variant="body1" color="text.secondary">
              No matching questions found.
            </Typography>
          </Box>
        )}

        {/* Support link */}
        <Box mt={4} textAlign="center" mb={0}>
          <Typography variant="body1">
            Still have questions?{" "}
            <Link href="/support" color="primary" underline="hover">
              Visit our support center →
            </Link>
          </Typography>
        </Box>
      </Container>

      {/* Scroll to top button */}
      <Zoom in={showScrollTop}>
        <Box
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 999,
          }}
        >
          <Fab
            color="primary"
            size="small"
            onClick={handleScrollToTop}
            aria-label="scroll back to top"
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Box>
      </Zoom>
    </Box>
  );
}
