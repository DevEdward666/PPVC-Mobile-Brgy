import React, {useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import CardView from 'react-native-rn-cardview';
import {
  Image,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ImageBackground,
  FlatList,
} from 'react-native';
import {action_get_userinfo} from '../../Services/Actions/UserInfoActions';
import Icons from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  ButtonGroup,
  Badge,
  Icon,
  withBadge,
} from 'react-native-elements';
import CustomBottomSheet from '../../Plugins/CustomBottomSheet';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import wait from '../../Plugins/waitinterval';
import {
  action_get_user_posts,
  action_get_posts_comments,
  action_set_posts_reactions,
  action_posts_add_comment,
  action_set_posts,
} from '../../Services/Actions/PostsActions';
const MeInfo = () => {
  const users_reducers = useSelector((state) => state.UserInfoReducers.data);
  const user_posts = useSelector(
    (state) => state.PostsReducers.posts_user_data,
  );
  const posts_reducers = useSelector((state) => state.PostsReducers.posts_data);
  const base_url = useSelector((state) => state.PostsReducers.base_url);

  const posts_comments = useSelector(
    (state) => state.PostsReducers.posts_comments,
  );
  const dispatch = useDispatch();
  const [PostIsVisible, setPostIsVisible] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [comment, setcomment] = useState('');
  const [posts_id, setposts_id] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [post, setpost] = useState('');
  useEffect(() => {
    let mounted = true;

    const userinfoanduserposts = () => {
      dispatch(action_get_userinfo());
      dispatch(action_get_user_posts());
    };

    mounted && userinfoanduserposts();
    return () => (mounted = false);
  }, [dispatch]);
  let imageUri = 'data:image/png;base64,' + users_reducers?.pic;

  const handleAddPostPress = useCallback(() => {
    setPostIsVisible(true);
  }, []);
  const handleChangeTextPost = useCallback((text) => {
    setpost(text);
  }, []);
  const onCommentChangeText = useCallback((text) => {
    setcomment(text);
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
      dispatch(action_get_userinfo());
      dispatch(action_get_user_posts());
    });
  }, [dispatch]);
  const handleCommentSend = useCallback(async () => {
    if (comment !== '') {
      await dispatch(action_get_posts_comments(posts_id));
      await dispatch(action_posts_add_comment(posts_id, comment));
      await setcomment('');
    }
  }, [dispatch]);
  console.log(posts_id);
  const updateIndex = useCallback(
    (item, index) => {
      setposts_id(item?.posts_pk);
      dispatch(action_get_posts_comments(item?.posts_pk));
      if (index !== 0) {
        setisVisible(true);
      } else {
        dispatch(action_set_posts_reactions(item?.posts_pk, 'Like'));
        dispatch(action_get_user_posts());
      }
    },
    [dispatch],
  );
  const [gestureName, setgestureName] = useState('');
  const onSwipe = useCallback((gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setgestureName({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        // setopen(true);
        break;
      case SWIPE_DOWN:
        setPostIsVisible(false);

        break;
      case SWIPE_LEFT:
        // setgestureName({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        // setgestureName({backgroundColor: 'yellow'});
        break;
    }
  });
  const onSwipeComments = useCallback((gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setgestureName({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        // setopen(true);
        break;
      case SWIPE_DOWN:
        setisVisible(false);

        break;
      case SWIPE_LEFT:
        // setgestureName({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        // setgestureName({backgroundColor: 'yellow'});
        break;
    }
  });
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 1000,
  };

  const component1 = () => {
    return (
      <>
        <Text>
          <Icons name="thumbs-up" size={15} color="grey" /> Like
        </Text>
      </>
    );
  };
  const component2 = () => {
    return (
      <Text>
        <Icon name="comment" size={15} color="grey" /> Comment
      </Text>
    );
  };
  const buttons = [{element: component1}, {element: component2}];
  return (
    <SafeAreaView style={styles.flatlistcontainer}>
      <ScrollView>
        <View
          radius={1}
          backgroundColor={'#ffffff'}
          style={{height: 300, marginBottom: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View
              style={{
                width: '100%',
                height: 100,
                textAlign: 'center',
              }}>
              <Image
                style={{
                  marginTop: 10,
                  marginStart: 10,
                  alignSelf: 'center',
                  width: 200,
                  height: 200,
                  borderRadius: 200 / 2,
                  overflow: 'hidden',
                  borderWidth: 3,
                }}
                source={{uri: imageUri, scale: 1}}
              />
              <Text
                style={{textAlign: 'center', fontSize: 22, fontWeight: 'bold'}}>
                {users_reducers?.full_name}
              </Text>
              <Text style={{textAlign: 'center', fontSize: 14}}>
                Mobile No.: {users_reducers?.phone}
              </Text>
              <Text style={{textAlign: 'center', fontSize: 14}}>
                Email: {users_reducers?.email}
              </Text>
              <View style={{width: '100%', height: 50, padding: 5}}></View>
            </View>
          </View>
        </View>
        <CardView style={{height: 70, padding: 10}}>
          <Button
            title="What's on your mind?"
            type="clear"
            onPress={() => handleAddPostPress()}
          />
        </CardView>
      </ScrollView>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
        data={user_posts}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.1}
        renderItem={({item, index}) => (
          <CardView style={{marginTop: -5}} radius={1}>
            <View
              style={{
                flexDirection: 'row',
                height: 50,
                padding: 10,
                flex: 1,
                alignItems: 'center',
              }}>
              <View style={styles.contentNOTIFICATION}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: 50,
                  }}>
                  <View style={{width: 20 + '%', height: 20}}>
                    <Image
                      source={{
                        uri: `data:image/png;base64,${item?.user_pic}`,
                      }}
                      style={{
                        marginTop: 10,
                        marginStart: 10,
                        width: 40,
                        height: 40,
                        borderRadius: 120 / 2,
                        overflow: 'hidden',
                        borderWidth: 3,
                      }}
                    />
                  </View>
                  <View style={{width: 95 + '%', height: 50}}>
                    <Text style={styles.containerNOTIFICATION}>
                      {item?.user_full_name}
                      {'\n'}
                      {item?.TIMESTAMP}
                    </Text>
                  </View>
                </View>

                <Text rkType="primary3 mediumLine"></Text>
              </View>
            </View>
            {item.upload_files[0]?.file_path ? (
              <View
                style={{
                  flexDirection: 'row',
                  height: 300,
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={item.upload_files.map((item) => {
                    return {
                      uri: `${base_url}/${item.file_path}`,
                      width: 400,
                      height: 100,
                    };
                  })}
                  // source={{
                  //   uri:
                  //     'http://192.168.1.4:4050/src/Storage/Files/News/1613828094461images%20(2).jfif',
                  // }}
                  style={{
                    width: '100%',
                    height: '100%',
                    flex: 1,
                    resizeMode: 'cover',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                    }}>
                    <Text numberOfLines={6} style={styles.text}>
                      {item.title}
                      {'\n'}
                      {'\n'}
                      {item.body}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            ) : (
              <>
                <Text numberOfLines={6} style={styles.noimagetext}>
                  {item.body}
                </Text>
              </>
            )}
            <View
              style={{
                flexDirection: 'row',
                height: 30,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                }}>
                <View style={{width: 30, marginBottom: -20, marginStart: 20}}>
                  <Icons name="thumbs-up" size={15} color="grey" />
                </View>
                <View style={{width: 80}}>
                  <Badge status="primary" value={item?.likes} />
                </View>
              </View>
            </View>
            <ButtonGroup
              onPress={(index) => updateIndex(item, index)}
              buttons={buttons}
              containerStyle={{height: 35, marginBottom: 15}}
            />
          </CardView>
        )}
      />

      <GestureRecognizer
        onSwipe={(direction, state) => onSwipe(direction, state)}
        config={config}>
        <CustomBottomSheet
          isVisible={PostIsVisible}
          color="white"
          UI={
            <SafeAreaView>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginBottom: 50,
                }}>
                <View style={{width: 300, height: 30}}>
                  <Text style={styles.fullnametext}>Create Post</Text>
                </View>
                <View style={{width: 100, height: 30}}>
                  <Button
                    title="Post"
                    type="outline"
                    onPress={() => handleSubmitPostPress()}
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  marginBottom: 50,
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 50,
                    marginTop: 10,
                    marginStart: 5,
                    marginBottom: 5,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginBottom: 50,
                    }}>
                    <View style={{width: 50, height: 30}}>
                      <Image
                        source={{
                          uri: imageUri,
                        }}
                        style={{
                          marginTop: 10,
                          marginStart: 10,
                          width: 40,
                          height: 40,
                          borderRadius: 120 / 2,
                          overflow: 'hidden',
                          borderWidth: 3,
                        }}
                      />
                    </View>
                    <View style={{width: 350, height: 30}}>
                      <Text style={styles.fullnametext}>
                        {users_reducers.full_name}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{width: '100%', height: 1000}}>
                  <TextInput
                    style={{
                      borderWidth: 2,
                      borderColor: '#f7f5f5',
                      padding: 20,
                      fontSize: 32,
                    }}
                    multiline
                    placeholder="What's on you mind"
                    numberOfLines={4}
                    onChangeText={(text) => handleChangeTextPost(text)}
                    value={post}
                  />
                </View>
              </View>
            </SafeAreaView>
          }
        />
      </GestureRecognizer>
      <GestureRecognizer
        onSwipe={(direction, state) => onSwipeComments(direction, state)}
        config={config}>
        <CustomBottomSheet
          isVisible={isVisible}
          color="white"
          UI={
            <SafeAreaView>
              <ScrollView>
                <CardView>
                  <View style={styles.containerNOTIFICATION}>
                    <Text>Comments</Text>
                  </View>
                </CardView>
                {posts_comments.map((Notification) => {
                  return (
                    <CardView key={Notification.posts_comment_pk}>
                      <View style={styles.containercomment}>
                        <View style={styles.contentNOTIFICATION}>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'space-around',
                              marginBottom: 50,
                              height: 100,
                            }}>
                            <View style={{width: 30 + '%', height: 100}}>
                              <Image
                                source={{
                                  uri: `data:image/png;base64,${Notification?.user_pic}`,
                                }}
                                style={{
                                  marginTop: 10,
                                  marginStart: 10,
                                  width: 40,
                                  height: 40,
                                  borderRadius: 120 / 2,
                                  overflow: 'hidden',
                                  borderWidth: 3,
                                }}
                              />
                            </View>
                            <View style={{width: 95 + '%', height: 100}}>
                              <CardView key={Notification.posts_comment_pk}>
                                <Text style={styles.containerNOTIFICATION}>
                                  {Notification?.fullname}
                                  {'\n'}
                                  {Notification?.body}
                                </Text>
                              </CardView>
                            </View>
                          </View>
                        </View>
                      </View>
                    </CardView>
                  );
                })}
              </ScrollView>
              <CardView>
                <View style={styles.containerNOTIFICATION}>
                  <View style={styles.contentNOTIFICATION}>
                    <Text style={styles.nameNOTIFICATION}>Comment</Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginBottom: 50,
                      }}>
                      <View style={{width: 320, height: 40}}>
                        <TextInput
                          style={{borderWidth: 2, borderColor: '#f7f5f5'}}
                          multiline
                          numberOfLines={4}
                          onChangeText={(text) => onCommentChangeText(text)}
                          value={comment}
                        />
                      </View>
                      <View style={{width: 50, height: 50}}>
                        <Button
                          icon={
                            <Icons name="arrow-right" size={20} color="white" />
                          }
                          onPress={() => handleCommentSend()}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </CardView>
            </SafeAreaView>
          }
        />
      </GestureRecognizer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    marginTop: -250,
    width: '100%',
  },
  containerNOTIFICATION: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    maxHeight: 1000,
    alignItems: 'flex-start',
  },
  containercomment: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    height: 100,
    maxHeight: 300,
    alignItems: 'flex-start',
  },
  text: {
    color: 'white',
    fontSize: 14,
    padding: 15,
    textAlign: 'justify',
    backgroundColor: '#000000a0',
  },
  noimagetext: {
    color: 'black',
    fontSize: 14,
    padding: 15,
    textAlign: 'justify',
  },
  fullnametext: {
    color: 'black',
    fontSize: 23,
    padding: 10,
    textAlign: 'justify',
  },
  flatlistcontainer: {
    flex: 1,
    height: 300,
  },
  flatlistitem: {
    marginStart: 30,
    fontSize: 14,
    fontFamily: 'Open-Sans',
    height: 10,
  },
  flatlistitemappointmentno: {
    marginStart: 30,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Open-Sans',
    height: 20,
  },
});

export default MeInfo;
