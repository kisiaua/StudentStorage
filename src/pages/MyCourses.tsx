import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.ts";
import { UserRoles } from "../models/UserRoles.ts";
import {
  getStudentCourses,
  getTeacherCourses,
} from "../api/coursesApiClient.ts";
import { Course } from "../models/Course.ts";

const MyCourses = () => {
  const [myCourses, setMyCourses] = useState<Course[]>([]);

  const { auth, getUserRole, getUserId } = useAuth();
  const userRole = getUserRole();
  const userId = getUserId();

  useEffect(() => {
    const fetchCourses = async () => {
      if (userRole === UserRoles.Student) {
        return await getStudentCourses(userId, auth?.jwtAccessToken ?? "");
      }
      if (userRole === UserRoles.Teacher) {
        return await getTeacherCourses(userId, auth?.jwtAccessToken ?? "");
      }
    };
    fetchCourses().then((data) => {
      console.log(data);
      setMyCourses(data);
    });
  }, [auth?.jwtAccessToken, userId, userRole]);

  return (
    <section className="flex items-center justify-center flex-grow px-4 sm:px-0 w-full bg-gray-50 border border-t-gray-300">
      <div className="flex flex-col max-w-3xl bg-white border border-gray-300 rounded-lg shadow my-5">
        <div className="flex flex-col flex-grow justify-between p-5">
          {myCourses.length !== 0 ? (
            <>
              <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
                Moje kursy
              </h5>
              <ul className="divide-y divide-gray-300">
                {myCourses?.map((course: Course) => (
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-8">
                      <div className="flex-1 min-w-0 text-gray-900">
                        <Link to={`/course/${course.id}`}>
                          <h5 className="text-lg font-semibold">
                            {course.name}
                          </h5>
                        </Link>
                        <p className="mt-3 text-gray-700">
                          <span className="font-medium text-gray-950">
                            Nauczyciel
                          </span>
                          : {course.creator.firstName} {course.creator.lastName}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
                <div className="pt-3 flex flex-col items-center justify-center">
                  <div className="w-96">
                    <p className="text-gray-500 mb-3 text-center">
                      {userRole === UserRoles.Student &&
                        "Lub kliknij poniżej, aby zobaczyć listę wszystkich kursów."}
                      {userRole === UserRoles.Teacher &&
                        "Lub kliknij poniżej, aby by utworzyć nowy kurs."}
                    </p>
                  </div>
                  <Link
                    to={
                      userRole === UserRoles.Student
                        ? "/courses"
                        : "/create-course"
                    }
                  >
                    <button className="text-white bg-blue-700 hover:bg-blue-900 font-medium rounded-lg text-center py-2 px-2.5">
                      {userRole === UserRoles.Student && "Wszystkie kursy"}
                      {userRole === UserRoles.Teacher && "Utwórz kurs"}
                    </button>
                  </Link>
                </div>
              </ul>
            </>
          ) : (
            <>
              <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
                Brak kursów
              </h5>
              <div className="flex flex-col items-center justify-center max-w-md">
                <p className="text-gray-500 mb-3 text-center">
                  {userRole === UserRoles.Student &&
                    "Nie jesteś jeszcze zapisany na żaden kurs. Kliknij poniżej, aby zobaczyć listę dostępnych kursów."}
                  {userRole === UserRoles.Teacher &&
                    "Nie utworzyłeś jeszcze żadnego kursu. Kliknij poniżej, aby by utworzyć nowy kurs."}
                </p>
                <Link
                  to={
                    userRole === UserRoles.Student
                      ? "/courses"
                      : "/create-course"
                  }
                >
                  <button className="text-white bg-blue-700 hover:bg-blue-900 font-medium rounded-lg text-center py-2 px-2.5">
                    {userRole === UserRoles.Student && "Wszystkie kursy"}
                    {userRole === UserRoles.Teacher && "Utwórz kurs"}
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyCourses;
