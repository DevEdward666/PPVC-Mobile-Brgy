import React, {useEffect, useState, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Dimensions,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';
import {FAB} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import CardView from 'react-native-rn-cardview';
import {Divider, Button} from 'react-native-elements';
import {
  action_get_complaints_info,
  action_get_complaints_messages,
  action_set_complaints_messages,
  action_notify,
} from '../../Services/Actions/ComplaintsActions';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomBottomSheet from '../../Plugins/CustomBottomSheet';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {ImageBackground} from 'react-native';
import io from 'socket.io-client';
const ComplaintsInfo = () => {
  const users_reducers = useSelector((state) => state.UserInfoReducers.data);

  const [complaint_pk, setcomplaint_pk] = useState('');
  const [sendmessage, setsendmessage] = useState('');
  const [messages, getmessages] = useState('');
  const [isVisible, setisVisible] = useState(false);
  const [sendClicked, setsendClicked] = useState(0);
  const [token, settoken] = useState('');
  const [uri, seturi] = useState('');

  const [reload_messages, set_reload_messages] = useState(0);
  let imageUri = 'data:image/png;base64,' + users_reducers.pic;
  const base_url = useSelector((state) => state.NewsReducers.base_url);
  const socketRef = useRef();
  AsyncStorage.getItem('complaint_pk').then(async (item) => {
    if (item == null) {
      Actions.home();
    } else {
      await setcomplaint_pk(item);
    }
  });
  AsyncStorage.getItem('tokenizer').then(async (item) => {
    if (item == null) {
      Actions.home();
    } else {
      await settoken(item);
    }
  });
  const dispatch = useDispatch();
  const complaint_info = useSelector(
    (state) => state.ComplaintsReducers.data_info,
  );
  const complaint_messages = useSelector(
    (state) => state.ComplaintsReducers.data_messages,
  );
  useEffect(() => {
    let mounted = true;

    const socketsio = () => {
      socketRef.current = io(`${base_url}/socket/complaint/chat`, {
        query: {
          token: token,
        },
      });

      socketRef.current.on('connected', (data) => {
        console.log('this =>' + data);
      });

      socketRef.current.emit('joinRoom', complaint_pk);

      socketRef.current.on('allMessage', () => {
        set_reload_messages((prev) => prev + 1);
        dispatch(
          action_notify([
            {
              title: 'Message',
              message: 'New Message',
              notify: true,
            },
          ]),
        );
        setTimeout(() => {
          dispatch(
            action_notify([
              {
                title: 'Message',
                message: 'New Message',
                notify: false,
              },
            ]),
          );
        }, 500);
      });

      socketRef.current.on('failedMessage', (error) => {
        console.log(error);
      });

      return () => {
        socketRef?.current?.disconnect();
      };
    };

    mounted && socketsio();
    return () => (mounted = false);
  }, [complaint_pk, token, dispatch, sendmessage]);

  useEffect(() => {
    let mounted = true;

    const getcomplintsinfo = () => {
      dispatch(action_get_complaints_info(complaint_pk));
      dispatch(action_get_complaints_messages(complaint_pk));
    };

    mounted && getcomplintsinfo();
    return () => (mounted = false);
  }, [dispatch, complaint_pk, reload_messages]);

  const onChangeMessageText = useCallback((text) => {
    setsendmessage(text);
  }, []);

  const onFABPress = useCallback(() => {
    setisVisible(true);
  }, []);
  const handleCloseCommentButton = useCallback(() => {
    setisVisible(false);
  }, []);

  const handleMessageSend = useCallback(async () => {
    await setsendmessage('');
    await dispatch(action_set_complaints_messages(sendmessage, complaint_pk));
    await dispatch(action_get_complaints_messages(complaint_pk));
    await setsendClicked((prev) => prev + 1);
    socketRef.current.emit('sendMessage', complaint_pk);
  }, [dispatch, sendmessage, complaint_pk]);
  useEffect(() => {
    let mounted = true;

    const getcomplaintsmessages = () => {
      setTimeout(() => {
        dispatch(action_get_complaints_messages(complaint_pk.toString()));
      }, 1000);
    };

    mounted && getcomplaintsmessages();
    return () => (mounted = false);
  }, [dispatch, sendClicked, complaint_pk]);

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
    directionalOffsetThreshold: 80,
  };
  return (
    <SafeAreaView style={styles.safeareaviewcontainer}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              width: '20%',
              height: 50,
            }}>
            <Image
              source={{uri: imageUri, scale: 1}}
              style={{
                marginTop: 10,
                marginStart: 10,
                width: 50,
                height: 50,
                borderRadius: 150 / 2,
                overflow: 'hidden',
                borderWidth: 3,
              }}
            />
          </View>
          <View
            style={{
              width: '50%',
              height: 50,
              marginLeft: -20,
            }}>
            <Text style={styles.Titletext}>{users_reducers.full_name}</Text>
          </View>
          <View
            style={{
              width: '50%',
              height: 50,
              marginLeft: -40,
            }}>
            <Text style={styles.texttime}>
              Date: {complaint_info?.reported_at}
            </Text>
          </View>
        </View>
        <Divider style={{marginTop: 20, backgroundColor: 'grey'}} />
        <View
          style={{
            marginTop: 20,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
          }}>
          <View
            style={{
              width: '100%',
              height: 100,
              maxHeight: 1000,
            }}>
            <Text style={styles.Titletext}>
              Subject: {complaint_info?.title}
            </Text>
            <Text style={styles.text}>{complaint_info?.body}</Text>
          </View>
        </View>
        <Divider style={{backgroundColor: 'grey'}} />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Divider style={{backgroundColor: 'grey'}} />

          {complaint_info?.complaint_file?.map((item, index) => (
            <View style={{width: 100 + '%'}} key={index}>
              <TouchableNativeFeedback key={index} underlayColor="white">
                <CardView
                  style={styles.avatar}
                  radius={1}
                  backgroundColor={'#ffffff'}>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 500,
                      maxHeight: 2000,
                      alignItems: 'center',
                    }}>
                    <ImageBackground
                      source={{
                        uri: `${base_url}/${item?.file_path}`,
                      }}
                      style={styles.avatar}
                    />
                  </View>
                </CardView>
              </TouchableNativeFeedback>
            </View>
          ))}
        </View>
      </ScrollView>
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
                  <View style={styles.contentNOTIFICATION}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginBottom: 10,
                      }}></View>
                  </View>
                </View>
              </CardView>
              {complaint_messages.map((Notification) => {
                console.log(Notification?.user?.pic);

                return (
                  <CardView key={Notification.complaint_msg_pk}>
                    <View style={styles.containerNOTIFICATION}>
                      <View style={styles.contentNOTIFICATION}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginBottom: 50,
                          }}>
                          <View style={{width: 20 + '%', height: 20}}>
                            {Notification?.user?.pic ? (
                              <Image
                                source={{
                                  uri: `data:image/png;base64,${Notification?.user?.pic}`,
                                }}
                                style={{
                                  marginTop: 10,
                                  marginStart: 10,
                                  width: 50,
                                  height: 50,
                                  borderRadius: 120 / 2,
                                  overflow: 'hidden',
                                  borderWidth: 3,
                                }}
                              />
                            ) : (
                              <Image
                                source={require('../../assets/icons/applogo.jpg')}
                                style={{
                                  marginTop: 10,
                                  marginStart: 10,
                                  width: 50,
                                  height: 50,
                                  borderRadius: 120 / 2,
                                  overflow: 'hidden',
                                  borderWidth: 3,
                                }}
                              />
                            )}
                          </View>
                          <View
                            style={{
                              width: screenWidth - 50,
                              maxheight: screenHeight,
                            }}>
                            <Text style={{textAlign: 'justify'}}>
                              {'\n'}
                              {Notification?.body}
                            </Text>
                          </View>
                        </View>

                        <Text rkType="primary3 mediumLine"></Text>
                      </View>
                    </View>
                  </CardView>
                );
              })}
              <CardView>
                <View style={styles.containerNOTIFICATION}>
                  <View style={styles.contentNOTIFICATION}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginBottom: 50,
                      }}>
                      <View style={{width: 320, height: 40}}>
                        <TextInput
                          style={{
                            borderWidth: 2,
                            borderColor: '#f7f5f5',
                          }}
                          multiline
                          placeholder="Type Message Here"
                          numberOfLines={4}
                          onChangeText={(text) => onChangeMessageText(text)}
                          value={sendmessage}
                        />
                      </View>
                      <View style={{width: 50, height: 50}}>
                        <Button
                          icon={
                            <Icon name="arrow-right" size={20} color="white" />
                          }
                          onPress={() => handleMessageSend()}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </CardView>
            </ScrollView>
          }
        />
      </GestureRecognizer>
      <FAB style={styles.fab} icon="comment" onPress={() => onFABPress()} />
    </SafeAreaView>
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
  safeareaviewcontainer: {
    flex: 1,
    paddingTop: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 8,
    right: 16,
    backgroundColor: '#a0c2fa',
  },

  messagesCard: {
    borderRadius: 20,
  },
  HeadmessagesText: {
    padding: 5,
    marginStart: 20,
    marginTop: 20,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    width: '100%',
  },

  text: {
    height: 100,
    maxHeight: 1000,
    color: 'black',
    fontSize: 14,
    marginTop: 10,
    marginStart: 25,
  },
  texttime: {
    color: 'black',
    fontSize: 12,
    marginTop: 50,
  },
  HeaderText: {
    color: 'black',
    fontSize: 24,
    padding: 15,
    textAlign: 'justify',
  },
  Titletext: {
    color: 'black',
    fontSize: 18,
    padding: 15,
    textAlign: 'justify',
  },
  flatlistcontainer: {
    backgroundColor: '#fafafa',
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
});

export default ComplaintsInfo;
