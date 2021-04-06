import {
  GET_RESIDENTS_LIST,
  GET_RESIDENTS_ISSUCCESS,
  GET_RESIDENTS_FAD_DATA,
  GET_SINGLE_MEDICAL_RECORDS,
  GET_FORGOT_PASSWORD_PROMISE,
} from '../Types/ResidentsTypes';

const residentslist = {
  residents_list: [],
  single_medical_records: [],
  residents_exist_data: [],
  issuccess: false,
  forgotpassissuccess: {},
};
const ResidentReducers = (data_state = residentslist, actions) => {
  switch (actions.type) {
    case GET_RESIDENTS_LIST:
      return {...data_state, residents_list: actions.payload};
    case GET_RESIDENTS_ISSUCCESS:
      return {...data_state, issuccess: actions.payload};
    case GET_RESIDENTS_FAD_DATA:
      return {...data_state, residents_exist_data: actions.payload};
    case GET_SINGLE_MEDICAL_RECORDS:
      return {...data_state, single_medical_records: actions.payload};
    case GET_FORGOT_PASSWORD_PROMISE:
      return {...data_state, forgotpassissuccess: actions.payload};

    default:
      return data_state;
  }
};
export default ResidentReducers;
