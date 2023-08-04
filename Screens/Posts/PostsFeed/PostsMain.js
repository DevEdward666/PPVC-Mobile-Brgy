import React, {useEffect} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import {action_get_posts} from '../../../Services/Actions/PostsActions';
import Posts from './Posts';
import styles from './style';
function PostsMain(props) {
  const posts_reducers = useSelector((state) => state.PostsReducers.posts_data);
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    const getposts = async () => {
      if (mounted) {
        dispatch(action_get_posts(5));
      }
    };
    mounted && getposts();
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  return (
    <>
      {posts_reducers.data.length <= 0 ? (
        <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      ) : (
        <Posts />
      )}
    </>
  );
}

export default PostsMain;
