import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.0.143:5000",
});

export const ENDPOINTS = {
  REGISTER_STUDENT: "/api/v1/Authenticate/register-student",
  REGISTER_TEACHER: "/api/v1/Authenticate/register-teacher",
  REGISTER_ADMIN: "/api/v1/Authenticate/register-admin",
  LOGIN: "/api/v1/Authenticate/login",
};
