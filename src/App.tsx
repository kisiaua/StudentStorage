import "./App.css";
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import Test from "./components/Test.tsx";
import MyCourses from "./pages/MyCourses.tsx";
import { UserRoles } from "./models/UserRoles.ts";
import Courses from "./pages/Courses.tsx";
import CreateCourse from "./pages/CreateCourse.tsx";
import CourseDetails from "./pages/CourseDetails.tsx";
import AssignmentDetails from "./pages/AssignmentDetails.tsx";
import CreateAssignment from "./pages/CreateAssignment.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth allowedRoles={UserRoles.Student} />}>
          <Route path="/test" element={<Test />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route
            path="/course/:courseId/assignment/:assignmentId"
            element={<AssignmentDetails />}
          />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/courses" element={<Courses />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={UserRoles.Teacher} />}>
          <Route path="/create-course" element={<CreateCourse />} />
          <Route
            path="/course/:id/create-assignment"
            element={<CreateAssignment />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
