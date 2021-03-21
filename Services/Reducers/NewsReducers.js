import {
  GET_DATA,
  GET_INFO,
  GET_COMMENTS,
  GET_NEWS_REACTION,
} from '../Types/NewsTypes';
import {BASE_URL} from '../Types/Default_Types';
const news = {
  data: [],
  info: [],
  comments: [],
  reactions: [],
  // base_url: 'http://192.168.254.104:4050',
  base_url: BASE_URL,
};
const NewsReducers = (data_state = news, actions) => {
  switch (actions.type) {
    case GET_DATA:
      return {...data_state, data: actions.payload};
    case GET_INFO:
      return {...data_state, info: actions.payload};
    case GET_COMMENTS:
      return {...data_state, comments: actions.payload};
    case GET_NEWS_REACTION:
      return {...data_state, reactions: actions.payload};
    case BASE_URL:
      return {...data_state, base_url: actions.payload};
    default:
      return data_state;
  }
};
export default NewsReducers;
