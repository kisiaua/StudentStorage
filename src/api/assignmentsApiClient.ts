import axios from "./apiConfig.ts";
import { AssignmentForm } from "../models/AssignmentForm.ts";

export const getAssignment = async (id: string, jwtAccessToken: string) => {
  try {
    const response = await axios.get(`/api/v1/Assignments/${id}`, {
      headers: { Authorization: `Bearer ${jwtAccessToken}` },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createAssignment = async (
  assignment: AssignmentForm,
  id: string,
  jwtAccessToken: string,
) => {
  try {
    const response = await axios.post(
      `/api/v1/Courses/${id}/Assignments`,
      JSON.stringify(assignment),
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

export const SubmitSolution = async (
  files: File[],
  id: number,
  jwtAccessToken: string,
) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    const response = await axios.post(
      `/api/v1/Assignments/${id}/Solutions`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${jwtAccessToken}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAssignmentSummarySolutions = async (
  id: string,
  jwtAccessToken: string,
) => {
  try {
    const response = await axios.get(`/api/v1/Assignments/${id}/Solutions`, {
      headers: { Authorization: `Bearer ${jwtAccessToken}` },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const downloadSolution = async (
  userId: number,
  assignmentId: string,
  jwtAccessToken: string,
) => {
  try {
    const response = await axios.get(
      `/api/v1/Users/${userId}/Assignments/${assignmentId}/Solutions/zip`,
      {
        headers: { Authorization: `Bearer ${jwtAccessToken}` },
        responseType: "blob",
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
