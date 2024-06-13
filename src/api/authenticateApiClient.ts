import axios, { ENDPOINTS } from "./apiConfig.ts";
import { UserFormRegister, UserFormLogin } from "../models/User.ts";

export const registerUser = async (credentials: UserFormRegister) => {
  try {
    const url =
      credentials.role === "admin"
        ? ENDPOINTS.REGISTER_ADMIN
        : credentials.role === "teacher"
        ? ENDPOINTS.REGISTER_TEACHER
        : ENDPOINTS.REGISTER_STUDENT;

    await axios.post(url, JSON.stringify(credentials), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loginUser = async (credentials: UserFormLogin) => {
  try {
    const response = await axios.post(
      ENDPOINTS.LOGIN,
      JSON.stringify(credentials),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
