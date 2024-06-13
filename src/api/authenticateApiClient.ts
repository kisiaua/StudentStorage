import axios from "./apiConfig.ts";
import { UserFormRegister, UserFormLogin } from "../models/User.ts";

export const registerUser = async (credentials: UserFormRegister) => {
  try {
    const roleEndpoints: { [key: string]: string } = {
      admin: "/api/v1/Authenticate/register-admin",
      teacher: "/api/v1/Authenticate/register-teacher",
      student: "/api/v1/Authenticate/register-student",
    };

    await axios.post(
      roleEndpoints[credentials.role],
      JSON.stringify(credentials),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loginUser = async (credentials: UserFormLogin) => {
  try {
    const response = await axios.post(
      "/api/v1/Authenticate/login",
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
