import { useContext } from "react";
import AuthContext from "../context/AuthProvider.tsx";

const useAuth = () => {
  const { auth, setAuth, clearAuth } = useContext(AuthContext);

  const decodeToken = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.log("Invalid JWT Token", error);
      return null;
    }
  };

  const getUserId = () => {
    if (!auth?.jwtAccessToken) {
      return null;
    }

    const decodedToken = decodeToken(auth.jwtAccessToken);
    return decodedToken?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];
  };

  const getUserRole = () => {
    if (!auth?.jwtAccessToken) {
      return [];
    }

    const decodedToken = decodeToken(auth.jwtAccessToken);
    const roles =
      decodedToken?.[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];

    return Array.isArray(roles) ? roles : [roles];
  };

  const isTokenExpired = () => {
    if (!auth?.jwtAccessToken) {
      return true;
    }

    const decodedToken = decodeToken(auth.jwtAccessToken);
    const expiry = decodedToken?.exp;

    if (!expiry) {
      return true;
    }

    return Date.now() >= expiry * 1000;
  };

  return { auth, setAuth, getUserId, getUserRole, isTokenExpired, clearAuth };
};

export default useAuth;
