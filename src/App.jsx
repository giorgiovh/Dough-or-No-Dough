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
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)

  // we wrap the function below with useCallback so that it is not recreated unnecessarily. This avoids infinite loops. The dependency array is empty which means it will never be recreated
  const login = useCallback((uid, token) => {
    setToken(token)
    setUserId(uid)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
  }, [])

  return (
    <div className="App">
      <AuthContext.Provider 
        value={{
          isLoggedIn: !!token,
          token: token, 
          userId: userId, 
          login: login, 
          logout: logout
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={token ? <Navigate to="/" /> : <Signup />} />
          <Route path="/transactions/:id/edit" element={<UpdateTransaction />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;