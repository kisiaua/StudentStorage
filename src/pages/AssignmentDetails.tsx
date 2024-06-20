import { useParams } from "react-router-dom";
import { Assignment } from "../models/Assignment.ts";
import { useEffect, useState } from "react";
import { getAssignment, SubmitSolution } from "../api/assignmentsApiClient.ts";
import useAuth from "../hooks/useAuth.ts";
import AddAssignmentDropzone from "../components/AddAssignmentDropzone.tsx";
import ConfirmationSentAssignmentModal from "../components/ConfirmationSentAssignmentModal.tsx";

const AssignmentDetails = () => {
  const [assignment, setAssignment] = useState<Assignment>();
  const [isAddAssignmentFormOpen, setIsAddAssignmentFormOpen] =
    useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const { assignmentId } = useParams();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchAssignment = async () => {
      return await getAssignment(
        assignmentId as string,
        auth?.jwtAccessToken ?? "",
      );
    };
    fetchAssignment().then((data) => setAssignment(data));
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
                {assignment?.createdAt}
              </p>
              <p className="mt-1 text-gray-900">
                <span className="font-semibold text-gray-950">Termin</span>:{" "}
                {assignment?.dueDate}
              </p>
              {!isAddAssignmentFormOpen && (
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
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AssignmentDetails;
