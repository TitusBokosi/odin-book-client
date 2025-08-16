import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Error } from "./Error";
import AuthContext from "../context/authContext";
import { Post } from "./post";
import { PencilIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { HomeNav } from "./HomeNav";

const Profile = () => {
  const [bio, setBio] = useState(null);
  const { userID } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const { request, user } = useContext(AuthContext);

  const getUserProfile = (ID) => {
    const userId = parseInt(ID);
    return request(`users/${userId}`, {
      method: "get",
    });
  };

  useEffect(() => {
    getUserProfile(userID)
      .then((res) => {
        console.log(res.data);
        setUserDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading</p>;
  }

  if (err) {
    return <Error message={err}></Error>;
  }
  return (
    <div className="profile w-full  h-full  ">
      <div className="profileHeader flex flex-col items-center justify-center">
        <div className="profileImage flex flex-col items-center justify-center ">
          <UserCircleIcon className="h-15 stroke-blue-700 "></UserCircleIcon>
          {user.id === userDetails.id ? (
            <button>
              Edit <PencilIcon className="w-5"></PencilIcon>
            </button>
          ) : null}
        </div>
        <h3>{userDetails.name}</h3>
        <p>{userDetails.bio}</p>
        <p className="text-gray-700">Joined on {userDetails.createdOn}</p>
      </div>
      <div className="posts text-left pt-5 pb-10">
        <h3>Posts</h3>
        {userDetails.posts.map((post) => (
          <Post key={post.id} post={post}></Post>
        ))}
      </div>
      <div className="nav fixed bottom-1 w-full lg:w-[480px]">
        <HomeNav></HomeNav>
      </div>
    </div>
  );
};
export default Profile;
