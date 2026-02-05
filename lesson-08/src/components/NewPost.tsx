import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { postExhibit } from "../api/exhibitActions";

interface NewPostProps {
  open: boolean;
  onClose: () => void;
  onPostCreated: (newPost: any) => void;
}

const NewPost = ({ open, onClose, onPostCreated }: NewPostProps) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("description", text);
      if (image) formData.append("image", image);

      const newPost = await postExhibit(formData);

      onPostCreated(newPost);

      setText("");
      handleRemoveImage();
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Create New Post
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          <TextField
            autoFocus
            multiline
            minRows={3}
            placeholder="Write a post"
            variant="standard"
            fullWidth
            InputProps={{ disableUnderline: true }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {previewUrl && (
            <Box sx={{ position: "relative", mt: 2 }}>
              <Box
                component="img"
                src={previewUrl}
                sx={{
                  width: "100%",
                  maxHeight: 300,
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
              <IconButton
                size="small"
                onClick={handleRemoveImage}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: "white",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
        <Box>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <IconButton
            color="primary"
            onClick={() => fileInputRef.current?.click()}
          >
            <AddPhotoAlternateIcon />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSubmit}
          disabled={(!text.trim() && !image) || loading}
        >
          {loading ? "Posting..." : "SEND"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewPost;
