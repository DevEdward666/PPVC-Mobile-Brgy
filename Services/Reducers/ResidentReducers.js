import {
  GET_RESIDENTS_LIST,
  GET_RESIDENTS_ISSUCCESS,
  GET_RESIDENTS_FAD_DATA,
} from '../Types/ResidentsTypes';

const residentslist = {
  residents_list: [],
  residents_exist_data: [],
  issuccess: false,
};
const ResidentReducers = (data_state = residentslist, actions) => {
  switch (actions.type) {
    case GET_RESIDENTS_LIST:
      return {...data_state, residents_list: actions.payload};
    case GET_RESIDENTS_ISSUCCESS:
      return {...data_state, issuccess: actions.payload};
    case GET_RESIDENTS_FAD_DATA:
      return {...data_state, residents_exist_data: actions.payload};

    default:
      return data_state;
  }
};
export default ResidentReducers;
