import { useEffect, useState } from "react";
import { Course } from "../models/Course.ts";
import { getCourses } from "../api/coursesApiClient.ts";
import useAuth from "../hooks/useAuth.ts";
import ConfirmJoinRequestModal from "../components/ConfirmJoinRequestModal.tsx";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const { auth } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      return await getCourses(auth?.jwtAccessToken ?? "");
    };
    fetchCourses().then((data) => setCourses(data));
  }, [auth?.jwtAccessToken]);

  return (
    <section className="flex items-center justify-center flex-grow px-4 sm:px-0 w-full bg-gray-50 border border-t-gray-300">
      <div className="flex flex-col max-w-3xl bg-white border border-gray-300 rounded-lg shadow">
        <div className="flex flex-col flex-grow justify-between p-5">
          <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
            Wszystkie kursy
          </h5>
          <ul className="divide-y divide-gray-300">
            {courses?.map((course: Course) => (
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-8">
                  <div className="flex-1 min-w-0 text-gray-900">
                    <Link to={`/course/${course.id}`}>
                      <h5 className="text-lg font-semibold">{course.name}</h5>
                    </Link>
                    <p className="mt-3 text-gray-700">
                      <span className="font-medium text-gray-950">
                        Nauczyciel
                      </span>
                      : {course.creator.firstName} {course.creator.lastName}
                    </p>
                  </div>
                  <ConfirmJoinRequestModal course={course} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Courses;
