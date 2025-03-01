import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { Height } from "@mui/icons-material";

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
      <App />
    </React.StrictMode>
  </>
);
