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
