import {
  Button,
  Card,
  Divider,
  IconButton,
  Input,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { createSlug } from "../api";
import { ContentCopy } from "@mui/icons-material";
import { formatSlug } from "../utils/slug";

/**
 * The main part of the app. Handles communicating with the backend,
 * displaying slugs, and copying them to the clipboard.
 */
export const HomePage = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [outputUrl, setOutputUrl] = useState("");
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputUrl(text);
    setCanSubmit(text.length > 0);
  };

  const handleSubmit = async () => {
    setCanSubmit(false);
    const result = await createSlug(inputUrl);
    if (result.type === "error") {
      setError(result.message);
      setOutputUrl("");
    } else {
      setError("");
      setOutputUrl(formatSlug(result.data.slug));
    }
  };

  let bottom: React.ReactNode = null;
  if (error) {
    bottom = (
      <Typography variant="body1" sx={{ color: "error.main", mt: 2 }}>
        {error}
      </Typography>
    );
  } else if (outputUrl) {
    bottom = (
      <Stack spacing={2} justifyContent="center" alignItems="center">
        <Typography variant="body1" sx={{ mt: 2 }}>
          Shortened URL: {`${outputUrl}`}
        </Typography>
        <IconButton
          aria-label="copy"
          onClick={() => {
            navigator.clipboard.writeText(outputUrl);
            setSnackbar("Copied to clipboard");
          }}
        >
          <ContentCopy />
        </IconButton>
      </Stack>
    );
  } else {
    bottom = (
      <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
        Your shortened URL will appear here
      </Typography>
    );
  }

  return (
    <>
      <Snackbar
        open={!!snackbar}
        autoHideDuration={4000}
        onClose={() => setSnackbar("")}
        message={snackbar}
      />
      <Stack spacing={2} justifyContent="center" alignItems="center">
        <Card sx={{ padding: 4 }}>
          <Typography variant="h4" sx={{ width: "100%", textAlign: "center" }}>
            URL Shortener
          </Typography>
          <Input
            sx={{ width: "100%", textAlign: "center", mt: 1 }}
            placeholder="https://example.com"
            value={inputUrl}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            sx={{ width: "100%", mt: 2 }}
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            Shorten URL
          </Button>
          <Divider sx={{ width: "100%", mt: 4, mb: 4 }} />
          {bottom}
        </Card>
      </Stack>
    </>
  );
};
