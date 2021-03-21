import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import CardView from 'react-native-rn-cardview';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import wait from '../../Plugins/waitinterval';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {FloatingAction} from 'react-native-floating-action';
import {
  action_get_complaints,
  action_insert_complaints,
} from '../../Services/Actions/ComplaintsActions';
import {BottomSheet} from 'react-native-elements/dist/bottomSheet/BottomSheet';

import {Input, Button} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import CustomOverLay from '../../Plugins/CustomOverLay';
import {Overlay, Icon} from 'react-native-elements';
import {Divider} from 'react-native-elements';
import CustomBottomSheet from '../../Plugins/CustomBottomSheet';
import {FAB} from 'react-native-paper';
const complaints = () => {
  const complaintslist = useSelector((state) => state.ComplaintsReducers.data);
  const users_reducers = useSelector((state) => state.UserInfoReducers.data);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [subjecttext, setsubjecttext] = useState('');
  const [complaintmessage, setcomplaintmessage] = useState('');
  const [overlayopen, setoverlayopen] = useState(false);

  const [overlaymessage, setoverlaymessage] = useState('');
  const [reported_by, setreported_by] = useState('');
  AsyncStorage.getItem('user_id').then((item) => {
    if (item == null) {
      Actions.home();
    } else {
      setreported_by(item);
    }
    console.log(item);
  });
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
      dispatch(action_get_complaints(reported_by));
    });
  }, [dispatch, reported_by]);
  useEffect(() => {
    dispatch(action_get_complaints(reported_by));
  }, [dispatch, reported_by]);
  const gotocomplaints = useCallback((item) => {
    Actions.complaintsinfo();
    AsyncStorage.setItem('complaint_pk', item.complaint_pk.toString());
  });
  const handleFloatingIcon = useCallback((value) => {
    setIsVisible(true);
  });
  const handleSubject = useCallback((text) => {
    setsubjecttext(text);
  });
  const handleComplaintmessage = useCallback((text) => {
    setcomplaintmessage(text);
  });
  const handleSendButton = useCallback(() => {
    if (complaintmessage === '' || subjecttext === '') {
      // setoverlayopen(true);
      alert('Please Fill all fields');
    } else {
      dispatch(action_insert_complaints(subjecttext, complaintmessage));
      wait(300).then(() => {
        dispatch(action_get_complaints(reported_by));
      });
      setIsVisible(false);
    }
  }, [overlayopen, subjecttext, complaintmessage, dispatch, reported_by]);
  const handleCancelButton = useCallback(() => {
    setIsVisible(false);
  }, []);
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
        // setgestureName({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
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
      {/* <CustomOverLay overlayvisible={overlayopen} message={overlaymessage} /> */}
      <Spinner visible={spinner} textContent={'Fetching Data...'} />

      <Text style={styles.HeaderText}>Complaints</Text>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
        data={complaintslist}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.1}
        renderItem={({item, index}) => (
          <TouchableHighlight
            onPress={() => gotocomplaints(item)}
            underlayColor="white">
            <CardView style={{marginTop: -5}} radius={1}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: '30%',
                    height: 50,
                  }}>
                  <Text numberOfLines={1} style={styles.Titletext}>
                    {item?.SUBJECT}
                  </Text>
                </View>
                <View
                  style={{
                    width: '70%',
                    height: 50,
                  }}>
                  <Text numberOfLines={1} style={styles.text}>
                    {item?.body}
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
            <SafeAreaView style={styles.flatlistcontainer}>
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
                    height: 50,
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
                    height: 300,
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  fab: {
    position: 'absolute',
    bottom: 8,
    right: 16,
    backgroundColor: '#a0c2fa',
  },
  text: {
    color: 'black',
    fontSize: 14,
    padding: 15,
  },
  HeaderText: {
    color: 'black',
    fontSize: 24,
    padding: 15,
    textAlign: 'justify',
  },
  Titletext: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
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
export default complaints;
