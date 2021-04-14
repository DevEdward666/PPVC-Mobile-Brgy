import {BASE_URL, NETINFO} from '../Types/Default_Types';
import NetInfo from '@react-native-community/netinfo';
export const action_netinfo = () => (dispatch) => {
  NetInfo.fetch().then((state) => {
    console.log(state.isInternetReachable);
    if (state.isInternetReachable) {
      dispatch({
        type: NETINFO,
        payload: {isConnected: false, message: 'Connected'},
      });
    } else {
      dispatch({
        type: NETINFO,
        payload: {
          isConnected: true,
          message: 'No Internet Connection',
        },
      });
    }
  });
};
