import { CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUrl } from "../api";

export const SlugPage = () => {
  const { slug } = useParams();

  const [error, setError] = useState("");

  useEffect(() => {
    const inner = async () => {
      if (!slug) {
        setError("No slug provided");
        return;
      }

      const result = await getUrl(slug);
      if (result.type === "error") {
        setError(result.message);
        return;
      }

      window.location.href = result.data.url;
    };

    inner();
  }, [slug]);

  if (!error) {
    return (
      <Stack spacing={2} justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <Typography variant="h4" sx={{ width: "100%", textAlign: "center" }}>
        Something went wrong
      </Typography>
      <Typography variant="body1" sx={{ color: "error.main" }}>
        {error}
      </Typography>
      <Link to="/">Go back to the home page</Link>
    </Stack>
  );
};
