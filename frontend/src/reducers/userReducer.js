import {
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
  SUGGESTION_START,
  SUGGESTION_SUCCESS,
} from "../constants/AllConstants";

export const registerReducer = (state = { userDetail: {} }, action) => {
  switch (action.type) {
    case REGISTER_START:
    case LOGIN_START:
    case LOAD_USER_DETAIL_START:
      return {
        userDetail: {},
        loading: true,
        error: false,
        msg: "Loading...",
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case LOAD_USER_DETAIL_SUCCESS:
      return {
        ...state,
        userDetail: action.payload.data,
        loading: false,
        error: action.payload.error,
        msg: action.payload.msg,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOAD_USER_DETAIL_FAIL:
      return {
        userDetail: {},
        loading: false,
        error: true,
        msg: action.payload.message,
      };
    case LOGOUT_START:
      return {
        loading: true,
        error: false,
        msg:"Loading..."
      };
    case LOGOUT_SUCCESS:
      return {
        userDetail: {},
        loading: false,
        error: false,
        msg:action.payload.msg
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        msg:action.payload.message,
      };
    default:
      return state;
  }
};

export const ProfileReducer = (state = { profile: {} }, action) => {
  switch (action.type) {
    case PROFILE_START:
      return {
        profile: {},
        loading: true,
        error: false,
        msg: "Loading..."
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload.data,
        loading: false,
        error: false,
        msg: action.payload.msg,
      };
    case PROFILE_FAIL:
      return {
        profile: {},
        loading: false,
        error: true,
        // msg: action.payload.message,
      };
    case FOLLOWING_SUCCESS:
      return {
        // returning a copy of orignal state
        ...state, //copying the original state
        profile: action.payload.data, //new todos array
      };

    default:
      return state;
  }
};
export const SuggestionReducer = (state = { suggestion: [] }, action) => {
  switch (action.type) {
    case SUGGESTION_START:
      return {
        suggestion: [],
        loading: true,
        error: false,
      };
    case SUGGESTION_SUCCESS:
      return {
        ...state,
        suggestion: action.payload.data,
        loading: false,
        error: false,
      };
    case SUGGESTION_FAIL:
      return {
        suggestion: [],
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
