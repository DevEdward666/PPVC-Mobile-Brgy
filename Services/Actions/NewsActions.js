import {SET_DATA} from '../Types/LoginTypes';
import {BASE_URL} from '../Types/Default_Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';
import {
  GET_COMMENTS,
  GET_DATA,
  GET_INFO,
  GET_NEWS_REACTION,
} from '../Types/NewsTypes';

export const action_get_news = () => async (dispatch) => {
  //   var url = `${BASE_URL}/api/user/currentUser`;
  var url = `${BASE_URL}/api/news/getNewsDataPublished`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  const fetchdata = await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
    },
  });
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
      dispatch({
        type: GET_DATA,
        payload: parseData.data,
      });
    }
  }
};
export const action_get_news_info = (news_pk) => async (dispatch) => {
  //   var url = `${BASE_URL}/api/user/currentUser`;
  var url = `${BASE_URL}/api/news/getSingleNewsWithPhoto`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('news_pk', news_pk);
  const fetchdata = await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
    },
    body: formdata,
  });
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
      dispatch({
        type: GET_INFO,
        payload: parseData.data,
      });
    }
  }
};

export const action_get_news_comments = (news_pk) => async (dispatch) => {
  //   var url = `${BASE_URL}/api/user/currentUser`;
  var url = `${BASE_URL}/api/news/getNewsComments`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('news_pk', news_pk);
  const fetchdata = await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
    },
    body: formdata,
  });
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
      dispatch({
        type: GET_COMMENTS,
        payload: parseData.data,
      });
    }
  }
};
export const action_set_news_reactions = (news_pk, reaction) => async (
  dispatch,
) => {
  //   var url = `${BASE_URL}/api/user/currentUser`;
  var url = `${BASE_URL}/api/news/addNewsReaction`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('news_pk', news_pk);
  formdata.append('reaction', reaction);
  const fetchdata = await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
    },
    body: formdata,
  });
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
      dispatch({
        type: GET_NEWS_REACTION,
        payload: parseData.data,
      });
    }
  }
};
export const action_get_news_add_comment = (news_pk, body) => async () => {
  //   var url = `${BASE_URL}/api/user/currentUser`;
  var url = `${BASE_URL}/api/news/addNewsComment`;
  const token = await AsyncStorage.getItem('tokenizer');
  const user_pk = await AsyncStorage.getItem('user_id');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('news_pk', news_pk);
  formdata.append('user_pk', user_pk);
  formdata.append('body', body);
  const fetchdata = await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
    },
    body: formdata,
  });
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
    }
  }
};
