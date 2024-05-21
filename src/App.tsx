import "./App.css";
import { Route, Routes } from "react-router-dom";
import Index from "./components/Index.tsx";
import Register from "./components/Register.tsx";
import Login from "./components/Login.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
