import {BASE_URL} from '../Types/Default_Types';

const defult_values = {
  // base_url: 'http://192.168.254.108:4050',
  base_url: BASE_URL,
};
const Default_Reducers = (data_state = defult_values, actions) => {
  switch (actions.type) {
    case BASE_URL:
      return {...data_state, base_url: actions.payload};
    default:
      return data_state;
  }
};
export default Default_Reducers;
