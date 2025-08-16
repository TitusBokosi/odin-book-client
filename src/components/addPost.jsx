import { useContext, useState } from "react";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { HomeNav } from "./HomeNav";
import AuthContext from "../context/authContext";

export default function AddPost({ user }) {
  const [title, setTitle] = useState("");
  const { request } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const post = await request("posts", {
        method: "post",
        body: JSON.stringify({ title }),
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const textAreaAutoGrow = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeaight + "px";
  };

  return (
    <div className="add-post p-5">
      <h3>Create your post</h3>
      <div className="post-form w-full">
        <form action="" method="post" onSubmit={handleSubmit}>
          <textarea
            name="title"
            id=""
            onInput={textAreaAutoGrow}
            onChange={handleTitleChange}
            placeholder="Write your post here"
            rows={3}
            className=" border rounded-lg outline-0 w-full p-2 overflow-hidden"
          ></textarea>
          <button type="submit">
            <PaperAirplaneIcon className="h-5 w-5"></PaperAirplaneIcon>
          </button>
        </form>
      </div>
      <HomeNav></HomeNav>
    </div>
  );
}
