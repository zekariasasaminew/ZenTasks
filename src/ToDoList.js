import React from "react";
import {
  List,
  ListItemText,
  Checkbox,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Cute heart icon
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Empty heart icon

const ToDoList = ({ tasks, toggleTaskCompletion, deleteTask }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Paper
        elevation={10} // Soft shadow for cuteness
        sx={{
          padding: "30px",
          borderRadius: "15px",
          backgroundColor: "#fff0f6", // Soft pink background
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          border: "2px solid #ffb6c1", // Light pink border
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "600",
            color: "#ff69b4", // Cute pink title
            marginBottom: "15px",
          }}
        >
          💕 You must do this to get a flower 💕
        </Typography>

        {/* Task List */}
        <List>
          {tasks.map((task, index) => (
            <Paper
              key={index}
              elevation={2}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "100px",
                backgroundColor: task.completed ? "#ffe6e9" : "#fff", // Soft color change for completed tasks
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: task.completed ? "#ffd6da" : "#ffe0ec", // Subtle hover effect
                },
              }}
            >
              {/* Heart Checkbox */}
              <Checkbox
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
                icon={<FavoriteBorderIcon sx={{ color: "#ff69b4" }} />} // Empty heart
                checkedIcon={<FavoriteIcon sx={{ color: "#ff69b4" }} />} // Filled heart
              />

              {/* Task Text */}
              <ListItemText
                primary={task.text}
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "gray" : "#333",
                  transition: "0.3s",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                }}
              />
              <Button
                onClick={() => deleteTask(task.id)}
                type="delete"
                sx={{
                  color: "#ffb6c1",
                  width: "2px",
                  marginLeft: "10px",
                }}
              >
                <DeleteIcon />
              </Button>
            </Paper>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ToDoList;
