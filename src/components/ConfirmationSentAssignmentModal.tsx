import React, { useState } from "react";
import Modal from "./Modal";
import { Assignment } from "../models/Assignment.ts";

interface ConfirmJoinRequestModalProps {
  assignment: Assignment;
  handleAddAssignment: () => Promise<any>;
  setIsAddAssignmentFormOpen: (value: boolean) => void;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const ConfirmJoinRequestModal = ({
  assignment,
  handleAddAssignment,
  setIsAddAssignmentFormOpen,
  setFiles,
}: ConfirmJoinRequestModalProps) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

  const closeModal = async () => {
    setIsAddAssignmentFormOpen(false);
  };

  const submitAssignment = async () => {
    try {
      await handleAddAssignment();
      setIsConfirmationOpen(true);
    } catch (error: any) {
      setIsErrorOpen(true);
    }
  };

  return (
    <>
      <div className="text-center space-x-10">
        <button
          onClick={submitAssignment}
          className="py-2.5 px-3.5 mt-4 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Prześlij zadanie
        </button>
        <button
          onClick={() => {
            setIsAddAssignmentFormOpen(false);
            setFiles([]);
          }}
          className="py-2.5 px-3.5 mt-4 text-sm rounded-md border border-gray-400 ml-5"
        >
          Anuluj
        </button>
      </div>

      <Modal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
      >
        <h3 className="text-base text-center">
          Wysłałeś rozwiązanie do zadania{" "}
          <span className="font-semibold">{assignment.title}</span>.
        </h3>
        <div className="text-center">
          <button
            onClick={closeModal}
            className="py-2.5 px-3.5 mt-4 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            OK
          </button>
        </div>
      </Modal>

      <Modal isOpen={isErrorOpen} onClose={() => setIsErrorOpen(false)}>
        <h3 className="text-base text-center">
          Wystąpił błąd podczas wysyłania rozwiązania do zadania{" "}
          <span className="font-semibold">{assignment.title}</span>.
        </h3>
        <div className="text-center">
          <button
            onClick={() => setIsErrorOpen(false)}
            className="py-2.5 px-3.5 mt-4 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            OK
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmJoinRequestModal;
