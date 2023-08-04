import React, {useEffect, useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import {action_get_complaints} from '../../../Services/Actions/ComplaintsActions';
import Complaints from './Complaints';

function ComplaintListMain(props) {
  const users_reducers = useSelector((state) => state.UserInfoReducers.data);
  const complaintslist = useSelector((state) => state.ComplaintsReducers.data);
  const [spinner, setSpinner] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    const getcomplaints = async () => {
      if (mounted) {
        await setSpinner(true);
        dispatch(action_get_complaints(users_reducers?.user_pk));
        await setSpinner(false);
      }
    };
    mounted && getcomplaints();
    return () => {
      mounted = false;
    };
  }, [dispatch, users_reducers]);
  return (
    <>
      {complaintslist?.length <= 0 ? (
        <Spinner visible={true} textContent={'Fetching Data...'} />
      ) : null}

      <Complaints />
    </>
  );
}

export default ComplaintListMain;
