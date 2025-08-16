import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Post } from "./post";
import { Header } from "./Header";
import { HomeNav } from "./HomeNav";
import AuthContext from "../context/authContext";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export function PostDetails() {
  const { postID } = useParams();
  const [post, setPost] = useState(null);
  const { request, user } = useContext(AuthContext);
  const [loading, setIsloading] = useState(true);
  const [err, setErr] = useState(null);
  const [commentAuthor, setCommentAuthor] = useState(null);
  const getPost = () => {
    return request(`posts/${postID}`, {
      method: "get",
    });
  };
  const getCommentAuthor = (id) => {
    return request(`users/${id}`, {
      method: "get",
    });
  };
  useEffect(() => {
    getPost()
      .then((res) => {
        console.log(res.data.comments);
        setPost(res.data);

        // getCommentAuthor()
        //   .then((res) => {
        //     setCommentAuthor(res.data.name);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        setIsloading(false);
      })
      .catch((err) => {
        setErr(err.message);
        setIsloading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <p className="text-center content-center">loading post...</p>
      </>
    );
  }
  if (err) {
    return (
      <div className="errContainer h-full">
        <Error message={err}></Error>
      </div>
    );
  }
  return (
    <div className="postDetails">
      <Header user={user}></Header>
      {post ? (
        <div className="post">
          <Post post={post}></Post>
          <div className="comments px-2 border-l  mx-8">
            {post.comments.map((comment) => (
              <div key={comment.id} className="comment py-2 w-full">
                <div className="author-Profile-pic flex items-center h-5">
                  <UserCircleIcon className="h-full"></UserCircleIcon>
                  <h3>{comment.user.name}</h3>
                </div>
                <p key={comment.id} className="px-5 break-words">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading post...</p>
      )}

      <div className="nav fixed bottom-2 w-full lg:w-[480px]">
        {" "}
        <HomeNav></HomeNav>
      </div>
    </div>
  );
}
