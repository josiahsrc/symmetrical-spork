import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SlugPage } from "./components/SlugPage";
import { HomePage } from "./components/HomePage";
import { NotFoundPage } from "./components/NotFoundPage";
import { useEffect, useMemo } from "react";
import { createTheme } from "@mui/material";

function hexToRgb(hex: string) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
}

function App() {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
        },
      }),
    []
  );

  useEffect(() => {
    const styles = document.createElement("style");
    styles.innerHTML = `
      :root {
        --primary-rgb: ${hexToRgb(theme.palette.primary.main)};
        --secondary-rgb: ${hexToRgb(theme.palette.secondary.main)};
        --error-rgb: ${hexToRgb(theme.palette.error.main)};
        --warning-rgb: ${hexToRgb(theme.palette.warning.main)};
        --info-rgb: ${hexToRgb(theme.palette.info.main)};
        --success-rgb: ${hexToRgb(theme.palette.success.main)};
      }
      body {
        background-color: ${theme.palette.background.default};
        color: ${theme.palette.text.primary};
      }
    `;
    document.body.appendChild(styles);

    return () => {
      document.body.removeChild(styles);
    };
  }, [theme]);

  return (
    <>
      <Routes>
        <Route path="/:slug" element={<SlugPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
