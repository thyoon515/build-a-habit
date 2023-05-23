import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/static/Home";
import Login from "./components/sessions/Login";
import Signup from "./components/sessions/Signup";
import NavBar from "./components/navigation/NavBar";
import { CurrentUserContext } from './context/CurrentUser';

function App() {
  
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext)

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
    <BrowserRouter>
      <NavBar userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
      <Routes>
        <Route path="/" element={<Home userLoggedIn={userLoggedIn} />} />
        <Route path="/login" element={<Login setUserLoggedIn={setUserLoggedIn} />} />
        <Route path="/signup" element={<Signup setUserLoggedIn={setUserLoggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;