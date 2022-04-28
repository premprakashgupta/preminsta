const UserSchema = require("../models/UserSchema");
const PostSchema = require("../models/PostSchema");
const jsonMsgHandler = require("../Globelfunctions/functons");
const cookieImplement = require("../utility/jwtToken");
exports.Register = async (req, res) => {
  try {
    const data = await UserSchema.create(req.body);
    cookieImplement(data, 200, "Registered", res);
  } catch (error) {
    jsonMsgHandler(res, 401, "", true, error.message);
  }
};
exports.Login = async (req, res, next) => {
  try {
    const data = await UserSchema.findOne({
      $or: [
        { userId: req.body.userId },
        { mobile: req.body.mobile },
        { email: req.body.email },
      ],
    }).select("+password");
    if (!data) {
      return jsonMsgHandler(res, 404, "", false, "User Not Found");
    }

    if (data.password !== req.body.password) {
      return jsonMsgHandler(res, 401, "", false, "User Not Found");
    }
    cookieImplement(data, 200, "Logged in", res);
  } catch (error) {
    return jsonMsgHandler(res, 404, "", true, error.message);
  }
};
exports.LoadDataofAuthUser = async (req, res, next) => {
  try {
    const data = await UserSchema.findById(req.AllUserData._id);
    jsonMsgHandler(res, 200, data, false, "User Authenticate successfully..");
  } catch (error) {
    return jsonMsgHandler(res, 401, "", true, error.message);
  }
};
exports.Profile = async (req, res, next) => {
  try {
    const data = await UserSchema.findOne({ userId: req.params.userId });
    // console.log("user data ---"+data)
    const data1 = await PostSchema.find({ postOwnerId: data._id });
    // console.log("post data ---"+data1)
    let newData = {
      ...data._doc,
      posts: data1,
    };
    jsonMsgHandler(res, 200, newData, false, "profile found successfully..");
  } catch (error) {
    return jsonMsgHandler(res, 401, "", true, error.message);
  }
};
exports.Logout = async (req, res, next) => {
  try {
    const options = {
      expires: new Date(Date.now()),
      httpOnly: true,
    };
    res.status(200).cookie("token", null, options).json({
      data: "",
      error: false,
      msg: "Logout",
    });
  } catch (error) {
    jsonMsgHandler(res, 401, "", true, error.message);
  }
};

exports.Following = async (req, res, next) => {
  const copyOfAllUserData = { ...req.AllUserData };
  const newFollowerData = {
    followerId: req.AllUserData._id,
    followerUserId: req.AllUserData.userId,
    followerName: req.AllUserData.username,
    followerPic: req.AllUserData.profilePic,
  };
  let indicator = false;
  const AlluserId = req.AllUserData._id.valueOf();
  try {
    const data = await UserSchema.findOne({ userId: req.params.id });

    const newFollowingData = {
      followingId: data._id,
      followingUserId: data.userId,
      followingName: data.username,
      followingPic: data.profilePic,
    };

    data.follower.forEach((i) => {
      if (i.followerId === AlluserId) {
        indicator = true;
      }
    });

    if (indicator) {
      req.AllUserData.following = req.AllUserData.following.filter(
        (i) => i.followingId !== data._id.valueOf()
      );

      data.follower = data.follower.filter((i) => i.followerId !== AlluserId);
    } else {
      data.follower.push(newFollowerData);
      req.AllUserData.following.push(newFollowingData);
    }

    data.save();
    req.AllUserData.save();
    const data1 = await PostSchema.find({ postOwnerId: data._id });
    // console.log("post data ---"+data1)
    let newData = {
      ...data._doc,
      posts: data1,
    };
    jsonMsgHandler(res, 200, newData, false, "Added");
  } catch (error) {
    jsonMsgHandler(res, 401, "", true, error.message);
  }
};

exports.Suggestion = async (req, res, next) => {
  try {
    const data = await UserSchema.aggregate([{ $sample: { size: 3 } }]);

    // arr1.filter(item => !arr2.includes(item))
    let arr1 = [];
    req.AllUserData.following.forEach((element) => {
      arr1.push(element.followingId);
    });

    jsonMsgHandler(
      res,
      200,
      data.filter((i) => !arr1.includes(i._id.valueOf())),
      false,
      "Suggestion for you"
    );
  } catch (error) {
    return jsonMsgHandler(res, 401, "", true, error.message);
  }
};
