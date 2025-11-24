import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

type Props = {
  onSubmit: (title: string, description?: string) => Promise<any>;
  initial?: { title?: string; description?: string };
  submitLabel?: string;
};

export default function TaskForm({
  onSubmit,
  initial,
  submitLabel = "Save",
}: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await onSubmit(title.trim(), description.trim() || undefined);
      setTitle("");
      setDescription("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handle} sx={{ mb: 3 }}>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        label="Title"
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        label="Description"
        fullWidth
        multiline
        rows={2}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" disabled={loading}>
        {submitLabel}
      </Button>
    </Box>
  );
}
