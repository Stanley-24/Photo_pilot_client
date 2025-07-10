// src/components/PhotoUploadForm.jsx
import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Input,
  Stack,
  LinearProgress,
} from "@mui/material";
import { api } from "../api";

export default function PhotoUploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const uploaded = await api.uploadPhoto(formData);
      onUploadSuccess(uploaded);
      setFile(null);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
      <form onSubmit={handleUpload}>
        <Stack spacing={2}>
          <Typography variant="subtitle1" fontWeight={600}>
            Upload a New Photo
          </Typography>

          <Input
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={(e) => setFile(e.target.files[0])}
            fullWidth
          />

          {uploading && <LinearProgress />}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!file || uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
