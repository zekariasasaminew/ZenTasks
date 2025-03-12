import React, { useState } from "react";
import {
  TextField,
  Button,
  Tooltip,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const ToDoForm = ({ onAddTask }) => {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      const newTask = {
        text: task.trim(),
        completed: false,
        priority,
        dueDate: dueDate ? dayjs(dueDate).format("YYYY-MM-DD") : null,
      };
      onAddTask(newTask);
      setTask("");
      setDueDate(null);
      setPriority("Medium");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          // maxWidth: "600px",
        }}
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
            sx={{ width: "500px" }}
          />
        </Tooltip>

        {/*Due Date */}
        <DatePicker
          sx={{ width: "300px" }}
          label="Due Date"
          value={dueDate ? dayjs(dueDate) : null}
          onChange={(newValue) => setDueDate(newValue ? dayjs(newValue) : null)}
          format="YYYY-MM-DD"
          slotProps={{ textField: { variant: "outlined" } }}
        />

        {/* Priority */}
        <FormControl>
          <InputLabel id="priority">Priority</InputLabel>
          <Select
            label="Priority"
            sx={{ width: "200px", alignContent: "left", marginRight: "200px" }}
            value={priority}
            variant="outlined"
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value="High">🔥 High</MenuItem>
            <MenuItem value="Medium">⚡ Medium</MenuItem>
            <MenuItem value="Low">🌿 Low</MenuItem>
          </Select>
        </FormControl>

        {/* Add Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#ffb6c1", color: "white", minWidth: "100px" }}
        >
          Submit
        </Button>
      </form>
    </LocalizationProvider>
  );
};

export default ToDoForm;
