import React, {useEffect} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import {
  action_get_FAD_exist,
  action_get_FAD_form,
} from '../../Services/Actions/ResidentsActions';
import FADForm from './FADForm';

function FADMain(props) {
  const resident_form = useSelector(
    (state) => state.ResidentReducers.resident_form,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    const index = () => {
      dispatch(action_get_FAD_exist(users_reducers?.resident_pk));
    };
    mounted && index();
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const index = () => {
      if (mounted) {
        dispatch(
          action_get_FAD_form(
            users_reducers?.resident_pk,
            users_reducers?.fam_pk,
          ),
        );
      }
    };
    mounted && index();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return (
    <>
      {resident_form?.data?.length <= 0 ? (
        <Spinner visible={true} textContent={'Fetching Data...'} />
      ) : null}

      <FADForm />
    </>
  );
}

export default FADMain;
