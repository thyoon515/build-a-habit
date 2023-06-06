import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/static/Home";
import Login from "./components/sessions/Login";
import Signup from "./components/sessions/Signup";
import NavBar from "./components/navigation/NavBar";
import Today from "./components/scheduler/Today";
import Test from "./components/scheduler/Test";
import { CurrentUserContext } from './context/CurrentUser';
import EditTaskForm from "./components/scheduler/EditTaskForm";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext)
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentUserTasks, setCurrentUserTasks] = useState([]);
  const [currentUserCategories, setCurrentUserCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [editTask, setEditTask] = useState([]);

  console.log(priorities)

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
    const getCategories = currentUserTasks.map(task => task.category);
    setCurrentUserCategories(getCategories);
  }, [currentUserTasks]);

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
          <Route path="/" element={<Home userLoggedIn={userLoggedIn} />} />
          <Route path="/login" element={<Login setUserLoggedIn={setUserLoggedIn} />} />
          <Route path="/signup" element={<Signup setUserLoggedIn={setUserLoggedIn} />} />
          <Route path="/today" element={<Today currentUserTasks={currentUserTasks} setEditTask={setEditTask} />} />
          <Route path="/tasks/:id/edit" element={<EditTaskForm editTask={editTask} currentUserTasks={currentUserTasks} setCurrentUserTasks={setCurrentUserTasks} tasks={tasks} setTasks={setTasks} currentUserCategories={currentUserCategories} priorities={priorities} />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;