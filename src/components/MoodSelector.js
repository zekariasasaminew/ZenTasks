import React, { useState } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

const MoodSelector = ({ onMoodChange }) => {
  const [mood, setMood] = useState("");

  const handleChange = (event, newMood) => {
    if (newMood !== null) {
      setMood(newMood);
      onMoodChange(newMood);
    }
  };

  return (
    <Box sx={{ marginTop: 2, textAlign: "center" }}>
      <Typography
        sx={{ fontWeight: "bold", color: "#ff69b4", marginBottom: 1 }}
      >
        How are you feeling today? 💖
      </Typography>
      <ToggleButtonGroup
        value={mood}
        exclusive
        onChange={handleChange}
        aria-label="mood"
      >
        <ToggleButton value="😊">😊</ToggleButton>
        <ToggleButton value="😐">😐</ToggleButton>
        <ToggleButton value="😢">😢</ToggleButton>
        <ToggleButton value="😴">😴</ToggleButton>
        <ToggleButton value="🤩">🤩</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default MoodSelector;
