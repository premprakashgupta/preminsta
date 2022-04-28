import {
  FOLLOWING_FAIL,
  FOLLOWING_START,
  FOLLOWING_SUCCESS,
  LOAD_USER_DETAIL_FAIL,
  LOAD_USER_DETAIL_START,
  LOAD_USER_DETAIL_SUCCESS,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  PROFILE_FAIL,
  PROFILE_START,
  PROFILE_SUCCESS,
  REGISTER_FAIL,
  REGISTER_START,
  REGISTER_SUCCESS,
  SUGGESTION_FAIL,
  SUGGESTION_SUCCESS,
} from "../constants/AllConstants";
import config from "../requestConfig";
import axios from "axios";
import universalLink from "../universalLink";
export const registerAction =
  (username, userId, email, password) => async (dispatch) => {
    console.log(username, userId, email, password);
    try {
      dispatch({ type: REGISTER_START });
      const { data } = await axios.post(
        `${universalLink}/newUser`,
        {
          username,
          userId,
          email,
          password,
          dob: "21-01-2001",
          mobile: "",
          following: {},
        },
        config
      );
      console.log("userAction line 15 " + data);
      setTimeout(() => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: data,
        });
      }, 1000);
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error,
      });
    }
  };
export const loginAction = (identity, password) => async (dispatch) => {
  identity["password"] = password;
  try {
    dispatch({ type: LOGIN_START });
    const { data } = await axios.post(
      `${universalLink}/login`,
      identity,
      config
    );
    console.log("userAction line 40 " + data);
    setTimeout(() => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error,
    });
  }
};
export const loadUserDetailAction = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_DETAIL_START });
    axios.defaults.withCredentials = true;
    const { data } = await axios.get(`${universalLink}/me`, config);

    dispatch({
      type: LOAD_USER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_DETAIL_FAIL,
      payload: error,
    });
  }
};
export const logoutAction = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_START,
    });
    const { data } = await axios.get(`${universalLink}/logout`, config);
    console.log("userAction line 89 " + data);
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error,
    });
  }
};

export const profileLoad = (x) => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_START,
    });
    const { data } = await axios.get(`${universalLink}/accounts/${x}`);
    console.log(data);
    dispatch({
      type: PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_FAIL,
      payload: error,
    });
  }
};

export const FollowingAction = (x) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${universalLink}/following/${x}`);

    dispatch({
      type: FOLLOWING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FOLLOWING_FAIL,
      payload: error,
    });
  }
};

export const SuggestionAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${universalLink}/suggestion`);
    console.log(data);
    dispatch({
      type: SUGGESTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUGGESTION_FAIL,
      payload: error,
    });
  }
};
