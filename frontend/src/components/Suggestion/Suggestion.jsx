import React, { useEffect, useState } from "react";
import "./Suggestion.css";
import { FollowingAction, SuggestionAction } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { allPostAction } from "../../actions/postAction";
function Suggestion() {
  const { userDetail } = useSelector((state) => state.Detail);
  const dispatch = useDispatch();
  const handleSuggestFollowing = (userId) => {
    dispatch(FollowingAction(userId));
    setTimeout(() => {
      dispatch(SuggestionAction());
      dispatch(allPostAction())
    }, 1000);
  };
  const { suggestion } = useSelector((state) => state.suggestion);
  useEffect(() => {
    dispatch(SuggestionAction());
  }, []);

  return (
    <>
      <div className="suggestion">
        {suggestion?.map((i) => (
          <div className="suggestion_profile" key={i._id}>
            <div className="suggestion_profile_box">
              <div className="suggestion_pic">
                <img src={i.profilePic} alt="" />
              </div>
              <div className="suggestion_name">
                <a href={`/accounts/${i.userId}`}>{i.userId}</a>
                <p>{i.username}</p>
              </div>
            </div>
            <span
              href="#"
              style={{ color: "#0095f6", cursor: "pointer" }}
              onClick={() => handleSuggestFollowing(i.userId)}
            >
              Follow
            </span>
          </div>
        ))}

        {/* <!-- when click on profile this content pop up---------------------------------------------------- --> */}
      </div>
    </>
  );
}

export default Suggestion;
