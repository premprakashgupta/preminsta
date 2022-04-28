import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Following.css";
import { Close } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { FollowingAction } from "../../actions/userAction";
function Following(props) {
  const { profile,loading } = useSelector((state) => state.profileData);
  const dispatch = useDispatch();
  return (
    <div className="followingContainer">
      <div className="followingInnerContainer">
        <h3>Followings</h3>
        <div className="close" onClick={props.handleClose}>
          <Close />
        </div>
        <div className="content">
          {
            loading ? <div className="loading">
            <img src="/image/loader.gif" alt="" />
            <p>
              <span>Loading</span> <span>. </span>
              <span>. </span>
              <span>.</span>
            </p>
          </div>:
          <ul>
          {profile.following.slice(1).map((i) => (
            <li key={i.followingId}>
              <div className="first">
                <img src={i.followingPic} alt="" />
                <span className="name">
                  <a href={`/accounts/${i.followingUserId}`}>
                    {i.followingName}
                  </a>
                </span>
              </div>
              <div className="second">
                <button
                  
                  
                >
                  Unfollow
                </button>
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

export default Following;
