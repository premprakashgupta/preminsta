const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    postOwnerId: {
      type: String,
    },
    postTitle: {
      type: String,
    },
    postOwnerName: {
      type: String,
    },
    postOwnerUserId: {
      type: String,
    },
    postOwnerPic: {
      type: String,
      default: "no image",
    },
    postPic: {
      public_id: {
        type: String
      },
      secure_url: {
        type: String
      }
    },
    postCaption: {
      type: String,
      default: "Rock on instagram",
    },
    postLike: [
      {
        likeUserId: {
          type: String,
        },
        likeUserName: {
          type: String,
        },
        likeUserPic: {
          type: String,
        },
      },
    ],
    postComment: [
      {
        commentUserId: {
          type: String,
        },
        commentUserName: {
          type: String,
        },
        comment: {
          type: String,
        },
        commentUserImg: {
          type: String,
        },
        dateAndTime:{
          type: Date,
          default: Date.now
        }
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostSchema", PostSchema);
