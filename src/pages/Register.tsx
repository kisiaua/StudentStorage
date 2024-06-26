import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserFormRegister } from "../models/User.ts";
import { registerUser } from "../api/authenticateApiClient.ts";

const Register = () => {
  const [credentials, setCredentials] = useState<UserFormRegister>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student",
  });
  const [registrationError, setRegistrationError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerUser(credentials);

      setRegistrationError(false);
      setCredentials({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "student",
      });
      navigate("/login");
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.data);
      } else {
        setErrorMessage(["Błąd! Spróbuj ponownie."]);
      }
      setRegistrationError(true);
    }
  };

  return (
    <section className="flex items-center justify-center flex-grow px-4 sm:px-0">
      <div className="bg-gray-50 w-full sm:max-w-md rounded-lg shadow-lg">
        <div className="p-8 space-y-6">
          <h1 className="text-2xl font-bold">Utwórz konto</h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-testid="submit-form"
          >
            <div>
              <label
                htmlFor="registration-firstname"
                className="block mb-2 font-medium"
              >
                Imię
              </label>
              <input
                type="text"
                id="registration-firstname"
                name="firstName"
                value={credentials.firstName}
                onChange={handleChange}
                placeholder="Jan"
                required
                className="border-2 border-gray-300 rounded-lg block p-2.5 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="registration-lastname"
                className="block mb-2 font-medium"
              >
                Nazwisko
              </label>
              <input
                type="text"
                id="registration-lastname"
                name="lastName"
                value={credentials.lastName}
                onChange={handleChange}
                placeholder="Kowalski"
                required
                className="border-2 border-gray-300 rounded-lg block p-2.5 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="registration-email"
                className="block mb-2 font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="registration-email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                required
                className="border-2 border-gray-300 rounded-lg block p-2.5 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="registration-password"
                className="block mb-2 font-medium"
              >
                Hasło
              </label>
              <input
                type="password"
                id="registration-password"
                name="password"
                placeholder="********"
                value={credentials.password}
                onChange={handleChange}
                minLength={6}
                required
                className="border-2 border-gray-300 rounded-lg block p-2.5 w-full"
              />
            </div>
            {/*<div>*/}
            {/*  <label htmlFor="role" className="block mb-2 font-medium">*/}
            {/*    Rola*/}
            {/*  </label>*/}
            {/*  <select*/}
            {/*    id="role"*/}
            {/*    value={credentials.role}*/}
            {/*    name="role"*/}
            {/*    onChange={handleChange}*/}
            {/*    required*/}
            {/*    className="bg-white border-2 border-gray-300 rounded-lg block p-2.5 w-full"*/}
            {/*  >*/}
            {/*    <option value="student">Student</option>*/}
            {/*    <option value="teacher">Nauczyciel</option>*/}
            {/*    <option value="admin">Admin</option>*/}
            {/*  </select>*/}
            {/*</div>*/}
            <button className="w-full text-white bg-blue-700 hover:bg-blue-900 font-medium rounded-lg text-center py-2.5">
              Zarejestruj się
            </button>
            {registrationError && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                {errorMessage.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            <p className="text-sm pt-2">
              Masz już konto?
              <Link
                to="/login"
                className="ml-2 text-sm text-blue-700 hover:text-blue-900 font-medium"
              >
                Zaloguj się
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
