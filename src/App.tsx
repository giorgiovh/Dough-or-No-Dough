import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// pages & components
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { Signup } from './pages/signup/Signup';
import Navbar from "./components/Navbar";

function App() {
  const [cartIsEmpty] = useState(true)

  return (
    <div className="App">
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
    </div>
  );
}

export default App;