import { useContext, useEffect, useState } from "react";
import { authContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export function ProtectedRoutes({ children }) {
  const [loading, setLoading] = useState(true);
  const { user, setUser, isLoggedIn, logIn, logOut } = useContext(authContext);
  const navigate = useNavigate();
  useEffect(() => {
    const validate = async () => {
      setLoading(true);
      try {
        const isValid = await request("auth/me", { method: "get" });
        setUser(isValid.data);
        setIsLoggedIn(true);
        setLoading(false);
      } catch (err) {
        setUser(null);
        setIsLoggedIn(false);
        setLoading(false);
      }
    };
    validate();
  }, []);
  if (loading) {
    return <p>Loading</p>;
  }
  if (!isLoggedIn) return <Navigate to="auth/login"></Navigate>;
  return <>{children}</>;
}
