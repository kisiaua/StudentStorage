import useAuth from "../hooks/useAuth.ts";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getAssignments,
  getCourse,
  getCourses,
  getJoinRequests,
  handleJoinRequest,
} from "../api/coursesApiClient.ts";
import { Course } from "../models/Course.ts";
import ConfirmJoinRequestModal from "../components/ConfirmJoinRequestModal.tsx";
import { Assignment } from "../models/Assignment.ts";
import { UserRoles } from "../models/UserRoles.ts";
import { JoinRequest } from "../models/JoinRequest.ts";
import { StatusDescriptions } from "../models/StatusDescription.ts";

const CourseDetails = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [forbiddenCourse, setForbiddenCourse] = useState<Course>();
  const [assignments, setAssignments] = useState<Assignment[] | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Zadania");
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const { auth, getUserRole } = useAuth();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        return await getCourse(id as string, auth?.jwtAccessToken ?? "");
      } catch (err: any) {
        if (err.response && err.response.status === 403) {
          await getCourses(auth?.jwtAccessToken ?? "").then((courses) => {
            const forbiddenCourse = courses.find(
              (c: Course) => c.id.toString() == id,
            );
            setForbiddenCourse(forbiddenCourse);
          });
          return "403";
        }
      }
    };
    fetchCourse().then((data) => setCourse(data));
  }, [auth?.jwtAccessToken, id]);

  useEffect(() => {
    const fetchAssignments = async () => {
      return await getAssignments(id as string, auth?.jwtAccessToken ?? "");
    };
    fetchAssignments().then((data) => setAssignments(data));
  }, [auth?.jwtAccessToken, id]);

  useEffect(() => {
    const fetchJoinRequests = async () => {
      return await getJoinRequests(id as string, auth?.jwtAccessToken ?? "");
    };
    fetchJoinRequests().then((data) => setJoinRequests(data));
  }, [auth?.jwtAccessToken, id]);

  const handleRequest = async (
    requestId: number,
    courseId: number,
    status: number,
  ) => {
    try {
      await handleJoinRequest(requestId, status, auth?.jwtAccessToken ?? "");
      await getJoinRequests(
        courseId as string,
        auth?.jwtAccessToken ?? "",
      ).then((data) => setJoinRequests(data));
    } catch (error: any) {
      console.log("error handling request", error);
    }
  };

  return (
    <section className="flex items-center justify-center flex-grow px-4 sm:px-0 w-full bg-gray-50 border border-t-gray-300">
      <div className="flex flex-col max-w-3xl bg-white border border-gray-300 rounded-lg shadow">
        <div className="p-8 space-y-6">
          {course === null ? (
            <p>Ładowanie danych kursu...</p>
          ) : course.toString() == "403" ? (
            <div className="space-x-0">
              <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
                Brak dostępu
              </h5>
              <p>Nie jesteś uczestnikiem tego kursu.</p>
              <p>
                Aby zobaczyć zawartość kursu, wyślij prośbę o dołączenie do
                kursu.
              </p>
              <div className="flex items-center justify-center mt-4 space-x-8">
                <button
                  onClick={() => navigate("/courses")}
                  className="py-2.5 px-3.5 font-medium rounded-md border border-gray-400 hover:bg-gray-50"
                >
                  Wróć
                </button>
                <ConfirmJoinRequestModal course={forbiddenCourse} />
              </div>
            </div>
          ) : (
            <div>
              <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {course.name}
              </h1>
              <p>{course.description}</p>
              {getUserRole() === UserRoles.Teacher && (
                <div className="mt-2 text-center text-gray-700 border-b border-gray-200">
                  <ul className="flex flex-wrap -mb-px">
                    <li
                      className="me-2"
                      onClick={() => setActiveTab("Zadania")}
                    >
                      <a
                        className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "Zadania" ? "border-blue-600 text-blue-600" : "border-transparent hover:text-gray-600 hover:border-gray-300"}`}
                      >
                        Zadania
                      </a>
                    </li>
                    <li
                      className="me-2"
                      onClick={() => setActiveTab("Uczestnicy")}
                    >
                      <a
                        className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "Uczestnicy" ? "border-blue-600 text-blue-600" : "border-transparent hover:text-gray-600 hover:border-gray-300"}`}
                      >
                        Uczestnicy
                      </a>
                    </li>
                  </ul>
                </div>
              )}
              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-gray-900">
                {activeTab}
              </h2>
              {activeTab === "Zadania" &&
                (assignments === null ? (
                  <p>Ładowanie zadań...</p>
                ) : assignments.length === 0 ? (
                  <p>Brak zadań do wyświetlenia.</p>
                ) : (
                  <ul className="divide-y divide-gray-300">
                    {assignments.map((assignment: Assignment) => (
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center">
                          <div className="flex-1 text-gray-950">
                            <h5 className="text-xl font-semibold">
                              {assignment.title}
                            </h5>
                            <p className="mt-3">{assignment.description}</p>
                            <p className="mt-3 text-gray-900">
                              <span className="font-semibold text-gray-950">
                                Termin
                              </span>
                              : {assignment.dueDate}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ))}
              {activeTab === "Uczestnicy" && (
                <>
                  <h1 className="mt-3 text-lg font-semibold">
                    Oczekujące prośby:
                  </h1>
                  <table className="mt-1 w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-sm font-semibold text-left">
                          Imię Nazwisko
                        </th>
                        <th className="p-2 text-sm font-semibold text-left">
                          Status
                        </th>
                        <th className="p-2 text-sm font-semibold text-left">
                          Akcje
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {joinRequests
                        .filter((request) => request.status === 0)
                        .map((request) => (
                          <tr key={request.id} className="border-b">
                            <td className="p-2 text-sm font-normal text-left">
                              {request.id}
                            </td>
                            <td className="p-2 text-sm font-normal text-left">
                              {StatusDescriptions[request.statusDescription]}
                            </td>
                            <td className="p-2 text-sm font-medium text-left space-x-4">
                              <button
                                onClick={() =>
                                  handleRequest(request.id, request.courseId, 1)
                                }
                                className="text-blue-600"
                              >
                                Akceptuj
                              </button>
                              <button
                                onClick={() =>
                                  handleRequest(request.id, request.courseId, 2)
                                }
                                className="text-red-600"
                              >
                                Odrzuć
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <h1 className="mt-5 text-lg font-semibold">
                    Zapisani użytkownicy:
                  </h1>
                  <table className="mt-1 w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-sm font-semibold text-left">
                          Imię Nazwisko
                        </th>
                        <th className="p-2 text-sm font-semibold text-left">
                          Status
                        </th>
                        <th className="p-2 text-sm font-semibold text-left">
                          Dołączono
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {joinRequests
                        .filter((request) => request.status === 1)
                        .map((request) => (
                          <tr key={request.id} className="border-b">
                            <td className="p-2 text-sm font-normal text-left">
                              {request.id}
                            </td>
                            <td className="p-2 text-sm font-normal text-left">
                              {StatusDescriptions[request.statusDescription]}
                            </td>
                            <td className="p-2 text-sm font-normal text-left">
                              {request.updatedAt}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
