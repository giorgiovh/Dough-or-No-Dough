import { useState, useCallback, useEffect } from "react";
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

let logoutTimer;

function App() {
  const [token, setToken] = useState(null)
  const [tokenExpirationDate, setTokenExpirationDate] = useState()
  const [userId, setUserId] = useState(null)

  // we wrap the function below with useCallback so that it is not recreated unnecessarily. This avoids infinite loops. The dependency array is empty which means it will never be recreated
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token)
    setUserId(uid)
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    setTokenExpirationDate(tokenExpirationDate)
    // this is so that we remain authenticated even after refreshing the page
    localStorage.setItem(
      'userData', 
      JSON.stringify({ 
        userId: uid, 
        token: token,
        expiration: tokenExpirationDate.toISOString() 
      })
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setTokenExpirationDate(null)
    setUserId(null)
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, logout, tokenExpirationDate])

  useEffect(() => {
    // this turns userData from JSON into a js object
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration))
    }
  }, [login])

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