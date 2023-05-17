// react
import { Routes, Route, Navigate } from "react-router-dom";

// context
import { AuthContext } from './context/auth-context'

// pages
import { Home } from './pages/home/Home';
import { UpdateTransaction } from "./pages/update/UpdateTransaction";
import Login from "./pages/login/Login";

// components
import Navbar from "./components/Navbar";
import UnauthenticatedScreen from "./components/UnauthenticatedScreen";

// hooks
import { useAuth } from "./hooks/auth-hook";
import Signup from "./pages/signup/Signup";

function App() {
  const { token, login, logout, userId } = useAuth()
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
          <Route path="/" element={token ? <Home /> : <UnauthenticatedScreen />} />
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={token ? <Navigate to="/" /> : <Signup />} />
          <Route path="/transactions/:id/edit" element={token ? <UpdateTransaction /> : <Navigate to="/" />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;