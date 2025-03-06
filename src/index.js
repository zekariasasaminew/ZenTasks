import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <CssBaseline />
    <GlobalStyles
      styles={{
        "*": { margin: 0, padding: 0, boxSizing: "border-box" },
        "hyphenateLimitChars, body": {
          width: "100%",
          height: "100%",
          overflowX: "hidden",
        },
      }}
    />
    <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
      </LocalizationProvider>
    </React.StrictMode>
  </>
);
