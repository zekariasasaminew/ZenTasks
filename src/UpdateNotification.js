import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const CURRENT_VERSION = "1.0.1";

const UpdateNotification = () => {
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);

  useEffect(() => {
    const storedVersion = localStorage.getItem("app_version");

    if (!storedVersion) {
      setShowUpdateMessage(true);
      localStorage.setItem("app_version", CURRENT_VERSION);
    } else if (storedVersion !== CURRENT_VERSION) {
      setShowUpdateMessage(true);
      localStorage.setItem("app_version", CURRENT_VERSION);
    }
  }, []);

  return (
    <Dialog
      open={showUpdateMessage}
      onClose={() => setShowUpdateMessage(false)}
    >
      <DialogTitle>🚀 What's New?</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          - First-time feature: You will now see updates when the website is
          improved! 🎉
          <br />- Added the ability to move tasks to the side instead of
          stacking! <br />
          - Improved the drag-and-drop experience for a smoother UI. <br />
          - Fixed task order resetting after refresh. <br />
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Refresh the page if you experience any issues.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setShowUpdateMessage(false)}
          color="primary"
          variant="contained"
        >
          Got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateNotification;
