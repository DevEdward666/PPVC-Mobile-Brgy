import {
  GET_POSTS,
  GET_POSTS_INFO,
  GET_POSTS_COMMENTS,
  GET_USER_POSTS,
  GET_POSTS_REACTION,
} from '../Types/PostsTypes';
import {BASE_URL} from '../Types/Default_Types';
const posts = {
  posts_data: [],
  posts_user_data: [],
  posts_info: [],
  posts_comments: [],
  posts_reaction: [],
  base_url: BASE_URL,
};
const PostsReducers = (data_state = posts, actions) => {
  switch (actions.type) {
    case GET_POSTS:
      return {...data_state, posts_data: actions.payload};
    case GET_USER_POSTS:
      return {...data_state, posts_user_data: actions.payload};
    case GET_POSTS_INFO:
      return {...data_state, posts_info: actions.payload};
    case GET_POSTS_COMMENTS:
      return {...data_state, posts_comments: actions.payload};
    case GET_POSTS_REACTION:
      return {...data_state, posts_reaction: actions.payload};
    case BASE_URL:
      return {...data_state, base_url: actions.payload};
    default:
      return data_state;
  }
};
export default PostsReducers;
