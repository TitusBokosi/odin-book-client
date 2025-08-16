import { useContext } from "react";
import AuthContext from "../context/authContext";

export function Header() {
  const { user } = useContext(AuthContext);
  return (
    <div className="home-header flex items-center justify-between  w-full p-2">
      <div className="logo">
        <h2>
          <span className="text-blue-700">Space</span>Chat
        </h2>
      </div>
      <div className="user">
        <h3>{user.name}</h3>
      </div>
    </div>
  );
}
