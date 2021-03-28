import {BASE_URL} from '../Types/Default_Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';
import {
  GET_RESIDENTS_LIST,
  GET_RESIDENTS_ISSUCCESS,
  GET_RESIDENTS_FAD_DATA,
} from '../Types/ResidentsTypes';

export const action_get_residents_list = () => async (dispatch) => {
  //   var url = `${BASE_URL}/api/user/currentUser`;
  var url = `${BASE_URL}/api/residentmobile/getresidents`;
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
        type: GET_RESIDENTS_LIST,
        payload: parseData.data,
      });
    }
  }
};
export const action_get_FAD_exist = (resident_pk) => async (dispatch) => {
  //   var url = `${BASE_URL}/api/user/currentUser`;
  var url = `${BASE_URL}/api/familymobile/getfamilyexist`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('ulo_pamilya', resident_pk);
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
        type: GET_RESIDENTS_FAD_DATA,
        payload: parseData.data,
      });
    }
  }
};

export const action_addfamily = (
  resident_pk,
  okasyon_balay,
  straktura,
  kadugayon_pagpuyo,
  okasyon_yuta,
  kaligon_balay,
  fam_member,
) => async (dispatch) => {
  //   var url = `${BASE_URL}/api/user/currentUser`;
  var url = `${BASE_URL}/api/family/addFamily`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;

  const fetchdata = await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ulo_pamilya: resident_pk,
      okasyon_balay: okasyon_balay,
      straktura: straktura,
      kadugayon_pagpuyo: kadugayon_pagpuyo,
      okasyon_yuta: okasyon_yuta,
      kaligon_balay: kaligon_balay,
      fam_members: fam_member,
    }),
  });
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
      dispatch({
        type: GET_RESIDENTS_ISSUCCESS,
        payload: parseData.success,
      });
    }
  }
};
