import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth.ts";
import { AssignmentForm } from "../models/AssignmentForm.ts";
import { createAssignment } from "../api/assignmentsApiClient.ts";

const CreateAssignment = () => {
  const [assignment, setAssignment] = useState<AssignmentForm>({
    title: "",
    description: "",
    dueDate: "",
    allowLateSubmissions: false,
    hidden: false,
  });

  const navigate = useNavigate();

  const { auth } = useAuth();

  const { id } = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("assignment", assignment);
    try {
      await createAssignment(
        assignment,
        id as string,
        auth?.jwtAccessToken ?? "",
      );
      setAssignment({
        title: "",
        description: "",
        dueDate: "",
        allowLateSubmissions: false,
        hidden: false,
      });
      navigate(-1);
    } catch (error: any) {
      console.log("error creating asssignment", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;
    setAssignment((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <section className="flex items-center justify-center flex-grow px-4 sm:px-0 w-full bg-gray-50 border border-t-gray-300">
      <div className="flex flex-col lg:w-1/4 bg-white border border-gray-300 rounded-lg shadow">
        <div className="p-8 space-y-6">
          <h1 className="text-2xl font-bold">Utwórz zadanie</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="assignment-title"
                className="block mb-2 font-medium"
              >
                Nazwa zadania
              </label>
              <input
                type="assignment-title"
                id="course-title"
                name="title"
                value={assignment.title}
                onChange={handleChange}
                required
                placeholder="Projekt zaliczeniowy"
                className="border-2 border-gray-300 rounded-lg block p-2.5 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="assignment-description"
                className="block mb-2 font-medium"
              >
                Opis zadania
              </label>
              <textarea
                id="assignment-description"
                name="description"
                value={assignment.description}
                onChange={handleChange}
                required
                placeholder="Opis zadania..."
                className="border-2 border-gray-300 rounded-lg block p-2.5 w-full"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="assignment-due-date"
                className="block mb-2 font-medium"
              >
                Termin oddania
              </label>
              <input
                type="datetime-local"
                id="assignment-due-date"
                name="dueDate"
                value={assignment.dueDate}
                onChange={handleChange}
                required
                className="border-2 border-gray-300 rounded-lg block p-2.5 w-full"
              />
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="allow-late-submissions"
                name="allowLateSubmissions"
                className="w-4 h-4 accent-blue-700"
                checked={assignment.allowLateSubmissions}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    allowLateSubmissions: e.target.checked,
                  })
                }
              />
              <label
                htmlFor="allow-late-submissions"
                className="block font-medium"
              >
                Zezwalaj na spóźnione przesyłanie
              </label>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="hidden"
                name="hidden"
                className="w-4 h-4 accent-blue-700"
                checked={assignment.hidden}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    hidden: e.target.checked,
                  })
                }
              />
              <label htmlFor="hidden" className="block font-medium">
                Ukryj zadanie
              </label>
            </div>
            <button className="w-full text-white bg-blue-700 hover:bg-blue-900 font-medium rounded-lg text-center py-2.5">
              Utwórz zadanie
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateAssignment;
