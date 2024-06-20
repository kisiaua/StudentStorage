import axios from "./apiConfig.ts";

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
