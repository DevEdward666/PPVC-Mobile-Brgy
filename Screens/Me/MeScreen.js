import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import CardView from 'react-native-rn-cardview';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {action_get_userinfo} from '../../Services/Actions/UserInfoActions';
import wait from '../../Plugins/waitinterval';
import {action_get_complaints} from '../../Services/Actions/ComplaintsActions';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
const MeScreen = () => {
  const users_reducers = useSelector((state) => state.UserInfoReducers.data);
  const [username, setUsername] = useState('');
  const [premid, setpremid] = useState('');
  const [fullname, setFullname] = useState('');
  const [loading, setLoading] = useState(1);
  const [value, setValue] = useState(false);
  const mountedRef = useRef();
  const [refreshing, setRefreshing] = useState(false);

  //   AsyncStorage.getItem('tokenizer').then((item) => {
  //     if (item == null) {
  //       Actions.home();
  //     }
  //   });
  //   AsyncStorage.getItem('username').then((item) => {
  //     if (item == null) {
  //       Actions.home();
  //     }
  //     setUsername(item);
  //     setValue(false);
  //   });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
    },
  });
  const removeValue = async () => {
    try {
      await AsyncStorage.getAllKeys().then((keys) =>
        AsyncStorage.multiRemove(keys),
      );
      await Actions.home();
    } catch (e) {
      // remove error
    }
  };

  const dispatch = useDispatch();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(200).then(() => {
      dispatch(action_get_userinfo());
      setRefreshing(false);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(action_get_userinfo());
  }, [dispatch]);
  const gotocomplaints = useCallback(() => {
    Actions.complaints();
  }, []);
  let imageUri = 'data:image/png;base64,' + users_reducers.pic;
  const gotoinfo = useCallback(() => {
    Actions.profile();
  }, []);
  return (
    <ScrollView
      style={{backgroundScrollViewColor: 'white'}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        {/* <Appbar.Header style={{backgroundColor: '#00a15b'}}>
        <Appbar.Content title="Premiere" />
      </Appbar.Header> */}
        <View>
          <View style={{flexDirection: 'column'}}>
            <TouchableHighlight
              underlayColor="#1C00ff00"
              onPress={() => gotoinfo()}>
              <CardView radius={1} backgroundColor={'#ffffff'}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '30%', height: 100, margin: 5}}>
                    <Image
                      style={{
                        marginTop: 10,
                        marginStart: 10,
                        width: 80,
                        height: 80,
                        borderRadius: 120 / 2,
                        overflow: 'hidden',
                        borderWidth: 3,
                      }}
                      source={{uri: imageUri, scale: 1}}
                    />
                  </View>
                  <View
                    style={{
                      width: '60%',
                      height: 100,
                      justifyContent: 'center',
                    }}>
                    <Text style={{textAlign: 'justify', fontSize: 22}}>
                      {users_reducers.full_name}
                    </Text>
                  </View>
                </View>
              </CardView>
            </TouchableHighlight>
            <TouchableHighlight
              style={{marginTop: 50}}
              onPress={() => gotocomplaints()}
              underlayColor="white">
              <CardView radius={1} backgroundColor={'#ffffff'}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 70,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '80%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'left',
                        marginStart: 10,
                        fontSize: 14,
                        alignContent: 'center',
                      }}>
                      Complaints
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '10%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{
                        height: 50,
                        width: '100%',
                        resizeMode: 'center',
                        alignContent: 'flex-start',
                      }}
                      source={require('../../assets/icons/complaints.png')}
                    />
                  </View>
                </View>
              </CardView>
            </TouchableHighlight>
            <TouchableHighlight
              style={{marginTop: 50}}
              onPress={() => removeValue()}
              underlayColor="white">
              <CardView radius={10} backgroundColor={'#ffffff'}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 70,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '80%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'left',
                        marginStart: 10,
                        fontSize: 14,
                        alignContent: 'center',
                      }}>
                      Logout
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '10%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{
                        height: 50,
                        width: '100%',
                        resizeMode: 'center',
                        alignContent: 'flex-start',
                      }}
                      source={require('../../assets/icons/logout.png')}
                    />
                  </View>
                </View>
              </CardView>
            </TouchableHighlight>

            <View style={{flexDirection: 'row', height: 50}}>
              <View
                style={{width: '100%', height: 50, justifyContent: 'center'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginStart: 10,
                    fontSize: 14,
                    justifyContent: 'center',
                    fontWeight: 'bold',
                  }}>
                  {/* Powered by TUO @ 2020 */}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

MeScreen.propTypes = {};

export default MeScreen;
