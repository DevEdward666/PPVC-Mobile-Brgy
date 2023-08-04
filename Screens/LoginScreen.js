import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useState} from 'react';
import {Button} from 'react-native-elements';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import {Input} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {action_Login_user} from '../Services/Actions/LoginAction';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-paper';
import {Card} from 'react-native-elements';
import {TouchableNativeFeedback} from 'react-native';
const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const handleSubmit = useCallback(() => {
    if (username.trim() === '' || password.trim() === '') {
      alert('username/password is empty');
    } else {
      dispatch(action_Login_user(username.trim(), password));
    }
  }, [dispatch, username, password]);
  const goToSignup = useCallback(() => {
    Actions.signup();
  });
  const gotoreset = useCallback(() => {
    Actions.resetpassword();
  });
  AsyncStorage.getItem('tokenizer').then((item) => {
    if (item !== null) {
      Actions.index();
    }
  });

  return (
    <SafeAreaView style={styles.plate}>
      <Image
        source={require('../assets/icons/applogo.jpg')}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.textTitle}>Brgy. 37-D Davao City</Text>
      <Text style={styles.textShortTitle}>PPVC</Text>
      <Text style={styles.textSubtitle}>
        People Profiling and Violation Complaint
      </Text>
      <View style={{marginVertical: 5}} />

      <View style={styles.InputContainer}>
        <TextInput
          theme={{
            colors: {
              primary: '#623256',
              background: 'white',
              underlineColor: 'transparent',
            },
          }}
          mode="flat"
          onChangeText={(text) => setUsername(text)}
          label="Email"
          value={username}
        />
        {/* <Input
            style={styles.textInput}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            defaultValue={username}
          /> */}
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          theme={{
            colors: {
              primary: '#623256',
              background: 'white',
              underlineColor: 'transparent',
            },
          }}
          mode="flat"
          onChangeText={(text) => setPassword(text)}
          label="Password"
          secureTextEntry={true}
          value={password}
        />
        {/* <Input
            style={styles.textInput}
            //onFocus={onFocusChange}
            placeholder="Password"
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            defaultValue={password}
          /> */}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View style={{width: '70%', padding: 20, alignItems: 'center'}}>
          <TouchableHighlight
            style={styles.login}
            underlayColor="#623256"
            onPress={() => handleSubmit()}>
            <Text style={styles.submitText}>Login</Text>
          </TouchableHighlight>
          <Text style={{textAlign: 'center', marginTop: 30}}>
            Not Yet Registered?{' '}
            <Text onPress={() => goToSignup()} style={{color: 'blue'}}>
              Sign Up
            </Text>
          </Text>
          <Text style={{textAlign: 'center', marginTop: 30}}>
            <Text onPress={() => gotoreset()} style={{color: 'blue'}}>
              Forgot Password
            </Text>
          </Text>
        </View>
      </View>
      {/* <View
        style={{
          flex: 1,
          width: '100%',
          alignSelf: 'center',
        }}></View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  plate: {
    flex: 1,
    backgroundColor: 'rgba(255,255,355,0.5)',
    borderColor: 'rgba(255,255,355,0.5)',
    borderWidth: 0.1,
    borderRadius: 5,
  },
  login: {
    marginTop: 10,
    paddingTop: 10,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 20,
    height: 50,
    backgroundColor: '#623256',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#623256',
  },
  signup: {
    marginTop: 10,
    paddingTop: 10,
    width: '100%',
    height: 50,
    paddingBottom: 20,
    backgroundColor: '#623256',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitText: {
    color: 'white',
    textAlign: 'center',
  },
  InputContainer: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    padding: 15,
  },
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    borderRadius: 30,
    width: '100%',
  },
  buttonStyle: {
    flex: 1,
    borderRadius: 10,
    marginTop: 10,
    marginEnd: 30,
    width: '100%',
  },

  inputText: {
    color: 'black',
    fontWeight: 'normal',
    fontFamily: 'OpenSans',
    marginLeft: 5,
  },
  image: {
    marginTop: 25,
    width: '100%',
    height: '20%',
  },

  textSubtitle: {
    fontFamily: 'Open-Sans',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    color: 'black',
  },
  textShortTitle: {
    fontFamily: 'Open-Sans',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    color: 'black',
  },
  textTitle: {
    fontFamily: 'Open-Sans',
    textAlign: 'center',
    fontSize: 24,
    color: 'black',
  },
});

export default LoginScreen;
