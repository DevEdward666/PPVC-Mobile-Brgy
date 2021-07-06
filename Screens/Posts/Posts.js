import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  Image,
  View,
  ImageBackground,
  TouchableNativeFeedback,
  BackHandler,
  Text,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DocumentPicker from 'react-native-document-picker';
import Icons from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  ButtonGroup,
  Badge,
  Icon,
  withBadge,
  Card,
} from 'react-native-elements';
import FBGrid from 'react-native-fb-image-grid';
import FBCollage from 'react-native-fb-collage';
import PhotoGrid from 'react-native-thumbnail-grid';
import Spinner from 'react-native-loading-spinner-overlay';
import CardView from 'react-native-rn-cardview';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import wait from '../../Plugins/waitinterval';
import {
  action_get_posts,
  action_get_posts_comments,
  action_set_posts_reactions,
  action_posts_add_comment,
  action_set_posts,
} from '../../Services/Actions/PostsActions';
import CustomBottomSheet from '../../Plugins/CustomBottomSheet';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import CustomFlexBox from '../../Plugins/CustomFlexBox';
import {HelperText} from 'react-native-paper';
import CustomBottomSheetV2 from '../../Plugins/CustomBottomSheetV2';
import UILiked from './Liked';
const UINews = () => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  var IMAGES_PER_ROW = 3;

  const calculatedSize = () => {
    var size = windowWidth / IMAGES_PER_ROW;
    return {width: size, height: size};
  };
  const posts_reducers = useSelector((state) => state.PostsReducers.posts_data);
  const posts_reaction = useSelector(
    (state) => state.PostsReducers.posts_reaction,
  );
  const posts_comments = useSelector(
    (state) => state.PostsReducers.posts_comments,
  );
  const users_reducers = useSelector((state) => state.UserInfoReducers.data);
  const base_url = useSelector((state) => state.PostsReducers.base_url);
  const [offset, setoffset] = useState(5);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedIndex, setseletedIndex] = useState(0);
  const [isVisible, setisVisible] = useState(false);
  const [addpostVisible, setaddpostVisible] = useState(false);
  const [comment, setcomment] = useState('');
  const [posts_id, setposts_id] = useState('');
  const [post, setpost] = useState('');
  const [postResource, setpostResource] = useState([]);
  const [multipleFile, setmultipleFile] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const dispatch = useDispatch();
  const onChangeText = useCallback((text) => {
    setcomment(text);
  });
  // const news_reducers_url = useSelector((state) => state.News_Reducers.url);
  const onRefresh = useCallback(async() => {
    await setRefreshing(true);
    await setoffset((prev)=>prev+2)
    wait(1000).then(() => {
        setRefreshing(false);
      dispatch(action_get_posts(offset));
    });
  }, [dispatch]);
  const gotopostsinfo = useCallback(async (item) => {
    await AsyncStorage.setItem('posts_id', item.posts_pk.toString());
    Actions.postsinfo();
  }, []);
  useEffect(() => {
    let mounted = true;
    const getposts = async() => {
      if(mounted){
        await setRefreshing(true);
        if (posts_reducers.loading) {
          await setRefreshing(false);
          dispatch(action_get_posts(offset));
        }
        dispatch(action_get_posts(offset));
      }

    };
    mounted && getposts();
    return () => {mounted = false};
  }, [dispatch, posts_reducers.loading, spinner,offset]);

  const handleAddPostPress = useCallback(() => {
    setaddpostVisible(true);
  }, []);
  const handleRemoveItem = useCallback((e, i) => {
    setpostResource(postResource.filter((item, index) => index !== i));
    setmultipleFile(multipleFile.filter((item, index) => index !== i));
  });
  const handleSubmitPostPress = useCallback(async () => {
    if (post.length > 0) {
      await dispatch(action_set_posts(post, post, multipleFile));

      await setaddpostVisible(false);
      await dispatch(action_get_posts(offset));
      await setpost('');
      await setmultipleFile([]);
      await setpostResource([]);
    }
  }, [dispatch, post, multipleFile,offset]);
  const handleCommentSend = useCallback(async () => {
    if (comment.length > 0) {
      await dispatch(action_posts_add_comment(posts_id, comment));

      await dispatch(action_get_posts_comments(posts_id));
      await setcomment('');
    }
  }, [dispatch, comment, posts_id]);
  const handleChangeTextPost = useCallback(
    async (text) => {
      await setpost(text);
    },
    [dispatch, post],
  );

  const backAction = () => {
    setisVisible(false);
    setaddpostVisible(false);
    console.log('backing');
    return true;
  };
  const loadmore=useCallback(async()=>{
    let mounted=true
    if(mounted){
    
      await setoffset((prev)=>prev+5)
      await  setRefreshing(true);
    }
  return()=>{mounted=false}
  },[offset])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  // const buttons = [{element: component1}, {element: component2}];
  // const buttonliked = [{element: liked}, {element: component2}];
  const [gestureName, setgestureName] = useState('');
  const onSwipePostComment = useCallback((gestureName, gestureState) => {
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
        setisVisible(false);
        // setgestureName({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        // setgestureName({backgroundColor: 'yellow'});
        break;
    }
  });
  const onSwipeAddPost = useCallback((gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setgestureName({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        // setopen(true);
        break;
      case SWIPE_DOWN:
        setaddpostVisible(false);

        break;
      case SWIPE_LEFT:
        setaddpostVisible(false);
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
  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      for (const res of results) {
        setpostResource((prev) => [...prev, {uri: res.uri}]);
        setmultipleFile((prev) => [...prev, res]);
      }

      // Setting the state to show single file attributes
    } catch (err) {
      setmultipleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const BadgedIcon = withBadge(1)(Icons);
  let imageUri = 'data:image/png;base64,' + users_reducers?.pic;
  return (
    <ImageBackground
    style={{flex: 1}}
    source={require('../../assets/background/bgImage.jpg')}
    resizeMode="cover"
    blurRadius={20}>
      
    <SafeAreaView style={styles.flatlistcontainer}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      <CardView
        style={{marginTop: -5, marginBottom: 30, height: 80}}
        radius={1}>
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            padding: 10,
            marginTop: 10,
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
              <View style={{width: 95 + '%', height: 50, padding: 5}}>
                {/* <TextInput
                  style={{borderWidth: 2, borderColor: '#f7f5f5'}}
                  multiline
                  placeholder="What's on you mind"
                  numberOfLines={4}
                  onPress={() => ()}
                  onChangeText={(text) => handleChangeTextPost(text)}
                  value={post}
                /> */}
                <Button
                  title="What's on your mind?"
                  type="clear"
                  onPress={() => handleAddPostPress()}
                />
              </View>
            </View>
          </View>
        </View>
      </CardView>

      <CustomBottomSheet
        isVisible={addpostVisible}
        color="white"
        UI={
          <GestureRecognizer
            onSwipe={(direction, state) => onSwipeAddPost(direction, state)}
            config={config}>
            <SafeAreaView>
              <View style={styles.containerclose}>
                <TouchableHighlight
                  onPress={() => setaddpostVisible(false)}
                  underlayColor={'white'}>
                  <Icons size={25} name={'close'} />
                </TouchableHighlight>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginBottom: 50,
                }}>
                <View style={{width: 50 + '%', height: 30}}>
                  <Text style={styles.fullnametext}>Create Post</Text>
                </View>
                <View style={{width: 40 + '%', height: 30}}>
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
                    <View style={{width: 20 + '%', height: 30}}>
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
                    <View
                      style={{width: screenWidth - 20, height: screenHeight}}>
                      <Text style={styles.fullnametext}>
                        {users_reducers.full_name}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{width: '100%', height: 620, maxHeight: 5000}}>
                  <TextInput
                    style={{
                      borderWidth: 2,
                      borderColor: '#f7f5f5',
                      padding: 20,
                      fontSize: 32,
                    }}
                    multiline
                    placeholder="What's on your mind"
                    numberOfLines={4}
                    onChangeText={(text) => handleChangeTextPost(text)}
                    value={post}
                  />
                  <View style={{width: '50%', height: 50, padding: 5}}>
                    <Button
                      style={{color: 'black'}}
                      icon={
                        <Icons name="file-image-o" size={15} color="green" />
                      }
                      iconLeft
                      type="outline"
                      title=" Photo"
                      onPress={selectFile}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                    }}>
                    <View
                      style={{
                        width: screenWidth,
                        height: screenHeight,
                      }}>
                      <HelperText
                        type="info"
                        visible={true}
                        padding="none"
                        style={{overflow: 'visible'}}>
                        Long press image to remove & swipe left right to show
                        other image
                      </HelperText>
                      <ScrollView horizontal={true}>
                        {postResource.map((item, index) => (
                          <View
                            style={{
                              flex: 1,
                              width: screenWidth,
                              height: screenHeight,
                              marginTop: screenHeight - 1000,
                              justifyContent: 'center',
                            }}
                            key={index}>
                            <TouchableNativeFeedback
                              onLongPress={() => handleRemoveItem(item, index)}
                              underlayColor="white">
                              <CardView
                                style={styles.avatar}
                                radius={1}
                                backgroundColor={'#ffffff'}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    maxHeight: 500,
                                    alignItems: 'center',
                                  }}>
                                  <ImageBackground
                                    source={{
                                      uri: item.uri,
                                    }}
                                    style={styles.avatar}></ImageBackground>
                                </View>
                              </CardView>
                            </TouchableNativeFeedback>
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </GestureRecognizer>
        }
      />

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
        data={posts_reducers.data}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadmore}
        onEndReachedThreshold={0.1}
        renderItem={({item, index}) => (
          <TouchableHighlight
            onPress={() => gotopostsinfo(item)}
            underlayColor="white">
            <CardView style={{marginTop: 10, marginBottom: 20}} radius={1}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 50,
                  padding: 10,
                  marginTop: 10,
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
                    flexDirection: 'column',
                    height: 300,
                    alignItems: 'center',
                  }}>
                  <View style={{width: '100%', height: screenHeight - 1000}}>
                    <Text numberOfLines={6} style={styles.text}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={{width: '100%', height: screenHeight - 500}}>
                    <ImageBackground
                      source={item.upload_files.map((item) => {
                        return {
                          uri: `${base_url}/${item.file_path}`,
                          width: 400,
                          height: 100,
                        };
                      })}
                      style={{
                        width: '100%',
                        height: '100%',
                        flex: 1,
                        resizeMode: 'cover',
                        justifyContent: 'center',
                      }}></ImageBackground>
                  </View>
                </View>
              ) : (
                <>
                  <Text numberOfLines={6} style={styles.noimagetext}>
                    {item.body}
                  </Text>
                </>
              )}
              <CardView>
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
                    <View
                      style={{
                        width: 30,
                        marginBottom: -20,
                        marginStart: 20,
                      }}>
                      <Icons name="thumbs-up" size={15} color="grey" />
                    </View>
                    <View style={{width: 80}}>
                      {item?.reactions.map((likes, index) => {
                        return (
                          <Badge
                            status="primary"
                            key={index}
                            value={likes?.likes}
                          />
                        );
                      })}
                    </View>
                  </View>
                  <View
                    style={{
                      alignItems: 'stretch',
                      width: screenWidth - 270,
                    }}>
                    <View style={{width: '100%'}}>
                      {item?.totalcomments.map((comments, index) => {
                        return (
                          <Text key={index}>
                            <Text> {comments.comments} </Text>
                            Comments
                          </Text>
                        );
                      })}
                    </View>
                  </View>
                </View>
                <UILiked item={item} />
                {/* {item?.liked[0]?.reaction ? (
                  <ButtonGroup
                    onPress={(index) => updateIndex(item, index)}
                    buttons={buttonliked}
                    containerStyle={{height: 35, marginBottom: 15}}
                  />
                ) : (
                  <ButtonGroup
                    onPress={(index) => updateIndex(item, index)}
                    buttons={buttons}
                    containerStyle={{height: 35, marginBottom: 15}}
                  />
                )} */}
                <ScrollView>
                  {item.comments.map((comments) => {
                    return (
                      <CardView key={comments.posts_comment_pk}>
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
                                    uri: `${base_url}/${comments?.pic}`,
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
                                <CardView key={comments.posts_comment_pk}>
                                  <Text style={styles.containerNOTIFICATION}>
                                    {comments?.fullname}
                                    {'\n'}
                                    {comments?.body}
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
              </CardView>
            </CardView>
          </TouchableHighlight>
        )}
      />
    </SafeAreaView>
 </ImageBackground>
  );
};
const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    height: 500,
    borderColor: 'white',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  plate:{
    flex:1,
    backgroundColor:"rgba(255,255,355,0.5)",
    borderColor:"rgba(255,255,355,0.5)",
    borderWidth:0.1,
    borderRadius:5
},
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
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
  containerclose: {
    paddingRight: 16,
    marginBottom: 10,
    maxHeight: 1000,
    alignItems: 'flex-end',
  },
  containercomment: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    height: 100,
    maxHeight: 1000,
    alignItems: 'flex-start',
  },
  text: {
    color: 'black',
    fontSize: 14,
    padding: 15,
    textAlign: 'justify',
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
    backgroundColor:"rgba(255,255,355,0.5)",
    borderColor:"rgba(255,255,355,0.5)",
    flex: 1,
    paddingTop: 10,
    marginTop:50
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
export default UINews;
