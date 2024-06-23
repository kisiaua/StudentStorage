import { useParams } from "react-router-dom";
import { Assignment } from "../models/Assignment.ts";
import { useEffect, useState } from "react";
import {
  downloadSolution,
  getAssignment,
  getAssignmentSummarySolutions,
  SubmitSolution,
} from "../api/assignmentsApiClient.ts";
import useAuth from "../hooks/useAuth.ts";
import AddAssignmentDropzone from "../components/AddAssignmentDropzone.tsx";
import ConfirmationSentAssignmentModal from "../components/ConfirmationSentAssignmentModal.tsx";
import { UserRoles } from "../models/UserRoles.ts";
import { Solution, SolutionStatuses } from "../models/Solution.ts";
import { parseDateToLocalFormat } from "../utils/dateUtils.ts";
import { JoinRequest } from "../models/JoinRequest.ts";
import { getJoinRequests } from "../api/coursesApiClient.ts";

const AssignmentDetails = () => {
  const [assignment, setAssignment] = useState<Assignment>();
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isAddAssignmentFormOpen, setIsAddAssignmentFormOpen] =
    useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [members, setMembers] = useState<JoinRequest[]>([]);

  const { courseId, assignmentId } = useParams();
  const { auth, getUserRole } = useAuth();

  const handleDownloadSolution = async (solution: Solution) => {
    const user = members.find(
      (member) => member.user.userName === solution.userName,
    );

    const response = await downloadSolution(
      user?.user.id as number,
      assignmentId as string,
      auth?.jwtAccessToken ?? "",
    );

    const url = window.URL.createObjectURL(response);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${assignment?.title}_${user?.user.firstName}${user?.user.lastName}.zip`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const fetchMembers = async () => {
      return await getJoinRequests(
        courseId as string,
        auth?.jwtAccessToken ?? "",
      );
    };
    fetchMembers().then((data) => setMembers(data));
  }, [auth?.jwtAccessToken, courseId]);

  useEffect(() => {
    const fetchAssignment = async () => {
      return await getAssignment(
        assignmentId as string,
        auth?.jwtAccessToken ?? "",
      );
    };
    fetchAssignment().then((data) => setAssignment(data));
  }, [assignmentId, auth?.jwtAccessToken]);

  useEffect(() => {
    const fetchSummarySolutions = async () => {
      return await getAssignmentSummarySolutions(
        assignmentId as string,
        auth?.jwtAccessToken ?? "",
      );
    };
    fetchSummarySolutions().then((data) => setSolutions(data));
  }, [assignmentId, auth?.jwtAccessToken]);

  const handleAddButton = () => {
    setIsAddAssignmentFormOpen((prev) => !prev);
  };

  const handleAddAssignment = async () => {
    return await SubmitSolution(
      files,
      assignment?.id as number,
      auth?.jwtAccessToken ?? "",
    );
  };

  return (
    <section className="flex items-center justify-center flex-grow px-4 sm:px-0 w-full bg-gray-50 border border-t-gray-300">
      <div className="flex flex-col max-w-3xl bg-white border border-gray-300 rounded-lg shadow">
        <div className="p-8">
          {assignment === null ? (
            <p>Ładowanie danych zadania...</p>
          ) : (
            <>
              <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
                Zadanie
              </h5>
              <h5 className="mt-2 text-xl font-semibold">
                {assignment?.title}
              </h5>
              <p className="mt-2 text-gray-950">{assignment?.description}</p>
              <p className="mt-2 text-gray-900">
                <span className="font-semibold text-gray-950">Utworzono</span>:{" "}
                {assignment
                  ? parseDateToLocalFormat(assignment.createdAt as string)
                  : "Ładowanie..."}
              </p>
              <p className="mt-1 text-gray-900">
                <span className="font-semibold text-gray-950">Termin</span>:{" "}
                {assignment
                  ? parseDateToLocalFormat(assignment?.dueDate as string)
                  : "Ładowanie..."}
              </p>
              {!isAddAssignmentFormOpen &&
                getUserRole() === UserRoles.Student && (
                  <button
                    onClick={handleAddButton}
                    className="py-2.5 px-3.5 mt-4 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Dodaj zadanie
                  </button>
                )}
              {isAddAssignmentFormOpen && (
                <div className="mt-5">
                  <AddAssignmentDropzone files={files} setFiles={setFiles} />
                  <ConfirmationSentAssignmentModal
                    assignment={assignment as Assignment}
                    handleAddAssignment={handleAddAssignment}
                    setIsAddAssignmentFormOpen={setIsAddAssignmentFormOpen}
                    setFiles={setFiles}
                  />
                </div>
              )}
              {getUserRole() === UserRoles.Teacher && (
                <>
                  <h1 className="mt-5 text-lg font-semibold">
                    Status przesłanych rozwiązań
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
                      {solutions.map((solution) => (
                        <tr key={solution.id} className="border-b">
                          <td className="p-2 text-sm font-normal text-left">
                            {solution.firstName} {solution.lastName}
                          </td>
                          <td className="p-2 text-sm font-normal text-left">
                            {SolutionStatuses[solution.solutionStatus]}
                          </td>
                          <td className="p-2 text-sm font-normal text-left">
                            {SolutionStatuses[solution.solutionStatus] ===
                              SolutionStatuses.Submitted && (
                              <button
                                onClick={() => handleDownloadSolution(solution)}
                                className="text-green-700"
                              >
                                Pobierz
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AssignmentDetails;
