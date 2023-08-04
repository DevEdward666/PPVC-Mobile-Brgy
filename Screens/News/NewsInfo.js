import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  RefreshControl,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import CardView from 'react-native-rn-cardview';
import {Actions} from 'react-native-router-flux';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import BottomSheet from 'reanimated-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import wait from '../../Plugins/waitinterval';
import {
  action_get_news_comments,
  action_get_news_info,
  action_get_news_add_comment,
} from '../../Services/Actions/NewsActions';
import moment from 'moment';
import {Card} from 'react-native-elements';
import BASE_URL from '../../Services/Types/Default_Types';
import CustomBottomSheet from '../../Plugins/CustomBottomSheet';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const UINews = () => {
  const [offset, setoffset] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [news_id, setnews_id] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [visible, setvisible] = useState(false);
  const [carouselItems, setcarouselItems] = useState([]);

  const sheetRef = React.useRef(null);
  const [commentstate, setcommentstate] = useState(0);
  const [heightcontrol, setheightcontrol] = useState(200);
  const dispatch = useDispatch();

  const base_url = useSelector((state) => state.NewsReducers.base_url);
  const news_reducers_info = useSelector((state) => state.NewsReducers.info);
  const news_reducers_comments = useSelector(
    (state) => state.NewsReducers.comments,
  );
  const [entries, setEntries] = useState([]);
  const [comment, setcomment] = useState('');
  const [title, settitle] = useState('');
  const [body, setbody] = useState('');
  const [images, setimages] = useState([]);
  const [count, setcount] = useState(0);

  const [isVisible, setisVisible] = useState(false);
  const ENTRIES1 = news_reducers_info?.data[0]?.upload_files;
  AsyncStorage.getItem('news_id').then(async (item) => {
    await setnews_id(item);
  });
  useEffect(() => {
    let mounted = true;
    const getnewinfo = async () => {
      await dispatch(action_get_news_info(news_id));
      await setSpinner(true);
      if (news_reducers_info?.loading) {
        await setSpinner(false);
        await setEntries(ENTRIES1);
        news_reducers_info?.data[0]?.upload_files.map((i) => {
          setimages((prev) => [
            ...prev,
            {
              uri: `${base_url}/${i.file_path}`,
            },
          ]);
        });
      }
      await setSpinner(false);
    };
    mounted && getnewinfo();
    return () => (mounted = false);
  }, [dispatch, news_id]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };
  console.log(images);

  const renderItem = useCallback(
    ({item, index}, parallaxProps) => {
      return (
        <View style={styles.item}>
          <ParallaxImage
            source={{uri: `${base_url}/${item?.file_path}`}}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.1}
            {...parallaxProps}
          />
          {/* <Text style={styles.title} numberOfLines={2}>
          {item.filename}
        </Text> */}
        </View>
      );
    },
    [base_url],
  );
  const onChangeText = useCallback((text) => {
    setcomment(text);
  }, []);
  const handleCommentSend = useCallback(async () => {
    if (comment !== '') {
      await dispatch(action_get_news_add_comment(news_id, comment));
      await dispatch(action_get_news_comments(news_id));
      await setcommentstate((prev) => prev + 1);
      await setcomment('');
    }
  }, [dispatch, comment, news_id]);
  const handleCloseCommentButton = useCallback(async () => {
    setisVisible(false);
  }, []);
  const handleClickList = useCallback(() => {
    setisVisible(true);
  }, []);

  const onRefresh = useCallback(async () => {
    setSpinner(true);
    console.log(news_id);
    dispatch(action_get_news_info(news_id));
    if (news_reducers_info?.loading) {
      setSpinner(false);
      setEntries(ENTRIES1);
      settitle(news_reducers_info?.data[0]?.title);
      setbody(news_reducers_info?.data[0]?.body);
    }
  }, [dispatch, ENTRIES1, news_id, news_reducers_info]);
  const [gestureName, setgestureName] = useState('');
  const onSwipe = useCallback((gestureName, gestureState) => {
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
  console.log(news_reducers_info?.data);
  return (
    <SafeAreaView style={styles.flatlistcontainer}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ImageView
          images={images}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setvisible(false)}
        />

        <CardView
          style={{marginTop: -5}}
          radius={1}
          backgroundColor={'#ffffff'}>
          <View
            style={{
              flexDirection: 'row',
              height: 300,
              alignItems: 'center',
            }}>
            <View style={styles.container}>
              <TouchableHighlight onPress={() => setvisible(true)}>
                <Carousel
                  ref={carouselRef}
                  sliderWidth={screenWidth}
                  sliderHeight={screenWidth}
                  itemWidth={screenWidth - 60}
                  data={entries}
                  renderItem={renderItem}
                  hasParallaxImages={true}
                  onPress={() => setvisible(true)}
                />
              </TouchableHighlight>
            </View>
          </View>
          <Text style={styles.text}>
            {moment(news_reducers_info.data[0]?.encoded_at).calendar()}
          </Text>
        </CardView>
        <View
          style={{
            flexDirection: 'row',
            height: screenHeight - 400,
            alignItems: 'center',
          }}>
          <Text style={styles.baseText}>
            <Text style={styles.textTitle}>
              {news_reducers_info.data[0]?.title}
            </Text>
            {'\n'}
            {'\n'}
            <Text style={styles.text}>{news_reducers_info.data[0]?.body}</Text>
          </Text>
        </View>
      </ScrollView>
      {/* <Text style={styles.commentlabel}>Comments</Text>
      <FlatList
        style={{
          backgroundColor: '#ffffff',
          marginTop: 10,
          maxHeight: 200,
        }}
        data={news_reducers_comments}
        keyExtractor={(item) => {
          return item?.news_comment_pk.toString();
        }}
        renderItem={(item) => {
          const Notification = item?.item;
          return (
            <TouchableHighlight
              underlayColor="white"
              onPress={() => handleClickList()}>
              <View style={styles.containerNOTIFICATION}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: 50,
                  }}>
                  <View style={{width: 40 + '%', height: 20}}>
                    <Image
                      source={{
                        uri: `data:image/png;base64,${Notification?.user_pic}`,
                      }}
                      style={{
                        marginTop: 10,
                        marginStart: 20,
                        width: 40,
                        height: 40,
                        borderRadius: 120 / 2,
                        overflow: 'hidden',
                        borderWidth: 3,
                      }}
                    />
                  </View>
                  <View style={{width: 95 + '%', height: 20}}>
                    <CardView key={Notification.news_comment_pk}>
                      <Text style={styles.containerNOTIFICATION}>
                        {Notification?.fullname}
                        {'\n'}
                        {Notification?.body}
                      </Text>
                    </CardView>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          );
        }}
      />
      <View
        style={{
          backgroundColor: 'white',
          padding: 25,
        }}>
        <Text style={styles.nameNOTIFICATION}>Comment</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 50,
          }}>
          <View style={{width: 95 + '%', height: 40}}>
            <TextInput
              style={{borderWidth: 2, borderColor: '#f7f5f5'}}
              multiline
              numberOfLines={4}
              onChangeText={(text) => onChangeText(text)}
              value={comment}
            />
          </View>
          <View style={{width: 20 + '%', height: 50}}>
            <Button
              icon={<Icon name="arrow-right" size={20} color="white" />}
              onPress={() => handleCommentSend()}
            />
          </View>
        </View>
      </View> */}
      <GestureRecognizer
        onSwipe={(direction, state) => onSwipe(direction, state)}
        config={config}
        style={{
          flex: 1,
        }}>
        <CustomBottomSheet
          isVisible={isVisible}
          color="white"
          UI={
            <ScrollView>
              <CardView>
                <View style={styles.containerNOTIFICATION}>
                  <Text>Comments</Text>
                </View>
              </CardView>
              {news_reducers_comments.map((Notification) => {
                return (
                  <CardView key={Notification.news_comment_pk}>
                    <View style={styles.containerNOTIFICATION}>
                      <View style={styles.contentNOTIFICATION}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginBottom: 50,
                          }}>
                          <View style={{width: 40 + '%', height: 20}}>
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
                          <View style={{width: 100 + '%', height: 20}}>
                            <CardView key={Notification.news_comment_pk}>
                              <Text style={styles.containerNOTIFICATION}>
                                {Notification?.fullname}
                                {'\n'}
                                {Notification?.body}
                              </Text>
                            </CardView>
                          </View>
                        </View>

                        <Text rkType="primary3 mediumLine"></Text>
                      </View>
                    </View>
                  </CardView>
                );
              })}
            </ScrollView>
          }
          Footer={
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
                        onChangeText={(text) => onChangeText(text)}
                        value={comment}
                      />
                    </View>
                    <View style={{width: 50, height: 50}}>
                      <Button
                        icon={
                          <Icon name="arrow-right" size={20} color="white" />
                        }
                        onPress={() => handleCommentSend()}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </CardView>
          }
        />
      </GestureRecognizer>
    </SafeAreaView>

    // </ImageBackground>
  );
};
const styles = StyleSheet.create({
  containerNOTIFICATION: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  plate: {
    flex: 1,
    backgroundColor: 'rgba(255,255,355,0.5)',
    borderColor: 'rgba(255,255,355,0.5)',
    borderWidth: 0.1,
    borderRadius: 5,
  },
  containerlist: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  text: {
    color: 'black',
    fontSize: 14,
    padding: 15,
    textAlign: 'justify',
    backgroundColor: '#000000a0',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  baseText: {
    textAlign: 'justify',
    padding: 15,
    color: 'black',
  },
  textTitle: {
    fontSize: 24,
    padding: 15,
    color: 'black',
    textAlign: 'left',
  },
  text: {
    fontSize: 14,
    padding: 15,
    textAlign: 'justify',
  },
  flatlistcontainer: {
    backgroundColor: 'rgba(255,255,355,0.5)',
    borderColor: 'rgba(255,255,355,0.5)',
    flex: 1,
    paddingTop: 10,
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

  contentNOTIFICATION: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeaderNOTIFICATION: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  separatorNOTIFICATION: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  imageNOTIFICATION: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  timeNOTIFICATION: {
    fontSize: 11,
    color: '#808080',
  },
  nameNOTIFICATION: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentlabel: {
    fontSize: 16,
    marginStart: 10,
    fontWeight: 'bold',
  },
});
export default UINews;
