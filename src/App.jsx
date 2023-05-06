import { useState, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// context
import { AuthContext } from './context/auth-context'

// pages
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { Signup } from './pages/signup/Signup';
import { UpdateTransaction } from "./pages/update/UpdateTransaction";

// components
import Navbar from "./components/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)

  // we wrap the function below with useCallback so that it is not recreated unnecessarily. This avoids infite loops. The dependency array is empty which means it will never be recreated
  const login = useCallback((uid) => {
    setIsLoggedIn(true)
    setUserId(uid)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUserId(null)
  }, [])

  return (
    <div className="App">
      <AuthContext.Provider value={{isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
          <Route path="/transactions/:id/edit" element={<UpdateTransaction />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;