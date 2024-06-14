import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.ts";
import { UserRoles } from "../../models/UserRoles.ts";

interface NavLinksProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ isMenuOpen, toggleMenu }) => {
  const { isTokenExpired, getUserRoles, clearAuth } = useAuth();

  const isAdmin = getUserRoles().includes(UserRoles.Admin);

  return (
    <div className={`${isMenuOpen ? "" : "hidden"} w-full md:block md:w-auto`}>
      <ul className="font-medium flex flex-col md:flex-row space-x-0 md:space-x-8 p-4 mt-4 border border-gray-200 rounded-lg md:p-0 md:mt-0 md:border-none">
        {!isTokenExpired() ? (
          <>
            {!isAdmin && (
              <li>
                <Link
                  to="/my-courses"
                  className="block py-2 px-3 hover:text-blue-700"
                  onClick={toggleMenu}
                >
                  Moje kursy
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/"
                className="block py-2 px-3 hover:text-blue-700"
                onClick={() => {
                  clearAuth();
                  toggleMenu();
                }}
              >
                Wyloguj
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="block py-2 px-3 hover:text-blue-700"
                onClick={toggleMenu}
              >
                Zaloguj
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="block py-2 px-3 hover:text-blue-700"
                onClick={toggleMenu}
              >
                Zarejestruj
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default NavLinks;
