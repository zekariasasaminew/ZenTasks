import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ListItemText, Checkbox, Paper, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const SortableItem = ({ task, toggleTaskCompletion, deleteTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  return (
    <Paper
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      elevation={2}
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "100px",
        backgroundColor: task.completed ? "#ffe6e9" : "#fff",
        transition: "0.3s",
        transform: CSS.Transform.toString(transform),
        transition: transition || "transform 0.2s ease",
        "&:hover": {
          backgroundColor: task.completed ? "#ffd6da" : "#ffe0ec",
        },
      }}
    >
      {/* Heart Checkbox */}
      <Checkbox
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)}
        icon={<FavoriteBorderIcon sx={{ color: "#ff69b4" }} />}
        checkedIcon={<FavoriteIcon sx={{ color: "#ff69b4" }} />}
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
        sx={{ color: "#ffb6c1", marginLeft: "10px" }}
      >
        <DeleteIcon />
      </Button>
    </Paper>
  );
};

export default SortableItem;
