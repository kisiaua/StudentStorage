import "./App.css";
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import Test from "./components/Test.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path="/test" element={<Test />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
