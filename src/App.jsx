import { useContext, useEffect } from "react";
import AuthContext from "./context/authContext";
import { useNavigate } from "react-router-dom";
import { Home } from "./components/Home";
import { SpaceChatPage } from "./components/SpaceChat";

const App = () => {
  const { accessToken, setAccessToken, user, request, isAuthenticated } =
    useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      console.log("navigating to login");
      navigate("/auth/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    <SpaceChatPage></SpaceChatPage>;
  }
  return (
    <>
      <Home></Home>
    </>
  );
};

export default App;
