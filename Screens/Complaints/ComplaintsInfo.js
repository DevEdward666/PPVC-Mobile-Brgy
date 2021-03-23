import React, {useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableHighlight,
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
} from '../../Services/Actions/ComplaintsActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomBottomSheet from '../../Plugins/CustomBottomSheet';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
const ComplaintsInfo = () => {
  const users_reducers = useSelector((state) => state.UserInfoReducers.data);
  const [complaint_pk, setcomplaint_pk] = useState('');
  const [sendmessage, setsendmessage] = useState('');
  const [isVisible, setisVisible] = useState(false);
  const [sendClicked, setsendClicked] = useState(0);
  let imageUri = 'data:image/png;base64,' + users_reducers.pic;
  const base_url = useSelector((state) => state.NewsReducers.base_url);
  AsyncStorage.getItem('complaint_pk').then(async (item) => {
    if (item == null) {
      Actions.home();
    } else {
      await setcomplaint_pk(item);
      setTimeout(() => {
        dispatch(action_get_complaints_messages(item.toString()));
      }, 1000);
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
    dispatch(action_get_complaints_info(complaint_pk));
    dispatch(action_get_complaints_messages(complaint_pk));
  }, [dispatch, complaint_pk]);

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
  }, [dispatch, sendmessage, complaint_pk]);
  useEffect(() => {
    setTimeout(() => {
      dispatch(action_get_complaints_messages(complaint_pk.toString()));
    }, 1000);

    console.log(complaint_pk);
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
              Date: {complaint_info[0]?.reported_at}
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
              height: 50,
            }}>
            <Text style={styles.Titletext}>
              Subject: {complaint_info[0]?.title}
            </Text>
            <Text style={styles.text}>{complaint_info[0]?.body}</Text>
          </View>
        </View>
        <Divider style={{backgroundColor: 'grey'}} />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Divider style={{backgroundColor: 'grey'}} />
          <View style={{width: '100%', height: 300, marginTop: 100}}>
            <Image
              source={{
                uri: `${base_url}/${complaint_info[0]?.complaint_file[0]?.file_path}`,
              }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </View>
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
                            <Image
                              source={{
                                uri: `data:image/png;base64,${Notification?.user_pic}`,
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
                          </View>
                          <View style={{width: 90 + '%', height: 20}}>
                            <CardView key={Notification.complaint_msg_pk}>
                              <Text style={styles.messagesText}>
                                {Notification?.first_name}
                                {Notification?.middle_name}
                                {Notification?.last_name}
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
              <CardView>
                <View style={styles.containerNOTIFICATION}>
                  <View style={styles.contentNOTIFICATION}>
                    <Text style={styles.messagesText}>Messages</Text>
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
      <FAB style={styles.fab} icon="plus" onPress={() => onFABPress()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  messagesText: {
    padding: 5,
    height: 70,
    maxHeight: 700,
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
