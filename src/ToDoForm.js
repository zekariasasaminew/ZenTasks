import React, { useState } from "react";
import { TextField, Button, Tooltip } from "@mui/material";

const ToDoForm = ({ onAddTask }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      const newTask = {
        text: task.trim(),
        completed: false,
      };
      onAddTask(newTask);
      setTask("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "10px", marginTop: "20px" }}
    >
      {/* Input Field */}
      <Tooltip
        title="When you add today's task and finish all you will get a FLOWER"
        arrow={true}
      >
        <TextField
          label="Add a new task"
          variant="outlined"
          value={task}
          autoComplete="off"
          onChange={(e) => setTask(e.target.value)}
          sx={{ width: "100%" }}
        />
      </Tooltip>

      {/* Add Button */}
      <Button
        type="submit"
        variant="contained"
        sx={{ backgroundColor: "#ffb6c1", color: "white" }}
      >
        Submit
      </Button>
    </form>
  );
};

export default ToDoForm;
