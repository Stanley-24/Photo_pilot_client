import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Sidebar from "../components/Sidebar";
import PhotoUploadForm from "../components/PhotoUploadForm";
import MyGallery from "../components/MyGallery";
import PhotoDetail from "../components/PhotoDetails";

export default function FreeDashboard() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [refreshGallery, setRefreshGallery] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        user={{ name: "Stanley", avatar: "" }}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Mobile menu icon: visible only on mobile */}
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
