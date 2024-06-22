import axios from "./apiConfig.ts";
import { CourseForm } from "../models/Course.ts";

export const getCourses = async (jwtAccessToken: string) => {
  try {
    const response = await axios.get("/api/v1/Courses", {
      headers: { Authorization: `Bearer ${jwtAccessToken}` },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getCourse = async (id: string, jwtAccessToken: string) => {
  try {
    const response = await axios.get(`/api/v1/Courses/${id}`, {
      headers: { Authorization: `Bearer ${jwtAccessToken}` },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getStudentCourses = async (id: number, jwtAccessToken: string) => {
  try {
    const response = await axios.get(`/api/v1/Users/${id}/MemberCourses`, {
      headers: { Authorization: `Bearer ${jwtAccessToken}` },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getTeacherCourses = async (id: number, jwtAccessToken: string) => {
  try {
    const response = await axios.get(`/api/v1/Users/${id}/CreatedCourses`, {
      headers: { Authorization: `Bearer ${jwtAccessToken}` },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createCourse = async (
  course: CourseForm,
  jwtAccessToken: string,
) => {
  try {
    const response = await axios.post(
      "/api/v1/Courses",
      JSON.stringify(course),
      {
        headers: {
          Authorization: `Bearer ${jwtAccessToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const sendRequestToJoinCourse = async (
  id: number,
  jwtAccessToken: string,
) => {
  try {
    const response = await axios.post(
      `/api/v1/Courses/${id}/Requests`,
      {},
      {
        headers: { Authorization: `Bearer ${jwtAccessToken}` },
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getJoinRequests = async (id: string, jwtAccessToken: string) => {
  try {
    const response = await axios.get(`/api/v1/Courses/${id}/Requests/Pending`, {
      headers: { Authorization: `Bearer ${jwtAccessToken}` },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const handleJoinRequest = async (
  requestId: number,
  status: number,
  jwtAccessToken: string,
) => {
  try {
    const response = await axios.put(`/api/v1/Requests/${requestId}`, status, {
      headers: {
        Authorization: `Bearer ${jwtAccessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAssignments = async (id: string, jwtAccessToken: string) => {
  try {
    const response = await axios.get(`/api/v1/Courses/${id}/Assignments`, {
      headers: { Authorization: `Bearer ${jwtAccessToken}` },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
