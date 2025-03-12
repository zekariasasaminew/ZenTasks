import React, { useState, useEffect } from "react";
import Header from "./components/Header.js";
import ToDoForm from "./components/ToDoForm.js";
import ToDoList from "./components/ToDoList.js";
import Quotes from "./utils/quotes.js";
import UpdateNotification from "./functions/UpdateNotification.js";
import { Box, Paper, Typography, Button, TextField } from "@mui/material";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import flowerImage from "./assets/flower.jpg";
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

function App() {
  const [tasks, setTasks] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [user, setUser] = useState(null);
  const [streak, setStreak] = useState(0);
  const [customTitle, setCustomTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const fetchTasks = async (userId) => {
    const q = query(tasksCollection, where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const sortedTasks = [...fetchedTasks].sort((a, b) => a.order - b.order);
      setTasks(sortedTasks);
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

    const docRef = await addDoc(tasksCollection, {
      ...newTask,
      userId: user.uid,
      completed: false,
      order: tasks.length,
    });
  };

  const toggleTaskCompletion = async (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );

      const sortedTasks = [...updatedTasks].sort(
        (a, b) => a.completed - b.completed
      );

      sortedTasks.forEach(async (task, index) => {
        const taskDoc = doc(db, "tasks", task.id);
        await updateDoc(taskDoc, {
          completed: task.completed,
          order: index,
        });
      });

      return sortedTasks;
    });
  };

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

  const deleteTask = async (taskId) => {
    if (!user) return;
    await deleteDoc(doc(db, "tasks", taskId));
    setTasks((prevTasks) => {
      return prevTasks
        .filter((task) => task.id !== taskId)
        .map((task) => ({ ...task }));
    });
  };

  const reorderTasks = (newOrder) => {
    setTasks(newOrder);
  };

  const { width, height } = useWindowSize();

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

  useEffect(() => {
    if (tasks.length > 0 && tasks.every((task) => task.completed)) {
      setShowCelebration(true);
      updateStreak(user.uid);
    }
  }, [tasks, user]);

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
        position: "absolute",
        overflow: "hidden",
      }}
    >
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
          <UpdateNotification />
          <Box
            sx={{
              position: "absolute",
              bottom: "720px",
              left: "200px",
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
              autoComplete="off"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              sx={{ width: "60%" }}
            />
            <Button
              onClick={handleTitleChange}
              variant="contained"
              sx={{
                backgroundColor: "#ff69b4",
                color: "white",
                height: "100%",
              }}
            >
              Save
            </Button>
          </Box>
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
              marginLeft: "40px",
              marginTop: "40px",
              width: "100%",
              maxWidth: "800px",
              minHeight: "90vh",
              maxHeight: "90vh",
              backgroundColor: "#fff0f6",
              borderRadius: "15px",
              padding: "30px",
              textAlign: "center",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              position: "absolute",
              zIndex: 1,
              overflowY: "auto",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#ff69b4",
                fontWeight: "bold",
                fontSize: "16px",
                textAlign: "right",
                marginTop: "-15px",
                marginBottom: "5px",
              }}
            >
              {"Date: " + new Date().toLocaleDateString()}
            </Typography>
            <Header title={customTitle || "My Love's To Do List"} />
            <ToDoForm onAddTask={addTask} />
            {tasks.length > 0 && (
              <ToDoList
                tasks={tasks}
                toggleTaskCompletion={toggleTaskCompletion}
                deleteTask={deleteTask}
                reorderTasks={reorderTasks}
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
          <Quotes />
        </>
      )}
    </Box>
  );
}

export default App;
