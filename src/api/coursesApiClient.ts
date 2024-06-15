import axios from "./apiConfig.ts";

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
