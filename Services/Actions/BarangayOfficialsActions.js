import {BASE_URL} from '../Types/Default_Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_DATA_BARANGAY} from '../Types/BarangaOfficialTypes';

export const action_get_barangay_officials_list = () => async (dispatch) => {
  var url = `${BASE_URL}/api/official/getBrgyOfficialList`;
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
        type: GET_DATA_BARANGAY,
        payload: parseData.data,
      });
    }
  }
};
