import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.ts";
import { UserRoles } from "../models/UserRoles.ts";

const MyCourses = () => {
  const [courses] = useState<[]>([]);

  const { getUserRole } = useAuth();
  const userRole = getUserRole();

  return (
    <section className="flex items-center justify-center flex-grow px-4 sm:px-0 w-full">
      <div className="flex flex-col w-full max-w-md bg-white border border-gray-200 rounded-lg shadow">
        <div className="flex flex-col flex-grow justify-between p-5">
          {courses.length !== 0 ? (
            <></>
          ) : (
            <>
              <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
                Brak kursów
              </h5>
              <div className="flex flex-col items-center justify-center">
                <p className="text-gray-500 mb-3">
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
