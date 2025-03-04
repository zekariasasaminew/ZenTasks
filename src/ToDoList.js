import React from "react";
import { List, Paper, Typography, Box } from "@mui/material";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const ToDoList = ({
  tasks,
  toggleTaskCompletion,
  deleteTask,
  reorderTasks,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);
      reorderTasks(arrayMove(tasks, oldIndex, newIndex));
    }
  };

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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            <List>
              {tasks.map((task) => (
                <SortableItem
                  key={task.id}
                  task={task}
                  toggleTaskCompletion={toggleTaskCompletion}
                  deleteTask={deleteTask}
                />
              ))}
            </List>
          </SortableContext>
        </DndContext>
      </Paper>
    </Box>
  );
};

export default ToDoList;
