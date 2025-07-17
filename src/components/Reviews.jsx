import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
  Button,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  useTheme,
} from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const defaultReviews = [
  {
    full_name: "Tolu Adesina",
    review: "This tool saved me hours in post-editing. I can now focus more on shooting than organizing!",
    avatar_url: "https://randomuser.me/api/portraits/women/79.jpg",
    star: 5,
  },
  {
    full_name: "James Okafor",
    review: "The smart portfolio builder is 🔥. Clients love my new layout, and it took me 5 minutes to set up.",
    avatar_url: "https://randomuser.me/api/portraits/men/32.jpg",
    star: 5,
  },
  {
    full_name: "Ngozi Photography",
    review: "Finally, a product made for African photographers. Insightful, fast, and beautifully designed.",
    avatar_url: "https://randomuser.me/api/portraits/women/45.jpg",
    star: 5,
  },
  {
    full_name: "Daniel Eze",
    review: "I used to dread sending galleries. Now clients actually compliment the experience!",
    avatar_url: "https://randomuser.me/api/portraits/men/55.jpg",
    star: 4,
  },
  {
    full_name: "Chioma Visuals",
    review: "Very intuitive UI and powerful features. I love how fast and clean everything runs.",
    avatar_url: "https://randomuser.me/api/portraits/women/23.jpg",
    star: 5,
  },
  {
    full_name: "Uche Lens",
    review: "Best investment in my photography workflow this year. Highly recommended!",
    avatar_url: "https://randomuser.me/api/portraits/men/12.jpg",
    star: 5,
  },
  {
    full_name: "Sarah Pixels",
    review: "Everything is designed with the photographer in mind. Brilliant tool.",
    avatar_url: "https://randomuser.me/api/portraits/women/52.jpg",
    star: 4,
  },
  {
    full_name: "Victor Snaps",
    review: "Editing and delivery is now a breeze. This is game-changing.",
    avatar_url: "https://randomuser.me/api/portraits/men/40.jpg",
    star: 5,
  },
];

export default function Reviews() {
  const theme = useTheme();
  const sliderRef = useRef(null);
  const [reviews, setReviews] = useState(defaultReviews);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    review: "",
    avatar_url: "",
    star: 5,
  });

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/v1/reviews/homepage");
        const data = await res.json();
        if (data.length > 0) {
          setReviews([...data, ...defaultReviews]);
        }
      } catch (err) {
        console.error("Failed to fetch backend reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/reviews/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newReview = await res.json();
        setReviews((prev) => [newReview, ...prev]);
        setSnack({
          open: true,
          message: "✅ Thank you for your review!",
          severity: "success",
        });
        setFormData({ full_name: "", review: "", avatar_url: "", star: 5 });
        setShowForm(false);
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setSnack({
        open: true,
        message: "❌ Could not submit review. Try again.",
        severity: "error",
      });
    }
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1100, settings: { slidesToShow: 2 } },
      { breakpoint: 700, settings: { slidesToShow: 1 } },
    ],
  };

  // Map reviews for display (handles both backend and default reviews)
  const mappedReviews = reviews.map((r) => ({
    name: r.full_name || r.name,
    text: r.review || r.text,
    avatar: r.avatar_url || r.avatar,
    rating: r.star || r.rating,
  }));

  return (
    <Box
      id="reviews"
      sx={{
        px: { xs: 2, md: 6 },
        py: 10,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="center"
        gutterBottom
        sx={{ mb: 6 }}
      >
        What Photographers Are Saying
      </Typography>

      {/* Navigation Arrows */}
      <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={3}>
        <IconButton onClick={() => sliderRef.current?.slickPrev()} sx={{ border: "1px solid #ccc" }}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => sliderRef.current?.slickNext()} sx={{ border: "1px solid #ccc" }}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Carousel */}
      <Slider ref={sliderRef} {...settings}>
        {mappedReviews.map((review, index) => (
          <Box key={index} px={2}>
            <Card
              sx={{
                height: "100%",
                p: 3,
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: theme.palette.background.paper,
                transition: "all 0.3s ease",
                ":hover": {
                  boxShadow: 6,
                  transform: "translateY(-6px)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
                  <Avatar src={review.avatar} alt={review.name} sx={{ width: 56, height: 56 }} />
                  <Typography variant="subtitle1" fontWeight={600}>
                    {review.name}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, fontStyle: "italic", position: "relative", pl: 3 }}
                >
                  <FormatQuoteIcon fontSize="small" color="primary" sx={{ position: "absolute", left: 0, top: 4 }} />
                  {review.text}
                </Typography>
                <Rating value={review.rating || 5} readOnly size="small" />
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>

      {/* Add Review Button */}
      {!showForm && (
        <Box textAlign="center" mt={6}>
          <Button variant="outlined" onClick={() => setShowForm(true)} sx={{ fontWeight: 600 }}>
            + Add a Review
          </Button>
        </Box>
      )}

      {/* Add Review Form */}
      {showForm && (
        <Box mt={6} maxWidth={500} mx="auto" component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" fontWeight={600} textAlign="center" mb={3}>
            Write a Review
          </Typography>

          <TextField
            label="Your Name"
            fullWidth
            required
            margin="normal"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          />
          <TextField
            label="Your Review"
            fullWidth
            required
            multiline
            rows={4}
            margin="normal"
            value={formData.review}
            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
          />
          <TextField
            label="Avatar URL (optional)"
            fullWidth
            margin="normal"
            value={formData.avatar_url}
            onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
          />
          <Box mt={2} mb={3}>
            <Typography gutterBottom>Rating</Typography>
            <Rating
              value={formData.star}
              onChange={(e, newValue) => setFormData({ ...formData, star: newValue })}
            />
          </Box>
          <Button variant="contained" fullWidth type="submit">
            Submit Review
          </Button>
        </Box>
      )}

      {/* Toast Feedback */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}