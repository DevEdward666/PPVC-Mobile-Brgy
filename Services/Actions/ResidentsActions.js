import {BASE_URL} from '../Types/Default_Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';
import {
  GET_RESIDENTS_LIST,
  GET_RESIDENTS_ISSUCCESS,
  GET_RESIDENTS_FAD_DATA,
  GET_FORGOT_PASSWORD_PROMISE,
  GET_MEMBERS,
  GET_RELIGION_LIST,
  GET_NATIONALTIY_LIST,
} from '../Types/ResidentsTypes';

export const action_get_residents_list = (searchname) => async (dispatch) => {
  //   var url = `${BASE_URL}/api/user/currentUser`;
  var url = `${BASE_URL}/api/residentmobile/getresidents`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('search', searchname);
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
        payload: {data: parseData.data, loading: parseData.success},
      });
    }
  }
};

export const action_reset_password = (
  email,
  password,
  currentpassword,
) => async (dispatch) => {
  //   var url = `${BASE_URL}/api/user/currentUser`;
  var url = `${BASE_URL}/api/residentmobile/updatepassword`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('email', email);
  formdata.append('password', password);
  formdata.append('currentpassword', currentpassword);
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
        type: GET_FORGOT_PASSWORD_PROMISE,
        payload: {message: parseData.message, success: parseData.success},
      });
    } else {
      dispatch({
        type: GET_FORGOT_PASSWORD_PROMISE,
        payload: {message: parseData.message, success: parseData.success},
      });
    }
  } else {
    dispatch({
      type: GET_FORGOT_PASSWORD_PROMISE,
      payload: {message: parseData.message, success: parseData.success},
    });
  }
};

export const action_forgot_password = (email, password) => async (dispatch) => {
  //   var url = `${BASE_URL}/api/user/currentUser`;
  var url = `${BASE_URL}/api/residentmobile/forgotpassword`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('email', email);
  formdata.append('password', password);
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
        type: GET_FORGOT_PASSWORD_PROMISE,
        payload: {message: parseData.message, success: parseData.success},
      });
    } else {
      dispatch({
        type: GET_FORGOT_PASSWORD_PROMISE,
        payload: {message: parseData.message, success: parseData.success},
      });
    }
  } else {
    dispatch({
      type: GET_FORGOT_PASSWORD_PROMISE,
      payload: {message: parseData.message, success: parseData.success},
    });
  }
};
export const action_addfamily = (
  fam_pk,
  resident_pk,
  okasyon_balay,
  straktura,
  kadugayon_pagpuyo,
  okasyon_yuta,
  kaligon_balay,
  waterconnection,
  hasComfortRoom,
  hasLightConnection,
  wastemanagement,
  kahimtang_komunidad,
  victimofabuse,
  skilltraining,
  daycareservice,
  Employment,
  medicalngatabang,
  lingap,
  houseing,
  financial,
  fourps,
  livelihood,
  scholarship,
  fam_member,
) => async (dispatch) => {
  console.log(parseInt(kadugayon_pagpuyo));
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
      fam_pk: fam_pk,
      ulo_pamilya: resident_pk,
      okasyon_balay: okasyon_balay,
      straktura: straktura,
      kadugayon_pagpuyo: kadugayon_pagpuyo,
      okasyon_yuta: okasyon_yuta,
      kaligon_balay: kaligon_balay,
      waterconnection: waterconnection,
      hasComfortRoom: hasComfortRoom,
      hasLightConnection: hasLightConnection,
      wastemanagement: wastemanagement,
      kahimtang_komunidad: kahimtang_komunidad,
      victimofabuse: victimofabuse,
      skilltraining: skilltraining,
      daycareservice: daycareservice,
      Employment: Employment,
      medicalngatabang: medicalngatabang,
      lingap: lingap,
      houseing: houseing,
      financial: financial,
      fourps: fourps,
      livelihood: livelihood,
      scholarship: scholarship,
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
  console.log(parseData);
};
export const action_upadatenewuser = (user_pk) => async (dispatch) => {
  var url = `${BASE_URL}/api/residentmobile/upadatenewuser`;
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
      user_pk: user_pk,
    }),
  });
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
      console.log(parseData.success);
    }
  }
};
export const action_getmembers = (resident_pk) => async (dispatch) => {
  var url = `${BASE_URL}/api/residentmobile/getmembers`;
  const token = await AsyncStorage.getItem('tokenizer');
  const bearer_token = token;
  const bearer = 'Bearer ' + bearer_token;
  let formdata = new FormData();
  formdata.append('resident_pk', resident_pk);
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
        type: GET_MEMBERS,
        payload: {data: parseData.data, loading: parseData.success},
      });
    }
  }
};

export const action_getreligion = () => async (dispatch) => {
  var url = `${BASE_URL}/api/residentmobile/getreligion`;

  const fetchdata = await fetch(url, {
    method: 'POST',
  });
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
      dispatch({
        type: GET_RELIGION_LIST,
        payload: parseData.data,
      });
    }
  }
};

export const action_getnationality = () => async (dispatch) => {
  var url = `${BASE_URL}/api/residentmobile/getnationality`;

  const fetchdata = await fetch(url, {
    method: 'POST',
  });
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
      dispatch({
        type: GET_NATIONALTIY_LIST,
        payload: parseData.data,
      });
    }
  }
};
