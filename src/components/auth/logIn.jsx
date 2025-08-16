import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";

export function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, request, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmailChnage = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { email, password };
    try {
      const res = await request("auth/login", {
        method: "post",
        body: JSON.stringify(body),
      });
      localStorage.setItem("accessToken", res.accessToken);
      console.log(res.user);
      login(res);
      console.log("navigating....");
      setIsAuthenticated(true);
      navigate("/");
      //   console.log(res);
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="login-container bg-red h-full content-center text-center">
      <div className="login-form-container text-left p-10">
        <h2 className="">
          Login to <span className="text-blue-700"> Space</span>
        </h2>
        <p>Welcome back! Please login to proceed</p>
        <form onSubmit={handleSubmit} action="" method="post" className="my-5">
          <fieldset className="w-full text-left my-5 ">
            <label htmlFor="email" className="block font-bold">
              Email
            </label>
            <input
              onChange={handleEmailChnage}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
          </fieldset>
          <fieldset className="w-full text-left my-5 ">
            <label htmlFor="password" className="block font-bold">
              Password
            </label>
            <input
              onChange={handlePasswordChange}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </fieldset>
          <button className="bg-blue-700 w-full rounded-2xl p-2 text-white ">
            Login
          </button>
        </form>
        <p>Dont have an account yet?</p>
      </div>
      <div className="side-image"></div>
    </div>
  );
}
