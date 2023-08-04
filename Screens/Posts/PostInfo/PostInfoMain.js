import React, {useEffect} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import {action_get_posts_info} from '../../../Services/Actions/PostsActions';
import PostsInfo from './PostsInfo';
import styles from './style';
function PostInfoMain(props) {
  const posts_pk = useSelector((state) => state.PostsReducers.posts_pk);
  const posts_info = useSelector((state) => state.PostsReducers.posts_info);

  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    const getpostsinfo = () => {
      if (mounted) {
        dispatch(action_get_posts_info(posts_pk));
      }
    };

    mounted && getpostsinfo();
    return () => {
      mounted = false;
    };
  }, [dispatch, posts_pk]);

  //   console.log(posts_info.data.length);
  return (
    <>
      {posts_info.length <= 0 ? (
        <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      ) : (
        <PostsInfo />
      )}
    </>
  );
}

export default PostInfoMain;
