import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";
import { Box, Paper, Typography } from "@mui/material";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import flowerImage from "./flower.jpg";
import {
  db,
  tasksCollection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "./firebase";
import { onSnapshot } from "firebase/firestore";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);

  // Real-time Firestore listener
  useEffect(() => {
    const unsubscribe = onSnapshot(tasksCollection, (snapshot) => {
      const fetchedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
    });

    return () => unsubscribe();
  }, []);

  // Add new task to Firestore
  const addTask = async (newTask) => {
    await addDoc(tasksCollection, newTask);
  };

  // Toggle task completion in Firestore
  const toggleTaskCompletion = async (index) => {
    const taskToUpdate = tasks[index];
    const taskDoc = doc(db, "tasks", taskToUpdate.id);
    await updateDoc(taskDoc, { completed: !taskToUpdate.completed });
  };

  // Show celebration when all tasks are completed
  useEffect(() => {
    if (tasks.length > 0 && tasks.every((task) => task.completed)) {
      setShowCelebration(true);
    }
  }, [tasks]);

  // Clear tasks from Firestore when the "New Task" button is clicked
  const handleNewTask = async () => {
    const querySnapshot = await getDocs(tasksCollection);
    const deletePromises = querySnapshot.docs.map((task) =>
      deleteDoc(doc(db, "tasks", task.id))
    );
    await Promise.all(deletePromises);
    setShowCelebration(false);
  };

  const { width, height } = useWindowSize();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #ffdde1, #ee9ca7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0",
        margin: "0",
        position: "relative",
      }}
    >
      {showCelebration && (
        <Confetti width={width} height={height} numberOfPieces={250} />
      )}

      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: "500px",
          minHeight: "90vh",
          backgroundColor: "#fff0f6",
          borderRadius: "15px",
          padding: "30px",
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <Header />
        <ToDoForm onAddTask={addTask} />
        <ToDoList tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} />

        {showCelebration && (
          <Box
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "#ff69b4",
                mb: 2,
                textAlign: "center",
              }}
            >
              Yay! You finished everything! Here’s a flower for you!
            </Typography>
            <img
              src={flowerImage}
              alt="Flower"
              style={{
                borderRadius: "15px",
                width: "50vw",
                maxWidth: "500px",
                minWidth: "120px",
                height: "auto",
              }}
            />
            <button
              onClick={handleNewTask}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#ff69b4",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              New Task
            </button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default App;
