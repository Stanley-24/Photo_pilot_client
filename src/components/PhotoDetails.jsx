import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
  Divider,
} from "@mui/material";
import ReplaceBackgroundModal from "./ReplaceBackgroundModal";

export default function PhotoDetail({ photo, onPhotoUpdated }) {
  const [openReplaceModal, setOpenReplaceModal] = useState(false);

  if (!photo) return null;

  const { image_url, view_count, tags = [], total_view_time } = photo;

  return (
    <>
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: "white",
        }}
      >
        <CardMedia
          component="img"
          height="360"
          image={`http://localhost:8000${image_url}`}
          alt="Selected"
          sx={{ objectFit: "cover" }}
        />

        <CardContent>
          <Typography variant="h6" gutterBottom>
            📊 Photo Stats
          </Typography>

          <Stack direction="row" spacing={3} mb={2}>
            <Typography variant="body2" color="text.secondary">
              <strong>Views:</strong> {view_count}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>View Time:</strong> {total_view_time || 0}s
            </Typography>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" fontWeight={600} gutterBottom>
            🏷️ Tags
          </Typography>
          {tags.length > 0 ? (
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {tags.map((tag, idx) => (
                <Chip key={idx} label={tag} color="primary" size="small" />
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" color="text.disabled">
              No tags found for this photo.
            </Typography>
          )}

          <Stack direction="row" spacing={2} mt={4}>
            <Button variant="contained" color="primary">
              Enhance Photo
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenReplaceModal(true)}
            >
              Replace Background
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Modal */}
      <ReplaceBackgroundModal
        open={openReplaceModal}
        onClose={() => setOpenReplaceModal(false)}
        photo={photo}
        onReplaceSuccess={(updatedPhoto) => {
          setOpenReplaceModal(false);
          onPhotoUpdated?.(updatedPhoto); // call parent to update state if needed
        }}
      />
    </>
  );
}
