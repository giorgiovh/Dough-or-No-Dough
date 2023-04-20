import { useState, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// pages & components
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { Signup } from './pages/signup/Signup';
import Navbar from "./components/Navbar";
import { AuthContext } from './context/auth-context'

function App() {
  const [cartIsEmpty] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // we wrap the function below with useCallback so that it is not recreated unnecessarily. This avoids infite loops. The dependency array is empty which means it will never be recreated
  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
  }, [])

  return (
    <div className="App">
      <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* this is how to redirect in react-router v6 */}
          <Route
            path="/checkout"
            element={cartIsEmpty ? <Navigate to="/" /> : <p>checkout</p>}
          />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;