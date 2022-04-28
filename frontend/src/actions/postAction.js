import config from "../requestConfig";
import axios from "axios";
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
import universalLink from "../universalLink";
export const allPostAction = () => async (dispatch) => {
  try {
    dispatch({ type: GETTING_ALLPOST_START });
    const { data } = await axios.get(`${universalLink}/post`, config);

    dispatch({
      type: GETTING_ALLPOST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GETTING_ALLPOST_FAIL,
      payload: error,
    });
  }
};
export const likeAndDislikeAction = (postId) => async (dispatch) => {
  try {
    dispatch({ type: LIKE_AND_DISLIKE_START });
    const { data } = await axios.put(
      `${universalLink}/like_dislike/${postId}`,
      config
    );

    const newData = {
      ...data.data,
      postId: postId,
    };

    dispatch({
      type: LIKE_AND_DISLIKE_SUCCESS,
      payload: newData,
    });
  } catch (error) {
    dispatch({
      type: LIKE_AND_DISLIKE_FAIL,
      payload: error,
    });
  }
};
export const uploadAction = (formData) => async (dispatch) => {
  console.log(formData);
  const config2 = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
  };
  try {
    dispatch({ type: UPLOAD_START });
    const { data } = await axios.post(
      `${universalLink}/newPost`,
      formData,
      config2
    );

    dispatch({
      type: UPLOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_FAIL,
      payload: error,
    });
  }
};

export const commentAction = (postId, comment) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_START });
    const { data } = await axios.put(
      `${universalLink}/comment/${postId}`,
      { comment: comment },
      config
    );
    console.log(data);
    const newData = {
      ...data,
      postId: postId,
    };

    dispatch({
      type: COMMENT_SUCCESS,
      payload: newData,
    });
  } catch (error) {
    dispatch({
      type: COMMENT_FAIL,
      payload: error,
    });
  }
};
