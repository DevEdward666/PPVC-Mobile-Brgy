import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  Image,
  RefreshControl,
  StyleSheet,
  Alert,
  Text,
  TouchableHighlight,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Card} from 'react-native-elements';
import CardView from 'react-native-rn-cardview';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {action_get_userinfo} from '../../Services/Actions/UserInfoActions';
import {action_upadatenewuser} from '../../Services/Actions/ResidentsActions';
import {action_netinfo} from '../../Services/Actions/DefaultActions';
import wait from '../../Plugins/waitinterval';
import SplashScreen from 'react-native-splash-screen';
import {action_get_complaints} from '../../Services/Actions/ComplaintsActions';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
const MeScreen = () => {
  const users_reducers = useSelector((state) => state.UserInfoReducers.data);
  const netinformation = useSelector((state) => state.Default_Reducer.netinfo);
  const new_user = useSelector((state) => state.Default_Reducer.new_user);
  const [username, setUsername] = useState('');
  const [premid, setpremid] = useState('');
  const [fullname, setFullname] = useState('');
  const [tick, settick] = useState(0);
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
      width: '100%',
      height: '100%',
    },
    plate: {
      flex: 1,
      backgroundColor: 'rgba(255,255,355,0.5)',
      borderColor: 'rgba(255,255,355,0.5)',
      borderWidth: 0.1,
      borderRadius: 5,
    },
  });
  const removeValue = async () => {
    try {
      await AsyncStorage.getAllKeys().then((keys) =>
        AsyncStorage.multiRemove(keys),
      );
      await Actions.home();
    } catch (e) {
      AsyncStorage.multiRemove(keys);
    }
  };

  const dispatch = useDispatch();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(200).then(() => {
      dispatch(action_get_userinfo());
      dispatch(action_netinfo());
      setRefreshing(false);
    });
  }, [dispatch, netinformation]);
  const handleYesAction = useCallback(() => {
    dispatch(action_upadatenewuser(users_reducers?.user_pk));
    dispatch(action_get_userinfo());
    Actions.fad();
  }, [dispatch, users_reducers?.user_pk]);
  const handleNoAction = useCallback(() => {
    dispatch(action_upadatenewuser(users_reducers?.user_pk));
    dispatch(action_get_userinfo());
  }, [dispatch, users_reducers?.user_pk]);
  useEffect(() => {
    let mounted = true;
    const checknew_user = async () => {
      if (mounted) {
        if (new_user) {
          Alert.alert(
            'Famaily Assesment Data',
            'Are you the head of the family?',
            [
              {
                text: 'Yes',
                onPress: () => handleYesAction(),
                style: 'cancel',
              },
              {text: 'No', onPress: () => handleNoAction()},
            ],
          );
        }
      }
    };
    mounted && checknew_user();
    return () => {
      mounted = false;
    };
  }, []);

  const gotocomplaints = useCallback(() => {
    Actions.complaints();
  }, []);
  const gotonews = useCallback(() => {
    Actions.newsfeed();
  }, []);
  const gotoposts = useCallback(() => {
    Actions.posts();
  }, []);
  const gotobrgy = useCallback(() => {
    Actions.officials();
  }, []);
  const gotofad = useCallback(() => {
    console.log(users_reducers?.new_user);
    if (
      users_reducers?.new_user !== 'true' &&
      users_reducers?.ulo_pamilya !== null
    ) {
      Actions.fad();
    } else if (
      users_reducers?.new_user === 'false' &&
      users_reducers?.ulo_pamilya === null
    ) {
      Alert.alert(
        'Famaily Assesment Data',
        'Your are not the head of the family',
      );
    }
  }, [users_reducers?.new_user, users_reducers?.ulo_pamilya]);
  const gotosettings = useCallback(() => {
    Actions.settings();
  }, []);
  let imageUri = 'data:image/png;base64,' + users_reducers?.pic;
  const gotoinfo = useCallback(() => {
    Actions.profile();
  }, []);
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  useEffect(() => {
    let mounted = true;
    const getprem_image = async () => {
      if (mounted) {
        if (users_reducers?.user_pk !== '') {
          SplashScreen.hide();
        }
      }
    };
    mounted && getprem_image();
    return () => {
      mounted = false;
    };
  }, [users_reducers]);
  return (
    <ScrollView
      style={{height: screenHeight}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/background/bgImage.jpg')}
        resizeMode="stretch"
        blurRadius={20}> */}
      {/* <Card containerStyle={styles.plate}> */}
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'column',
            height: screenHeight,

            padding: 15,
          }}>
          <TouchableHighlight
            underlayColor="#1C00ff00"
            onPress={() => gotoinfo()}>
            <CardView radius={15} backgroundColor={'#ffffff'} elevation={25}>
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
                    {users_reducers.last_name}
                    {','}
                    {users_reducers.first_name}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'justify',
                      fontSize: 16,
                      textTransform: 'capitalize',
                    }}>
                    {users_reducers.user_type}
                  </Text>
                </View>
              </View>
            </CardView>
          </TouchableHighlight>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
              <TouchableHighlight
                onPress={() => gotonews()}
                underlayColor="white">
                <CardView
                  radius={15}
                  backgroundColor={'#ffffff'}
                  elevation={25}>
                  <View
                    style={{
                      flexDirection: 'column',
                      height: 100,
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
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
                        source={require('../../assets/icons/news.png')}
                      />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginBottom: 10,
                          fontSize: 12,
                          alignContent: 'center',
                        }}>
                        News
                      </Text>
                    </View>
                  </View>
                </CardView>
              </TouchableHighlight>
            </View>

            <View style={{width: '50%'}}>
              <TouchableHighlight
                onPress={() => gotoposts()}
                underlayColor="white">
                <CardView
                  radius={15}
                  backgroundColor={'#ffffff'}
                  elevation={25}>
                  <View
                    style={{
                      flexDirection: 'column',
                      height: 100,
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
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
                        source={require('../../assets/icons/logs.jpg')}
                      />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginBottom: 10,
                          fontSize: 12,
                          alignContent: 'center',
                        }}>
                        Posts
                      </Text>
                    </View>
                  </View>
                </CardView>
              </TouchableHighlight>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
              <TouchableHighlight
                onPress={() => gotocomplaints()}
                underlayColor="white">
                <CardView
                  radius={15}
                  backgroundColor={'#ffffff'}
                  elevation={25}>
                  <View
                    style={{
                      flexDirection: 'column',
                      height: 100,
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
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
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginBottom: 10,
                          fontSize: 12,
                          alignContent: 'center',
                        }}>
                        Complaints
                      </Text>
                    </View>
                  </View>
                </CardView>
              </TouchableHighlight>
            </View>

            <View style={{width: '50%'}}>
              <TouchableHighlight
                onPress={() => gotofad()}
                underlayColor="white">
                <CardView
                  radius={15}
                  backgroundColor={'#ffffff'}
                  elevation={25}>
                  <View
                    style={{
                      flexDirection: 'column',
                      height: 100,
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
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
                        source={require('../../assets/icons/ic_admission_prem-playstore.png')}
                      />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginBottom: 10,
                          fontSize: 12,
                          alignContent: 'center',
                        }}>
                        Family Assesment Data
                      </Text>
                    </View>
                  </View>
                </CardView>
              </TouchableHighlight>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
              <TouchableHighlight
                onPress={() => gotobrgy()}
                underlayColor="white">
                <CardView
                  radius={15}
                  backgroundColor={'#ffffff'}
                  elevation={25}>
                  <View
                    style={{
                      flexDirection: 'column',
                      height: 100,
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
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
                        source={require('../../assets/icons/officials.png')}
                      />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginBottom: 10,
                          fontSize: 12,
                          alignContent: 'center',
                        }}>
                        Brgy. Officials
                      </Text>
                    </View>
                  </View>
                </CardView>
              </TouchableHighlight>
            </View>

            <View style={{width: '50%'}}>
              <TouchableHighlight
                onPress={() => gotosettings()}
                underlayColor="white">
                <CardView
                  radius={15}
                  backgroundColor={'#ffffff'}
                  elevation={25}>
                  <View
                    style={{
                      flexDirection: 'column',
                      height: 100,
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
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
                        source={require('../../assets/icons/settings.webp')}
                      />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginBottom: 10,
                          fontSize: 12,
                          alignContent: 'center',
                        }}>
                        Settings
                      </Text>
                    </View>
                  </View>
                </CardView>
              </TouchableHighlight>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
              <TouchableHighlight
                onPress={() => removeValue()}
                underlayColor="white">
                <CardView
                  radius={15}
                  backgroundColor={'#ffffff'}
                  elevation={25}>
                  <View
                    style={{
                      flexDirection: 'column',
                      height: 100,
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
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
                        source={require('../../assets/icons/ic_logout_prem-playstore.png')}
                      />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginBottom: 10,
                          fontSize: 12,
                          alignContent: 'center',
                        }}>
                        Logout
                      </Text>
                    </View>
                  </View>
                </CardView>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
      {/* </Card> */}
      {/* </ImageBackground> */}
    </ScrollView>
  );
};

MeScreen.propTypes = {};

export default MeScreen;
