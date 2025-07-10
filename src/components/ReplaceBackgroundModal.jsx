import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Box,
  Snackbar,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { api } from "../api";

export default function ReplaceBackgroundModal({ open, onClose, photo, onReplaceSuccess }) {
  const [backgrounds, setBackgrounds] = useState([]);
  const [selectedBg, setSelectedBg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const previewRef = useRef(null);

  useEffect(() => {
    if (open) {
      setBackgrounds([]);
      setSelectedBg(null);
      setPreviewUrl(null);
      setError("");

      api.getBackgroundSuggestions()
        .then((res) => {
          console.log("Background suggestions response:", res);
          if (res && Array.isArray(res.backgrounds)) {
            setBackgrounds(res.backgrounds);
          } else {
            throw new Error("Invalid background data");
          }
        })
        .catch(() => setError("Failed to load background suggestions"));
    }
  }, [open]);

  const handlePreview = async (bgUrl) => {
    setLoading(true);
    setSelectedBg(bgUrl);
    setPreviewUrl(null);

    try {
      const res = await api.previewReplaceBg({
        photo_id: photo.id,
        background_url: bgUrl,
      });
      setPreviewUrl(res.preview_url);
      setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch {
      setError("Failed to generate preview");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedBg) return;
    setSaving(true);

    try {
      const res = await api.saveReplacedImage({
        photo_id: photo.id,
        background_url: selectedBg,
      });
      onReplaceSuccess(res);
    } catch {
      setError("Failed to save image");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>🪄 Replace Background</DialogTitle>

      <DialogContent dividers>
        <Typography variant="body2" gutterBottom>
          Click a background to preview it on your photo.
        </Typography>

        <Grid container spacing={2} mb={3}>
          {backgrounds.map((bg, idx) => (
            <Grid key={idx} xs={12} sm={6} md={4} lg={3}>
              <Box
                component="img"
                src={bg}
                alt={`Background ${idx}`}
                onClick={() => handlePreview(bg)}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  border: selectedBg === bg ? "2px solid #1976d2" : "2px solid transparent",
                  cursor: "pointer",
                  opacity: loading && selectedBg === bg ? 0.5 : 1,
                  transition: "border 0.3s ease, opacity 0.2s ease",
                }}
              />
            </Grid>
          ))}
        </Grid>

        {loading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        )}

        {previewUrl && (
          <Box mt={4} ref={previewRef}>
            <Typography variant="subtitle1" gutterBottom>
              🖼️ Preview
            </Typography>
            <Box
              component="img"
              src={previewUrl}
              alt="Preview"
              sx={{
                width: "100%",
                maxHeight: 400,
                objectFit: "contain",
                borderRadius: 2,
                border: "1px solid #ccc",
              }}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={saving}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!previewUrl || saving}
        >
          {saving ? "Saving..." : "Save Image"}
        </Button>
      </DialogActions>

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError("")}
        message={error}
      />
    </Dialog>
  );
}
