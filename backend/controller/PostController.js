const jsonMsgHandler = require("../Globelfunctions/functons");
const PostSchema = require("../models/PostSchema");
const UserSchema = require("../models/UserSchema");
const cloudinary = require("cloudinary");

exports.newPostCreate = async (req, res) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(
      req.body.postPic,
      { folder: "posts", width: 550, crop: "scale" }
    );
    req.body.postOwnerId = req.AllUserData._id;
    const postData = {
      postOwnerId: req.AllUserData._id,
      postOwnerPic: req.AllUserData.profilePic,
      postOwnerName: req.AllUserData.username,
      postOwnerUserId: req.AllUserData.userId,
      postTitle: req.body.postTitle,
      postPic: {
        public_id:myCloud.public_id,
        secure_url:myCloud.secure_url},
      postCaption: req.body.postCaption,
    };

    const data = await PostSchema.create(postData);
    jsonMsgHandler(res, 200, data, false, "Post Uploaded");
  } catch (error) {
    jsonMsgHandler(res, 401, "", true, error.message);
  }
};
exports.getAllPost = async (req, res) => {
  try {
    let followingArray = [];
    req.AllUserData.following.forEach((element) => {
      followingArray.push(element.followingId);
    });
    // console.log(req.AllUserData.following.followingId);
    const data = await PostSchema.find({
      postOwnerId: { $in: followingArray },
    });
    jsonMsgHandler(res, 200, data, false, "Post find");
  } catch (error) {
    jsonMsgHandler(res, 401, "", true, error.message);
  }
};

exports.Like_Dislike = async (req, res, next) => {
  try {
    const like = {
      likeUserId: req.AllUserData._id,
      likeUserName: req.AllUserData.username,
      likeUserPic: req.AllUserData.profilePic,
    };
    let indicator = false;
    const data = await PostSchema.findById(req.params.id);

    data.postLike.forEach((element) => {
      if (element.likeUserId === req.AllUserData._id.valueOf()) {
        data.postLike.pull({ _id: element._id });
        indicator = true;
      }
    });
    req.AllUserData.myLiked.forEach((element) => {
      if (element.likePostId === req.params.id) {
        req.AllUserData.myLiked.pull({ _id: element._id });
        indicator = true;
      }
    });

    if (indicator) {
      req.AllUserData.save();
      data.save();
      jsonMsgHandler(res, 200, data, false, "Disliked");
    } else {
      data.postLike.push(like);
      const myLiked = {
        likePostId: req.params.id,
        likePostPic: data.postPic,
      };
      req.AllUserData.myLiked.push(myLiked);
      req.AllUserData.save();
      data.save();
      jsonMsgHandler(res, 200, data, false, "Liked");
    }
  } catch (error) {
    jsonMsgHandler(res, 401, "", true, error.message);
  }
};

exports.Comment = async (req, res) => {
  try {
    const commentData={
      commentUserId: req.AllUserData.userId,
      commentUserName: req.AllUserData.username,
      comment:req.body.comment,
      commentUserImg:req.AllUserData.profilePic
    }
    const data = await PostSchema.findById(req.params.id);
    data.postComment.push(commentData);
    data.save();
    jsonMsgHandler(res, 200, data, false, "Comment Added.");
  } catch (error) {
    jsonMsgHandler(res, 401, "", true, error.message);
  }
};