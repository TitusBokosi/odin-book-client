import { useEffect, useState } from "react";
import { request } from "../../services/Api";

export function SignUP() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUP, setSignUP] = useState(false);
  useEffect(() => {
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setSignUP(true);
    }
  }, [name, email, password, confirmPassword]);

  const handleNameChnage = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    const inputElement = event.target;
    if (inputElement.value !== password) {
      inputElement.style.outline = "2px solid red";
    } else {
      inputElement.style.outline = "2px solid green";
    }
  };
  const handleConfirmPasswordState = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await request("auth/signUp", {
      method: "post",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    console.log(res);
  };

  return (
    <div className="signUP-container h-full content-center text-left p-10">
      <div className="signup-form-container">
        <h2>
          Sign up with <span className="text-blue-700">Space</span>
        </h2>
        <p>
          Welcome to <span className="text-blue-700">Space</span>! Please enter
          your details
        </p>
        <form action="" method="post" onSubmit={handleSubmit}>
          <fieldset className="w-full py-5 text-left">
            <label htmlFor="name" className="block">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleNameChnage}
              required
              placeholder="Enter name"
            />
          </fieldset>
          <fieldset className="w-full py-5 text-left">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="Enter email"
            />
          </fieldset>
          <fieldset className="w-full py-5 text-left">
            <label htmlFor="password" className="block">
              {" "}
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder="Enter password"
            />
          </fieldset>
          <fieldset className="w-full py-5 text-left">
            <label htmlFor="confirmPassword" className="block">
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onInput={handleConfirmPasswordChange}
              onChange={handleConfirmPasswordState}
              required
              placeholder="Re-enter password"
            />
          </fieldset>
          {signUP ? (
            <button
              type="submit"
              className="w-full bg-blue-700 rounded-2xl text-white p-2"
            >
              Sign up
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-red-700 rounded-2xl text-white p-2"
            >
              Fill In all fields
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
