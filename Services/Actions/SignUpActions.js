import {BASE_URL} from '../Types/Default_Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';
export const action_SignUp_user = (
  PhotoSingleFile,
  firstname,
  middlename,
  lastname,
  suffix,
  gender,
  birthdate,
  nationality,
  religion,
  civilstatus,
  purok,
  mobile,
  email,
  dialect,
  tribe,
  disability,
  isemployed,
  jobspecs,
  HouseIncome,
  HouseStatus,
  VotingPrecint,
  houseownedby,
  username,
  password,
) => async () => {
  var url = `${BASE_URL}/api/residentmobile/addMobileResident`;

  let formdata = new FormData();
  formdata.append('pic', PhotoSingleFile);
  formdata.append('first_name', firstname);
  formdata.append('middle_name', middlename);
  formdata.append('last_name', lastname);
  formdata.append('suffix', suffix);
  formdata.append('gender', gender);
  formdata.append('birth_date', birthdate);
  formdata.append('nationality', nationality);
  formdata.append('religion', religion);
  formdata.append('civil_status', civilstatus);

  formdata.append('purok', purok);
  formdata.append('phone', mobile);
  formdata.append('email', email);
  formdata.append('dialect', dialect);
  formdata.append('tribe', tribe);

  formdata.append('with_disability', disability);
  formdata.append('is_employed', isemployed);
  formdata.append('employment', jobspecs);
  formdata.append('house_income', HouseIncome);
  formdata.append('house_status', HouseStatus);

  formdata.append('voting_precinct', VotingPrecint);
  formdata.append('house_ownership', houseownedby);
  formdata.append('password', password);
  formdata.append('encoder_pk', '0');

  const fetchdata = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: formdata,
  });
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
      console.log(parseData);
    }
  }
  console.log(parseData);
};
