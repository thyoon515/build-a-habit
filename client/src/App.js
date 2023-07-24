import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrentUserContext } from './context/CurrentUser';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Login from "./components/sessions/Login";
import Signup from "./components/sessions/Signup";
import NavBar from "./components/navigation/NavBar";
import Today from "./components/scheduler/Today";
import EditTaskForm from "./components/scheduler/EditTaskForm";
import AddTaskForm from "./components/scheduler/AddTaskForm";

function App() {
  
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext)
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentUserTasks, setCurrentUserTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [editTask, setEditTask] = useState([]);

  useEffect(() => {
    fetch('/tasks')
      .then(r => r.json())
      .then(allTasks => setTasks(allTasks))
  },[]);

  useEffect(() => {
    fetch('/priorities')
      .then(r => r.json())
      .then(priorityData => setPriorities(priorityData))
  }, [])
  
  useEffect(() =>{
    const filteredTasks = tasks.filter(task => task.user.id === currentUser.id);
      setCurrentUserTasks(filteredTasks);
  },[tasks, currentUser.id]);

  useEffect(() => {
    fetch('/categories')
      .then(r => r.json())
      .then(allCategories => setCategories(allCategories))
  }, [])
  

  useEffect(() => {
    fetch('/me').then((response) => {
      if (response.ok) {
        response.json().then((stillSameUser) => {
          setUserLoggedIn(true)
          setCurrentUser(stillSameUser)
        });
      }
    });
  }, [setCurrentUser]); 

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <NavBar userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
        <Routes>
          <Route path="/" element={< Login setUserLoggedIn={setUserLoggedIn} />} />
          <Route path="/login" element={<Login setUserLoggedIn={setUserLoggedIn} />} />
          <Route path="/signup" element={<Signup setUserLoggedIn={setUserLoggedIn} />} />
          <Route path="/tasks" element={<Today currentUserTasks={currentUserTasks} setEditTask={setEditTask} />} />
          <Route path="/tasks/edit" element={<EditTaskForm editTask={editTask} currentUserTasks={currentUserTasks} setCurrentUserTasks={setCurrentUserTasks} tasks={tasks} setTasks={setTasks} categories={categories} priorities={priorities} />} />
          <Route path="/tasks/new" element={<AddTaskForm currentUserTasks={currentUserTasks} setCurrentUserTasks={setCurrentUserTasks} tasks={tasks} setTasks={setTasks} categories={categories} priorities={priorities} />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;