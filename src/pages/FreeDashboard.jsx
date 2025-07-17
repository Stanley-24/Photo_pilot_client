import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Divider,
  IconButton,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { toast } from "react-toastify";
import apiClient from "../api/axios"; // ✅ Use custom axios instance

import Sidebar from "../components/Sidebar";
import PhotoUploadForm from "../components/PhotoUploadForm";
import MyGallery from "../components/MyGallery";
import PhotoDetail from "../components/PhotoDetails";

// === Utility to get token from storage ===
const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

export default function FreeDashboard() {
  const navigate = useNavigate();

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [refreshGallery, setRefreshGallery] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const handlePhotoSelect = (photo) => {
    setSelectedPhoto(photo);
    setTimeout(() => {
      document.getElementById("photo-detail")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleUploadSuccess = () => {
    setRefreshGallery(!refreshGallery);
    setSelectedPhoto(null);
  };

  useEffect(() => {
    // ✅ Step 1: Check token from query param and store it
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      toast.success("Logged in with OAuth!");
      // Optionally clear query string
      window.history.replaceState({}, "", "/dashboard/free");
    }

    // ✅ Step 2: Get token from storage
    const token = getToken();
    if (!token) {
      toast.error("You're not logged in.");
      return navigate("/auth");
    }

    // ✅ Step 3: Fetch user with token
    apiClient
      .get("/auth/me")
      .then((res) => {
        setUser(res.data);
        setLoadingUser(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        navigate("/auth");
      });
  }, [navigate]);

  if (loadingUser) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress size={70} thickness={4.5} color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        user={{ name: user?.name || "User", avatar: "" }}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <IconButton
          sx={{ display: { md: "none" }, mb: 2 }}
          onClick={() => setMobileOpen(true)}
          aria-label="open sidebar"
        >
          <MenuIcon />
        </IconButton>

        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
            📸 Free Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Upload photos, preview AI tags, and explore your gallery.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <PhotoUploadForm onUploadSuccess={handleUploadSuccess} />

          <Box sx={{ mt: 6 }}>
            <Typography variant="h6" gutterBottom>
              🖼️ Your Photo Gallery
            </Typography>
            <MyGallery key={refreshGallery} onPhotoSelect={handlePhotoSelect} />
          </Box>

          {selectedPhoto && (
            <Box id="photo-detail" sx={{ mt: 6 }}>
              <Typography variant="h6" gutterBottom>
                🔍 Photo Details
              </Typography>
              <PhotoDetail
                photo={selectedPhoto}
                onPhotoUpdated={(updated) => setSelectedPhoto(updated)}
              />
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}
