import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import { SpaceChatPage } from "./SpaceChat";
import { Header } from "./Header";
import { Post } from "./post";
import { HomeNav } from "./HomeNav";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const { user, request } = useContext(AuthContext);
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await request("posts", { method: "get" });
        console.log(res.data);
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        setError(`${err.message} code ${err.status}`);
        throw err;
      }
    };
    getPosts();
  }, []);
  if (err) {
    return <p>{err}</p>;
  }
  if (user) {
    return (
      <div className="home w-full h-full bg-white">
        <Header></Header>
        <div className="feed p-2 w-full ">
          <h3>feed</h3>
          {loading ? (
            <p>Loading posts</p>
          ) : (
            <div className="posts">
              {posts.map((post) => (
                <Post key={post.id} post={post}></Post>
              ))}
            </div>
          )}
        </div>
        {loading ? null : (
          <div className="nav fixed bottom-3 w-full lg:w-[480px]  flex  align-center gap-2 items-center">
            <HomeNav></HomeNav>
            <button
              onClick={() => navigate("/posts/new")}
              className="bg-blue-700 p-5 rounded-full "
            >
              {" "}
              <PlusIcon className="h-10 w-10 text-white stroke-2"></PlusIcon>
            </button>
          </div>
        )}
      </div>
    );
  }
  return <SpaceChatPage></SpaceChatPage>;
}
