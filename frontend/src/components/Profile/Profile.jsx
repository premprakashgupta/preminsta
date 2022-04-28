import React, { useEffect, useState } from "react";
import {
  AssignmentIndOutlined,
  BookmarkBorderOutlined,
  SettingsSharp,
  ViewComfy,
} from "@material-ui/icons";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { FollowingAction, profileLoad } from "../../actions/userAction";
import Follower from "../Follower/Follower";
import Following from "../Following/Following";
import {useAlert} from 'react-alert'

function Profile() {
  const [tagActive, setTagActive] = useState(0);
  const [followerBox, setFollowerBox] = useState(false);
  const [followingBox, setFollowingBox] = useState(false);
  const handleClose = () => {
    setFollowerBox(false);
    setFollowingBox(false);
  };
  const [path, setPath] = useState(window.location.pathname.split("/")[2]);
  const dispatch = useDispatch();
  const alert=useAlert()

  useEffect(() => {
    setPath(window.location.pathname.split("/")[2]);
    dispatch(profileLoad(path));
  }, [path]);
  const { profile, loading, msg, error } = useSelector(
    (state) => state.profileData
  );
  const { userDetail } = useSelector((state) => state.Detail);

  useEffect(() => {
    !error && !loading && msg && alert.success(msg);
    error && msg && alert.error(msg);
    loading && msg && alert.show(msg)
  }, [msg,error,loading])
  
  const handleTag = (x) => {
    switch (x) {
      case 0:
        setTagActive(0);
        break;
      case 1:
        setTagActive(1);
        break;
      case 2:
        setTagActive(2);
        break;

      default:
        setTagActive(0);
        break;
    }
  };
  const handleFollowing = (userId) => {
    dispatch(FollowingAction(userId));
  };
  let btnName = false;
  profile?.follower?.forEach((element) => {
    if (element.followerId === userDetail._id) {
      btnName = true;
    }
  });

  return (
    <>
      <div className="profileContainer">
        <div className="upperpart">
          <div className="profilrPicAndName">
            <div className="profilePic">
              {loading ? (
                <div className="loading">
                  <img src="/image/loader.gif" alt="" />
                  <p>
                    <span>Loading</span> <span>. </span>
                    <span>. </span>
                    <span>.</span>
                  </p>
                </div>
              ) : (
                <img className="img" src={profile?.profilePic} alt="" />
              )}
            </div>
            <div className="userIdandSetting">
              <div className="content">
                <span className="UserId">{profile?.userId}</span>
                <span className="profileActionBtn">
                  {userDetail?.userId === path ? (
                    <button>Edit</button>
                  ) : (
                    <button
                      onClick={() => handleFollowing(profile.userId)}
                      style={{ backgroundColor: "#0098f6", color: "#fff" }}
                    >
                      {btnName ? "Unfollow" : "Follow"}
                    </button>
                  )}
                  {userDetail?.userId && <SettingsSharp />}
                </span>
              </div>
              <div className="followerAndFollowing">
                <span className="posts">
                  <b>Post </b> <small>{profile?.posts?.length}</small>
                </span>
                <span
                  className="followers"
                  onClick={() => setFollowerBox(true)}
                >
                  <b>Follower </b>
                  <small>{profile?.follower?.length}</small>
                </span>
                <span
                  className="following"
                  onClick={() => setFollowingBox(true)}
                >
                  <b>Following </b>
                  <small>{profile?.following?.length - 1}</small>
                </span>
              </div>
            </div>
          </div>
          <div className="username">{profile?.username}</div>
        </div>
        <hr />
        <div className="lowerPart">
          <div className="galleryTag">
            <span
              className="active"
              style={{ left: `${tagActive * 33.33}%` }}
            ></span>
            <span onClick={() => handleTag(0)}>
              <ViewComfy />
            </span>
            <span onClick={() => handleTag(1)}>
              <BookmarkBorderOutlined />
            </span>
            <span onClick={() => handleTag(2)}>
              <AssignmentIndOutlined />
            </span>
          </div>

          <div className="gallery">
            <div
              className="content"
              style={{ transform: `translateX(-${tagActive * 33.3333}%)` }}
            >
              <div className="galleryContent">
                {loading ? (
                  <div className="loading">
                    <img src="/image/loader.gif" alt="" />
                    <p>
                      <span>Loading</span> <span>. </span>
                      <span>. </span>
                      <span>.</span>
                    </p>
                  </div>
                ) : profile.posts?.length > 0 ? (
                  <ul>
                    {profile.posts?.map((element) => (
                      <li key={element._id}>
                        <img src={element.postPic.secure_url} alt="" />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul>
                    <li>
                      <img src="/image/gallery_empty.jpg" alt="" />
                    </li>
                  </ul>
                )}
              </div>
              <div className="savedContent">
                <ul>
                  <li>
                    <img src="/image/gallery_empty.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/image/gallery_empty.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/image/gallery_empty.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/image/gallery_empty.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/image/gallery_empty.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/image/gallery_empty.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/image/gallery_empty.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/image/gallery_empty.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/image/gallery_empty.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/image/gallery_empty.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/image/gallery_empty.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/image/gallery_empty.jpg" alt="" />
                  </li>
                </ul>
              </div>
              <div className="tagedContent">
                <ul>
                  <li>
                    <img src="/image/gallery_empty.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/image/gallery_empty.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/image/gallery_empty.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/image/gallery_empty.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/image/gallery_empty.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/image/gallery_empty.jpg" alt="" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {followerBox && <Follower handleClose={handleClose} />}
        {followingBox && <Following handleClose={handleClose} />}
      </div>
    </>
  );
}

export default Profile;
