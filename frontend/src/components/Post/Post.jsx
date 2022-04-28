import React, { useEffect, useState } from "react";
import Status from "../Status/Status";
import "./Post.css";
import { format } from "timeago.js";
import posts from "../../Postdata";
import { useSelector, useDispatch } from "react-redux";
import {
  BookmarkBorderOutlined,
  CommentOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  SendOutlined,
  SentimentSatisfiedOutlined,
} from "@material-ui/icons";
import {
  allPostAction,
  commentAction,
  likeAndDislikeAction,
} from "../../actions/postAction";
import { Link } from "react-router-dom";
import Sponsor from "../Sponsor/Sponsor";
import { Image, Transformation } from "cloudinary-react";
import { useAlert } from "react-alert";

function Post() {
  const [like, setLike] = useState(false);
  const [userComment, setUserComment] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const likeHandle = () => {
    setLike(like ? false : true);
  };
  //     more function----------------------------
  const handleMore = (id) => {
    var more = document.getElementById(id);
    more.previousSibling.classList.add("whitespace");
    more.style.display = "none";
  };
  //     heart add---------------------------------
  const handleGlowHeart = (id) => {
    var gleowHeart = document.getElementById(id);
    gleowHeart.lastChild.classList.add("glowheart");
    dispatch(likeAndDislikeAction(id));
    setTimeout(() => {
      gleowHeart.lastChild.classList.remove("glowheart");
    }, 800);
  };
  useEffect(() => {
    dispatch(allPostAction());
  }, []);
  const handleComment = (commentPostId) => {
    dispatch(commentAction(commentPostId, userComment));
    setUserComment("");
  };
  const { post, P_loading, comment_loading, P_msg, P_error } = useSelector(
    (state) => state.postStorage
  );
  const { userDetail, msg, error, loading } = useSelector(
    (state) => state.Detail
  );

  useEffect(() => {
    !error && !loading && msg && alert.success(msg);
    error && !loading && msg && alert.error(msg);
    !error && loading && msg && alert.show(msg);
    !P_error && !comment_loading && P_msg && alert.success(P_msg);
    P_error && !comment_loading && P_msg && alert.error(P_msg);
  }, [msg, error, P_loading, loading, P_msg, comment_loading, P_error]);

  return (
    <>
      <section>
        <div className="post_section">
          {/* <!--           status----------------------------> */}

          <Status />

          {/* <!--           1st post------------------> */}

          {!P_loading ? (
            post.length > 0 ? (
              post
                ?.slice()
                .reverse()
                .map((element) => (
                  <div className="post_collection" key={element?._id}>
                    <div className="head_section">
                      <span>
                        <div className="head_pic">
                          <img src={element?.postOwnerPic} alt="" />
                        </div>
                        <span className="head_name">
                          <Link to={`accounts/${element?.postOwnerUserId}`}>
                            {element?.postOwnerName}
                          </Link>
                        </span>
                        <span className="time">
                          {format(element.createdAt)}
                        </span>
                      </span>
                      <div className="three_dot">...</div>
                    </div>
                    <div
                      className="post_content"
                      id={element._id}
                      onClick={() => handleGlowHeart(element._id)}
                    >
                      <Image
                        cloudName="dibrrvvih"
                        publicId={element?.postPic?.public_id}
                      >
                        <Transformation crop="scale" width="200" />
                      </Image>
                      <span>
                        <FavoriteOutlined />
                      </span>
                    </div>
                    <div className="like_cmt_share_section">
                      <div className="like_cmt_share">
                        <div
                          className="like"
                          onClick={() =>
                            dispatch(likeAndDislikeAction(element._id))
                          }
                        >
                          {element.postLike.some(
                            (i) => i.likeUserId === userDetail._id
                          ) ? (
                            <FavoriteOutlined
                              style={{ color: "red" }}
                              onClick={likeHandle}
                            />
                          ) : (
                            <FavoriteBorderOutlined onClick={likeHandle} />
                          )}
                        </div>
                        <CommentOutlined /> <SendOutlined />
                      </div>
                      <div className="save_post">
                        <BookmarkBorderOutlined />
                      </div>
                    </div>
                    <div className="like_count">
                      {element?.postLike?.length > 0
                        ? element?.postLike?.length
                        : "0"}
                      <b> likes</b>
                    </div>
                    <div className="post_description">
                      <p>
                        <b>{element?.postOwnerName} </b> {element?.postCaption}
                      </p>
                      <span
                        id={`${element._id}more`}
                        className="more"
                        onClick={() => handleMore(`${element._id}more`)}
                      >
                        more
                      </span>
                    </div>
                    <hr />
                    <div className="comment">
                      <div className="recentCommentBox">
                        <ul>
                          {element?.postComment?.length > 0 ? (
                            element.postComment
                              .slice()
                              .reverse()
                              ?.map((i) => (
                                <li key={i._id}>
                                  <span className="commentSpan">
                                    <span>
                                      <div className="head_pic">
                                        <img src={i.commentUserImg} alt="" />
                                      </div>
                                      <span className="head_name">
                                        {`${i.commentUserName}...`}
                                      </span>
                                    </span>
                                    <p>{i.comment}</p>
                                  </span>
                                  <span className="commentTimeSpan">
                                    {format(i.dateAndTime)}
                                  </span>
                                </li>
                              ))
                          ) : (
                            <li>No comment yet... 😢</li>
                          )}
                        </ul>
                      </div>
                      <div className="comment_input">
                        <div className="comment_Input_inner">
                          <SentimentSatisfiedOutlined />
                          <input
                            type="text"
                            placeholder="Add a comment.."
                            onChange={(e) => setUserComment(e.target.value)}
                            value={userComment}
                          />
                        </div>
                        {!comment_loading ? (
                          <button
                            onClick={() => handleComment(element._id)}
                            disabled={userComment.length < 1 && true}
                          >
                            post
                          </button>
                        ) : (
                          <img src="./image/loader.gif" alt="" />
                        )}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <Sponsor />
            )
          ) : (
            <div className="loading">
              <img src="./image/loader.gif" alt="" />
              <p>
                <span>Loading</span> <span>. </span>
                <span>. </span>
                <span>.</span>
              </p>
            </div>
          )}

          {/* <!--           post end-----------------------------------> */}
        </div>
      </section>
    </>
  );
}

export default Post;
