const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      max: [12, "username character exceed"],
      min: [4, "Name character is too short"],
      default: "Instagram User",
    },
    userId: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      min: [6, "Password is above 6 character"],
      select: false,
    },
    dob: {
      type: String,
      required: [true, "Field cant be empty"],
    },
    profilePic: {
      type: String,
      default: "/image/avatar.jpg",
    },
    mobile: {
      type: String,
      unique: true,
    },
    follower: [
      {
        followerId: {
          type: String,
        },
        followerUserId: {
          type: String,
        },
        followerName: {
          type: String,
        },
        followerPic: {
          type: String,
        },
      },
    ],
    following: [
      {
        followingId: {
          type: String,
          default: "",
        },
        followingUserId: {
          type: String,
          default: "",
        },
        followingName: {
          type: Object,
          default: "",
        },
        followingPic: {
          type: String,
          default: "",
        },
      },
    ],
    myLiked: [
      {
        likePostId: {
          type: String,
        },
        likePostPic: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (this.get("email") === "") {
    var random = "abcdefghijklmnopqrstuvwxyz";
    var generateString = "";
    for (var i = 0; i < 5; i++) {
      generateString += random[Math.floor(Math.random() * 25)];
    }
    this.email = generateString + "@gmail.com";
  }
  if (this.get("mobile") === "") {
    var random = "1234567890";
    var generateString = "";
    for (var i = 0; i < 10; i++) {
      generateString += random[Math.floor(Math.random() * 9)];
    }
    this.mobile = generateString;
  }
  this.following[0].followingId = this._id; // considering _id is input by client
  this.following[0].followingName = this.username; // considering _id is input by client
  this.following[0].followingPic = this.profilePic; // considering _id is input by client
  next();
});

UserSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      data: { id: this._id },
    },
    process.env.JWT_SEC,
    { expiresIn: process.env.JWT_EXP }
  );
};

module.exports = mongoose.model("User", UserSchema);
