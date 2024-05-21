import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserFormLogin } from "../models/User.ts";
import axios, { ENDPOINTS } from "../api/apiConfig.ts";

const Login = () => {
  const [credentials, setCredentials] = useState<UserFormLogin>({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(JSON.stringify(ENDPOINTS.LOGIN));
    try {
      const response = await axios.post(
        ENDPOINTS.LOGIN,
        JSON.stringify(credentials),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      console.log(response.data.token);
      setLoginError(false);
      setCredentials({ email: "", password: "" });
      navigate("/");
    } catch {
      setLoginError(true);
    }
  };

  return (
    <section className="flex items-center justify-center flex-grow px-4 sm:px-0">
      <div className="bg-gray-50 w-full sm:max-w-md rounded-lg shadow-lg">
        <div className="p-8 space-y-6">
          <h1 className="text-2xl font-bold">Logowanie</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="login-email"
                id="login-email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                placeholder="example@mail.com"
                className="border-2 border-gray-300 rounded-lg block p-2.5 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="login-password"
                className="block mb-2 font-medium"
              >
                Hasło
              </label>
              <input
                type="password"
                id="login-password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                minLength={8}
                autoComplete="off"
                required
                placeholder="********"
                className="border-2 border-gray-300 rounded-lg block p-2.5 w-full"
              />
            </div>
            <button className="w-full text-white bg-blue-700 hover:bg-blue-900 font-medium rounded-lg text-center py-2.5">
              Zaloguj się
            </button>
            {loginError && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                Błąd! Spróbuj ponownie
              </div>
            )}
            <p className="text-sm pt-2">
              Nie masz konta?
              <Link
                to="/register"
                className="ml-2 text-sm text-blue-700 hover:text-blue-900 font-medium"
              >
                Zarejestruj się
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
