import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_FOLLOW_STATE_CHANGE,
  CLEAR_DATA,
} from "../constants/index";

const initialState = {
  currentUser: null,
  posts: [],
  follow: [],
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case USER_POSTS_STATE_CHANGE:
      return {
        ...state,
        posts: action.posts,
      };
    case USER_FOLLOW_STATE_CHANGE:
      return {
        ...state,
        follow: action.follow,
      };
    case CLEAR_DATA:
      return {
        currentUser: null,
        posts: [],
        follow: [],
      };
    default:
      return {
        ...state,
      };
  }
};
