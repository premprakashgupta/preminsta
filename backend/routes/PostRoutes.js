const { userAuth } = require("../auth/userAuth")
const { newPostCreate, getAllPost, Like_Dislike, Comment } = require("../controller/PostController")

const Router=require("express").Router()

Router.route("/newPost").post(userAuth,newPostCreate)
Router.route("/post").get(userAuth,getAllPost)
Router.route("/like_dislike/:id").put(userAuth,Like_Dislike)
Router.route("/comment/:id").put(userAuth,Comment)


module.exports=Router;