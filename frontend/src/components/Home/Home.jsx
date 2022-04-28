import React, { useEffect } from "react";
import Post from "../Post/Post";
import "./Home.css";
import { useSelector,useDispatch } from "react-redux";


import Suggestion from "../Suggestion/Suggestion";

function Home() {
    const dispatch=useDispatch()
  const { userDetail } = useSelector((state) => state.Detail);
  

  return (
    <>
      <div className="owner_profile_section">
        <div className="user_profile">
          <div className="user_profile_box">
            <div className="user_pic">
              <a href="#">
                <img src={userDetail.profilePic} alt="" />
              </a>
            </div>
            <div className="user_name">
              <a href={`/accounts/${userDetail.userId}`}>{userDetail.userId}</a>
              <p>{userDetail.username}</p>
            </div>
          </div>

          <a href="#">switch</a>
        </div>
        <span>
          <span>suggestion for you</span>
          <span>See All</span>
        </span>
        <Suggestion/>
        <div className="owner_profile_section_lower_part">
          <div className="link">
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
              <li>
                <a href="#">API</a>
              </li>
              <li>
                <a href="#">Jobs</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Locations</a>
              </li>
              <li>
                <a href="#">Top Account</a>
              </li>
              <li>
                <a href="#">Hash Tags</a>
              </li>
              <li>
                <a href="#">Languages</a>
              </li>
            </ul>
          </div>
          <div className="copy_right">© 2021 INSTAGRAM FROM FACEBOOK</div>
        </div>
      </div>
      <Post />
    </>
  );
}

export default Home;
