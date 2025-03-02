import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";
import { Box, Paper, Typography, Button, TextField } from "@mui/material";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import flowerImage from "./flower.jpg";
import {
  db,
  auth,
  signIn,
  logout,
  tasksCollection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  updateStreak,
  getStreak,
  setUserTitle,
  getUserTitle,
} from "./firebase";
import { onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { color } from "framer-motion";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [user, setUser] = useState(null);
  const [streak, setStreak] = useState(0);
  const [customTitle, setCustomTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        fetchTasks(user.uid);
        const streak = getStreak(user.uid);
        const savedTitle = getUserTitle(user.uid);
        setStreak(streak);
        setCustomTitle(savedTitle);
      } else {
        setTasks([]);
        setStreak(0);
        setCustomTitle("My To-Do List");
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const fetchTasks = async (userId) => {
    const q = query(tasksCollection, where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
    });

    return () => unsubscribe();
  };

  const handleTitleChange = async () => {
    if (!user) return;
    await setUserTitle(user.uid, newTitle);
    setCustomTitle(newTitle);
    setNewTitle("");
  };

  const addTask = async (newTask) => {
    if (!user) return;
    await addDoc(tasksCollection, { ...newTask, userId: user.uid });
  };

  const toggleTaskCompletion = async (index) => {
    if (!user) return;
    const taskToUpdate = tasks[index];
    const taskDoc = doc(db, "tasks", taskToUpdate.id);
    await updateDoc(taskDoc, { completed: !taskToUpdate.completed });
  };

  useEffect(() => {
    if (tasks.length > 0 && tasks.every((task) => task.completed)) {
      setShowCelebration(true);
      updateStreak(user.uid);
    }
  }, [tasks]);

  const handleNewTask = async () => {
    if (!user) return;
    const q = query(tasksCollection, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
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
      <Box
        sx={{
          position: "absolute",
          bottom: "20px",
          left: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          marginBottom: "15px",
        }}
      >
        <TextField
          label="To-Do List Name"
          variant="outlined"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          sx={{ width: "60%" }}
        />
        <Button
          onClick={handleTitleChange}
          variant="contained"
          sx={{ backgroundColor: "#ff69b4", color: "white", height: "100%" }}
        >
          Save
        </Button>
      </Box>

      {!user ? (
        <Button
          variant="contained"
          onClick={signIn}
          sx={{
            backgroundColor: "#ff69b4",
            color: "white",
            padding: "10px 20px",
            fontSize: "18px",
            borderRadius: "10px",
          }}
        >
          Sign in with Google
        </Button>
      ) : (
        <>
          <Typography
            sx={{
              position: "absolute",
              top: "20px",
              left: "30px",
              fontWeight: "bold",
              fontSize: "18px",
              color: "#ff69b4",
            }}
          >
            🔥 Streak: {streak || 0} days
          </Typography>
          {showCelebration && (
            <Confetti width={width} height={height} numberOfPieces={250} />
          )}
          {user && (
            <Button
              onClick={logout}
              sx={{
                position: "absolute",
                top: "20px",
                right: "30px",
                backgroundColor: "#ff69b4",
                color: "white",
                padding: "8px 16px",
                fontSize: "16px",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#ff4d94",
                },
              }}
            >
              Logout
            </Button>
          )}

          <Paper
            elevation={10}
            sx={{
              marginTop: "40px",
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
            <Header title={customTitle || "My Love's To Do List"} />
            <ToDoForm onAddTask={addTask} />
            {tasks.length > 0 && (
              <ToDoList
                tasks={tasks}
                toggleTaskCompletion={toggleTaskCompletion}
              />
            )}

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
                <Typography variant="h5">
                  Yay! You finished everything! Here’s a flower for you!
                </Typography>
                <img
                  src={flowerImage}
                  alt="Flower"
                  style={{
                    width: "25vw",
                    maxWidth: "200px",
                    minWidth: "120px",
                    height: "auto",
                  }}
                />
                <Button
                  onClick={handleNewTask}
                  sx={{
                    marginTop: "20px",
                    backgroundColor: "#ff69b4",
                    color: "white",
                  }}
                >
                  New Task
                </Button>
              </Box>
            )}
          </Paper>
        </>
      )}
    </Box>
  );
}

export default App;
