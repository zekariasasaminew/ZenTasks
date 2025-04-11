import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
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
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((task) => task.id === active.id);
    const newIndex = tasks.findIndex((task) => task.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const updatedTasks = arrayMove(tasks, oldIndex, newIndex);
    reorderTasks([...updatedTasks]);
  };

  // ✅ Count tasks
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        mt: 2,
      }}
    >
      <Paper
        elevation={10} // Soft shadow for cuteness
        sx={{
          padding: "30px",
          borderRadius: "15px",
          backgroundColor: "#fff0f6", // Soft pink background
          maxWidth: "600px",
          minHeight: "400px",
          width: "100%",
          textAlign: "center",
          border: "2px solid #ffb6c1", // Light pink border
        }}
      >
        {/* Task Counter */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "600",
            color: "#ff69b4",
            marginBottom: "10px",
          }}
        >
          📌 {pendingTasks} Pending | ✅ {completedTasks} Completed
        </Typography>

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
            <Grid container spacing={2} justifyContent={"center"}>
              {tasks.map((task) => (
                <Grid xs={12} sm={1} key={task.id}>
                  <SortableItem
                    task={task}
                    toggleTaskCompletion={toggleTaskCompletion}
                    deleteTask={deleteTask}
                  />
                </Grid>
              ))}
            </Grid>
          </SortableContext>
        </DndContext>
      </Paper>
    </Box>
  );
};

export default ToDoList;
