import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  PermissionsAndroid,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Button, Divider, Icon, Input} from 'react-native-elements';
import FbGrid from 'react-native-fb-image-grid';
import Spinner from 'react-native-loading-spinner-overlay';
import {FAB} from 'react-native-paper';
import CardView from 'react-native-rn-cardview';
import {Actions} from 'react-native-router-flux';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Icons from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import CustomBottomSheet from '../../../Plugins/CustomBottomSheet';
import wait from '../../../Plugins/waitinterval';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {
  action_get_complaints,
  action_get_complaint_id,
  action_insert_complaints,
} from '../../../Services/Actions/ComplaintsActions';
import CustomFlexBox from '../../../Plugins/CustomFlexBox';
import {ImageBackground} from 'react-native';
import {Card} from 'react-native-elements';
import styles from './style';
export async function requestStoragePermission() {
  if (Platform.OS !== 'android') return true;

  const pm1 = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  );
  const pm2 = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  );

  if (pm1 && pm2) return true;

  const userResponse = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  ]);

  if (
    userResponse['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
    userResponse['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
  ) {
    return true;
  } else {
    return false;
  }
}
const Complaints = () => {
  const complaintslist = useSelector((state) => state.ComplaintsReducers.data);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const users_reducers = useSelector((state) => state.UserInfoReducers.data);
  const [isVisible, setIsVisible] = useState(false);
  const [subjecttext, setsubjecttext] = useState('');
  const [complaintmessage, setcomplaintmessage] = useState('');
  const [overlayopen, setoverlayopen] = useState(false);
  const [complaintResource, setcomplaintResource] = useState([]);
  const [complaintsimagepath, setcomplaintsimagepath] = useState(null);
  const [singleFile, setSingleFile] = useState([]);
  const [overlaymessage, setoverlaymessage] = useState('');
  const [reported_by, setreported_by] = useState('');
  const [complaintlists, setcomplaintlist] = useState([...complaintslist]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
      dispatch(action_get_complaints(users_reducers?.user_pk));
    });
  }, [dispatch, users_reducers?.user_pk]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (complaintslist.length > 0) {
        complaintlists.sort((obj1, obj2) => {
          return obj2.complaint_pk - obj1.complaint_pk;
        });
        setcomplaintlist([...complaintlists]);
      }
    }

    return () => {
      mounted = false;
    };
  }, [complaintslist]);
  const gotocomplaints = useCallback(
    async (item) => {
      dispatch(action_get_complaint_id(item?.complaint_pk.toString()));
      await AsyncStorage.setItem('complaint_pk', item?.complaint_pk.toString());
      wait(200).then(() => {
        Actions.complaintsinfo();
      });
    },
    [dispatch],
  );
  const handleFloatingIcon = useCallback((value) => {
    setIsVisible(true);
  });
  const handleSubject = useCallback((text) => {
    setsubjecttext(text);
  });
  const handleComplaintmessage = useCallback((text) => {
    setcomplaintmessage(text);
  });
  const handleSendButton = useCallback(async () => {
    if (complaintmessage === '' || subjecttext === '') {
      // setoverlayopen(true);
      alert('Please Fill all fields');
    } else {
      dispatch(
        action_insert_complaints(subjecttext, complaintmessage, singleFile),
      );
      wait(1000).then(() => {
        dispatch(action_get_complaints(users_reducers?.user_pk));
      });
      setIsVisible(false);
      alert('Complaint Successfully Send');
    }
  }, [
    overlayopen,
    subjecttext,
    complaintmessage,
    dispatch,
    users_reducers?.user_pk,
    singleFile,
  ]);
  const handleCancelButton = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleRemoveItem = useCallback((e, i) => {
    setcomplaintResource(
      complaintResource.filter((item, index) => index !== i),
    );
  });
  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      for (const res of results) {
        setSingleFile((prev) => [...prev, res]);
        setcomplaintResource((prev) => [...prev, {uri: res.uri}]);
      }
      // Setting the state to show single file attributes
    } catch (err) {
      setSingleFile(null);
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
  const [gestureName, setgestureName] = useState('');

  const onSwipe = useCallback((gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setgestureName({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        // setopen(true);
        break;
      case SWIPE_DOWN:
        setIsVisible(false);

        break;
      case SWIPE_LEFT:
        setIsVisible(false);
        // setgestureName({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        setIsVisible(false);
        // setgestureName({backgroundColor: 'yellow'});
        break;
    }
  });
  const config = {
    velocityThreshold: 0.5,
    directionalOffsetThreshold: 80,
  };

  return (
    <SafeAreaView style={styles.flatlistcontainer}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{marginBottom: 50}}
        data={complaintslist}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
        }}
        renderItem={({item, index}) => (
          <TouchableHighlight
            onPress={() => gotocomplaints(item)}
            underlayColor="white">
            <CardView radius={15}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 20,
                    padding: 5,
                  }}>
                  <Text numberOfLines={1} style={styles.Titletext}>
                    Subject: {item?.title}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 60,
                    padding: 5,
                  }}>
                  <Text numberOfLines={1} style={styles.text}>
                    Body: {item?.body}
                  </Text>
                  <Text numberOfLines={1} style={styles.reportedAt}>
                    {item?.reported_at}
                  </Text>
                </View>
              </View>

              {/* <View
                style={{
                  flexDirection: 'row',

                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <View
                  style={{
                    width: 150,
                    height: 100,
                  }}>
                  <Text style={styles.text}>
                    {item?.SUBJECT} {item?.body}{' '}
                  </Text>
                </View>
                <View
                  style={{
                    width: 200,
                    height: 100,
                  }}>
                  <Text numberOfLines={1} style={styles.text}></Text>
                </View>
              </View> */}
            </CardView>
          </TouchableHighlight>
        )}
      />
      <GestureRecognizer
        onSwipe={(direction, state) => onSwipe(direction, state)}
        config={config}
        style={{
          flex: 1,
        }}>
        <CustomBottomSheet
          isVisible={isVisible}
          color="rgba(0.5, 0.25, 0, 0.2)"
          UI={
            <SafeAreaView style={{flex: 1}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginBottom: 50,
                }}>
                <View
                  style={{
                    width: '20%',
                    height: 50,
                  }}>
                  <Icon
                    raised
                    name="times"
                    type="font-awesome"
                    color="#f50"
                    onPress={() => handleCancelButton()}
                  />
                </View>
                <View
                  style={{
                    width: '20%',
                    height: 50,
                  }}>
                  <Icon
                    raised
                    name="paper-plane"
                    type="font-awesome"
                    color="#00aced"
                    onPress={() => handleSendButton()}
                  />
                </View>

                <Divider style={{marginTop: 20, backgroundColor: 'grey'}} />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                <View
                  style={{
                    width: '100%',
                  }}>
                  <Input
                    placeholder="Subject"
                    onChangeText={(value) => handleSubject(value)}
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}>
                <View
                  style={{
                    width: '100%',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white)',
                    }}>
                    <Input
                      placeholder="Message"
                      multiline
                      numberOfLines={5}
                      onChangeText={(value) => handleComplaintmessage(value)}
                    />
                  </View>
                </View>
                <View style={{width: '30%', height: 30, padding: 5}}>
                  <Button
                    style={{color: 'black'}}
                    icon={<Icons name="file-image-o" size={15} color="green" />}
                    iconLeft
                    type="outline"
                    title=" Photo"
                    onPress={selectFile}
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 450,
                    maxHeight: 10000,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white)',
                    }}>
                    <Text style={{textAlign: 'center', padding: 10}}>
                      Attached Image
                    </Text>
                  </View>
                  <ScrollView>
                    <CustomFlexBox
                      label="flexDirection"
                      selectedValue={'column'}>
                      {complaintResource.map((item, index) => (
                        <View style={{width: 100 + '%'}} key={index}>
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
                                  height: 500,
                                  maxHeight: 2000,
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
                    </CustomFlexBox>
                  </ScrollView>
                </View>
              </View>
            </SafeAreaView>
          }
        />
      </GestureRecognizer>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => handleFloatingIcon()}
      />
    </SafeAreaView>

    // </ImageBackground>
  );
};

export default Complaints;
