import { useState } from "react";
import Modal from "./Modal";
import useAuth from "../hooks/useAuth";
import { Course } from "../models/Course.ts";
import { sendRequestToJoinCourse } from "../api/coursesApiClient.ts";

interface ConfirmJoinRequestModalProps {
  course: Course;
}

const ConfirmJoinRequestModal = ({ course }: ConfirmJoinRequestModalProps) => {
  const [isJoinOpen, setIsJoinOpen] = useState<boolean>(false);
  const [isRequestPending, setIsRequestPending] = useState<boolean>(false);

  const { auth } = useAuth();

  const handleJoinButton = async () => {
    try {
      const response = await sendRequestToJoinCourse(
        course.id,
        auth?.jwtAccessToken ?? "",
      );
      console.log(response);
      setIsJoinOpen(false);
    } catch (err: any) {
      if (
        err.response.status === 400 &&
        err.response.data ===
          "There is already a pending request for this course."
      ) {
        setIsJoinOpen(false);
        setIsRequestPending(true);
      }
      console.log("error joining course", err);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsJoinOpen(true)}
        className="text-white bg-blue-700 hover:bg-blue-900 font-medium rounded-lg text-center py-2.5 px-3.5"
      >
        <span>Dołącz</span>
      </button>

      <Modal isOpen={isJoinOpen} onClose={() => setIsJoinOpen(false)}>
        <h3 className="text-base text-center">
          Czy jesteś pewny, że chcesz dołączyć do kursu{" "}
          <span className="font-semibold">{course.name}</span>?
        </h3>
        <div className="text-center">
          <button
            onClick={handleJoinButton}
            className="py-2.5 px-3.5 mt-4 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Tak, dołącz
          </button>
          <button
            onClick={() => setIsJoinOpen(false)}
            className="py-2.5 px-3.5 mt-4 font-medium rounded-md border ml-5"
          >
            Nie, anuluj
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isRequestPending}
        onClose={() => setIsRequestPending(false)}
      >
        <h3 className="text-base text-center">
          Wysłałeś już prośbę o dołączenie do kursu{" "}
          <span className="font-semibold">{course.name}</span>. Proszę czekać na
          akceptację.
        </h3>
        <div className="text-center">
          <button
            onClick={() => setIsRequestPending(false)}
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
