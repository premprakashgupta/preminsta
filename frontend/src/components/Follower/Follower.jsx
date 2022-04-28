import React from "react";
import { Link } from "react-router-dom";
import "./Follower.css";
import { Close } from "@material-ui/icons";
import { useSelector } from "react-redux";
function Follower(props) {
  const { profile,loading } = useSelector((state) => state.profileData);
  return (
    <div className="followerContainer">
      <div className="followerInnerContainer">
        <h3>Followers</h3>
        <div className="close" onClick={props.handleClose}>
          <Close />
        </div>
        <div className="content">
          {
            loading ? <div className="loading">
            <img src="./image/loader.gif" alt="" />
            <p>
              <span>Loading</span> <span>. </span>
              <span>. </span>
              <span>.</span>
            </p>
          </div>
          :
          <ul>
            {profile.follower.map((i) => (
              <li key={i.followerId}>
                <div className="first">
                  <img src={i.followerPic} alt="" />
                  <span className="name">
                    <a href={`/accounts/${i.followerUserId}`}>{i.followerName}</a>
                  </span>
                </div>
                <div className="second">
                  <button disabled>Remove</button>
                </div>
              </li>
            ))}
          </ul>

          }
        </div>
      </div>
    </div>
  );
}

export default Follower;
