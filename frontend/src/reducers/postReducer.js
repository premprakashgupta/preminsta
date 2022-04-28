import {
  COMMENT_FAIL,
  COMMENT_START,
  COMMENT_SUCCESS,
  GETTING_ALLPOST_FAIL,
  GETTING_ALLPOST_START,
  GETTING_ALLPOST_SUCCESS,
  LIKE_AND_DISLIKE_FAIL,
  LIKE_AND_DISLIKE_START,
  LIKE_AND_DISLIKE_SUCCESS,
  UPLOAD_FAIL,
  UPLOAD_START,
  UPLOAD_SUCCESS,
} from "../constants/AllConstants";

export const AllPostReducer = (state = { post: [] }, action) => {
  switch (action.type) {
    case GETTING_ALLPOST_START:
      return {
        post: [],
        P_loading: true,
        error: false,
      };
    case GETTING_ALLPOST_SUCCESS:
      return {
        ...state,
        post: action.payload.data,
        P_loading: false,
        error: false,
      };
    case GETTING_ALLPOST_FAIL:
      return {
        post: [],
        P_loading: false,
        error: true,
      };
    case LIKE_AND_DISLIKE_START:
      return {
        ...state,
      };
    case LIKE_AND_DISLIKE_SUCCESS:
      return {
        ...state,
        postLike: state.post.map((element) => {
          if (element._id === action.payload.postId) {
            element.postLike = action.payload.postLike;
          }
        }),
        P_loading: false,
        error: false,
      };
    case LIKE_AND_DISLIKE_FAIL:
      return {
        ...state,
        P_loading: false,
        error: true,
      };
    case UPLOAD_START:
      return {
        ...state,
        upload_loading: true,
        P_loading: false,
        P_error: false,
        P_msg: "Loading...",
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        post: [...state.post, action.payload.data],
        P_loading: false,
        upload_loading: false,
        P_error: false,
        P_msg: action.payload.msg,
      };
    case UPLOAD_FAIL:
      return {
        ...state,
        upload_loading: false,
        P_loading: false,
        P_error: true,
        // P_msg:action.payload.message
      };
    case COMMENT_START:
      return {
        ...state,
        comment_loading: true,
        P_loading: false,
        P_error: false,
        P_msg: "Loading...",
      };
    case COMMENT_SUCCESS:
      return {
        ...state,
        postComment: state.post.map((element) => {
          if (element._id === action.payload.postId) {
            element.postComment = action.payload.data.postComment;
          }
        }),
        comment_loading: false,
        P_loading: false,
        P_error: false,
        P_msg: action.payload.msg,
      };
    case COMMENT_FAIL:
      return {
        ...state,
        comment_loading: false,
        P_loading: false,
        P_error: true,
        // msg:action.payload.message
      };
    default:
      return state;
  }
};
