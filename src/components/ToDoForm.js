import React, { useState } from "react";
import { TextField, Button, Tooltip } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const ToDoForm = ({ onAddTask }) => {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      const newTask = {
        text: task.trim(),
        completed: false,
        dueDate: dueDate ? dayjs(dueDate).format("YYYY-MM-DD") : null,
      };
      onAddTask(newTask);
      setTask("");
      setDueDate(null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        <DatePicker
          label="Due Date"
          value={dueDate ? dayjs(dueDate) : null}
          onChange={(newValue) => setDueDate(newValue ? dayjs(newValue) : null)}
          format="YYYY-MM-DD"
          slotProps={{ textField: { variant: "outlined" } }}
        />

        {/* Add Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#ffb6c1", color: "white" }}
        >
          Submit
        </Button>
      </form>
    </LocalizationProvider>
  );
};

export default ToDoForm;
