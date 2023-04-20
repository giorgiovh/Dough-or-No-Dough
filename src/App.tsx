import { Routes, Route } from "react-router-dom";

// pages & components
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { Signup } from './pages/signup/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;