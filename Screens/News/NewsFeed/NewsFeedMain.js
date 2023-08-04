import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {action_get_news} from '../../../Services/Actions/NewsActions';
import NewsFeed from './NewsFeed';
import styles from './style';
import Spinner from 'react-native-loading-spinner-overlay';
function NewsFeedMain(props) {
  const news_reducers = useSelector((state) => state.NewsReducers.data);
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;

    const getnews = () => {
      if (mounted) {
        dispatch(action_get_news());
      }
    };

    mounted && getnews();
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  return (
    <>
      {news_reducers?.length <= 0 ? (
        <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      ) : (
        <NewsFeed />
      )}
    </>
  );
}

export default NewsFeedMain;
