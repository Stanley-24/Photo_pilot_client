// src/components/MyGallery.jsx
import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  Skeleton,
} from "@mui/material";
import { api } from "../api";

export default function MyGallery({ onPhotoSelect }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = async () => {
    try {
      const res = await api.getMyPhotos();
      setPhotos(res);
    } catch (err) {
      console.error("Failed to fetch photos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <Grid container spacing={2}>
        {Array.from(new Array(6)).map((_, idx) => (
          <Grid item xs={6} sm={4} md={3} key={idx}>
            <Skeleton variant="rectangular" height={160} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (photos.length === 0) {
    return <p style={{ color: "#888" }}>No photos uploaded yet.</p>;
  }

  return (
    <Grid container spacing={2}>
      {photos.map((photo) => (
        <Grid item xs={6} sm={4} md={3} key={photo.id}>
          <Card elevation={2}>
            <CardActionArea onClick={() => onPhotoSelect(photo)}>
              <CardMedia
                component="img"
                height="160"
                image={`http://localhost:8000${photo.image_url}`}
                alt="Uploaded"
                sx={{ objectFit: "cover" }}
              />
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
