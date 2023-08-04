import React, {useEffect} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import {action_get_barangay_officials_list} from '../../Services/Actions/BarangayOfficialsActions';
import BarangayOfficials from './BarangayOfficialsList';

function OfficialsMain(props) {
  const dispatch = useDispatch();
  const brgyofficiallist = useSelector(
    (state) => state.BarangayOfficialReducers.data_barangay,
  );

  useEffect(() => {
    let mounted = true;

    const getbrgyofficials = () => {
      if (mounted) {
        dispatch(action_get_barangay_officials_list());
      }
    };

    mounted && getbrgyofficials();
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  console.log(brgyofficiallist);
  return (
    <>
      {brgyofficiallist?.length <= 0 ? (
        <Spinner visible={true} textContent={'Fetching Data...'} />
      ) : null}

      <BarangayOfficials />
    </>
  );
}

export default OfficialsMain;
