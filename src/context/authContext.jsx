import { createContext, useEffect, useState } from "react";
import { fetchFunction } from "../services/Api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const request = async (url, options) => {
    try {
      const res = await fetchFunction(url, options);
      const data = await res.json();
      return data;
    } catch (err) {
      if (err.message === "refreshFail") {
        setIsAuthenticated(false);
      } else {
        throw err;
      }
    }
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await request("users", { method: "get" });
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        throw err;
      }
    };
    getUser();
  }, []);

  const login = (data) => {
    setAccessToken(data.accessToken);
    setUser(data.user);
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    //server request to clear cookie
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        setAccessToken,
        login,
        logout,
        request,
        setIsAuthenticated,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
