import {BASE_URL} from '../Types/Default_Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';
import {
  GET_POSTS_COMMENTS,
  GET_POSTS,
  GET_POSTS_INFO,
  GET_USER_POSTS,
  GET_POSTS_REACTION,
} from '../Types/PostsTypes';
export const action_get_user_posts = () => async (dispatch) => {
  //   var url = `${BASE_URL}/api/user/currentUser`;
  var url = `${BASE_URL}/api/posts/getUserPosts`;
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
        type: GET_USER_POSTS,
        payload: parseData.data,
      });
    }
  }
};
export const action_get_posts = () => async (dispatch) => {
  //   var url = `${BASE_URL}/api/user/currentUser`;
  var url = `${BASE_URL}/api/posts/getPosts`;
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
        type: GET_POSTS,
        payload: parseData.data,
      });
    }
  }
};
export const action_get_posts_comments = (posts_pk) => async (dispatch) => {
  var url = `${BASE_URL}/api/posts/getPostsComments`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('posts_pk', posts_pk);
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
        type: GET_POSTS_COMMENTS,
        payload: parseData.data,
      });
    }
  }
};
export const action_posts_add_comment = (posts_pk, body) => async () => {
  var url = `${BASE_URL}/api/posts/addPostComment`;
  const token = await AsyncStorage.getItem('tokenizer');
  const user_pk = await AsyncStorage.getItem('user_id');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('posts_pk', posts_pk);
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
  r;
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
    }
  }
  console.log(parseData);
};

export const action_set_posts_reactions = (posts_pk, reaction) => async (
  dispatch,
) => {
  //   var url = `${BASE_URL}/api/user/currentUser`;
  var url = `${BASE_URL}/api/posts/addPostReaction`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('posts_pk', posts_pk);
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
        type: GET_POSTS_REACTION,
        payload: parseData.data,
      });
    }
  }
};

export const action_set_posts = (title, body, upload_files) => async () => {
  var url = `${BASE_URL}/api/posts/addPosts`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('title', title);
  formdata.append('body', body);

  upload_files.forEach((item) => {
    formdata.append('uploaded_files', item);
  });

  const fetchdata = await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
      'Content-Type': 'multipart/form-data',
    },
    body: formdata,
  });
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
    }
  }
  console.log(upload_files);
};
