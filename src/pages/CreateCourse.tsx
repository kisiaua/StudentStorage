import { CourseForm } from "../models/Course.ts";
import React, { useState } from "react";
import { createCourse } from "../api/coursesApiClient.ts";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.ts";

const CreateCourse = () => {
  const [course, setCourse] = useState<CourseForm>({
    name: "",
    description: "",
  });

  const navigate = useNavigate();

  const { auth } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createCourse(course, auth?.jwtAccessToken ?? "");
      setCourse({ name: "", description: "" });
      navigate("/my-courses");
    } catch (error: any) {
      console.log("error creating course", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;
    setCourse((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <section className="flex items-center justify-center flex-grow px-4 sm:px-0 w-full bg-gray-50 border border-t-gray-300">
      <div className="flex flex-col lg:w-1/4 bg-white border border-gray-300 rounded-lg shadow">
        <div className="p-8 space-y-6">
          <h1 className="text-2xl font-bold">Utwórz kurs</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="course-name" className="block mb-2 font-medium">
                Nazwa kursu
              </label>
              <input
                type="course-name"
                id="course-name"
                name="name"
                value={course.name}
                onChange={handleChange}
                required
                placeholder="Analiza matematyczna"
                className="border-2 border-gray-300 rounded-lg block p-2.5 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="course-description"
                className="block mb-2 font-medium"
              >
                Opis kursu
              </label>
              <textarea
                id="course-description"
                name="description"
                value={course.description}
                onChange={handleChange}
                required
                placeholder="Opis kursu..."
                className="border-2 border-gray-300 rounded-lg block p-2.5 w-full"
              ></textarea>
            </div>
            <button className="w-full text-white bg-blue-700 hover:bg-blue-900 font-medium rounded-lg text-center py-2.5">
              Utwórz kurs
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateCourse;
