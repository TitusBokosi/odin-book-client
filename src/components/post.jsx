import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  ShareIcon,
  UserCircleIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";

export function Post({ post }) {
  const [liked, setLiked] = useState(false);
  const { request, user } = useContext(AuthContext);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [commenting, setCommenting] = useState(false);
  const [commentContent, setComment] = useState("");
  const [commented, setCommented] = useState(false);
  const commentingRef = useRef();
  const navigate = useNavigate();
  const createdAt = new Date(post?.createdOn).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const checkLike = (post) => {
    if (post.likes) {
      const liked = post.likes.find((like) => like.authorID === user.id);
      if (liked) {
        setLiked(true);
        return;
      }
      setLiked(false);
    }
  };
  useEffect(() => {
    checkLike(post);
  }, []);

  useEffect(() => {
    function handleClickOutsideComment(e) {
      if (commentingRef.current && !commentingRef.current.contains(e.target)) {
        setCommenting(false);
      }
    }
    if (commenting) {
      document.addEventListener("mousedown", handleClickOutsideComment);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideComment);
    };
  }, [commenting]);

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      if (liked) {
        const res = await request(`posts/${post.id}/likes`, {
          method: "delete",
        });
        setLiked(false);
        setLikesCount(likesCount - 1);
      } else {
        const res = await request(`posts/${post.id}/likes`, {
          method: "post",
        });
        setLiked(true);
        setLikesCount(likesCount + 1);
      }
    } catch (err) {
      throw err;
    }
  };

  const handleCommentToggle = (e) => {
    e.stopPropagation();
    setCommenting(!commenting);
  };

  return (
    <div
      onClick={() => navigate(`/posts/${post.id}`)}
      className="post bg-white rounded-2xl py-2 border-b-gray-500  mb-2"
    >
      <div className="post-header flex items-center h-10 justify-start">
        <div className="profile-pic h-full">
          <UserCircleIcon className="h-full stroke-gray-500"></UserCircleIcon>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/users/${post.authorID}`);
          }}
          className="author-details"
        >
          <h3>{post.author.name}</h3>
          <p className="text-gray-400">Posted {createdAt}</p>
        </div>
      </div>
      <div className="post-details p-2 px-10">
        <p className="w-full break-words">{post.title}</p>
      </div>
      <div className="post-actions px-2 flex items-center justify-between">
        {liked ? (
          <button className="flex items-center  text-gray-400">
            <HeartIcon onClick={handleLike} className="h-5 w-5 text-red-700">
              {" "}
            </HeartIcon>
            {likesCount} likes
          </button>
        ) : (
          <button
            // onClick={handleLike}
            className="flex items-center text-gray-400"
          >
            <HeartIcon onClick={handleLike} className="h-5 w-5">
              {" "}
            </HeartIcon>
            {likesCount} likes
          </button>
        )}
        <button
          onClick={handleCommentToggle}
          className="flex items-center text-gray-400"
        >
          <ChatBubbleOvalLeftIcon className="h-5 w-5"></ChatBubbleOvalLeftIcon>
          {post.comments.length} Comments
        </button>
        <button className="flex items-center text-gray-400">
          <ShareIcon className="w-5 h-5"></ShareIcon>
        </button>
      </div>
      {commenting ? (
        <div onClick={(e) => e.stopPropagation()} className="commenting">
          <form
            method="post"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const comment = await request(`posts/${post.id}/comments`, {
                  method: "post",
                  body: JSON.stringify({
                    content: commentContent,
                  }),
                });
                setComment(false);
                console.log(comment);
              } catch (err) {
                throw err;
              }
            }}
            ref={commentingRef}
            className="flex gap-2 w-full rounded-full p-2 items-end"
          >
            <textarea
              name="comment"
              id="comment"
              placeholder="Type comment"
              rows={1}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              required
              className="p-2  w-full outline-2 resize-none rounded-2xl"
            ></textarea>{" "}
            <button type="submit">
              {" "}
              <PaperAirplaneIcon className="w-10 text-blue-700 "></PaperAirplaneIcon>
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
