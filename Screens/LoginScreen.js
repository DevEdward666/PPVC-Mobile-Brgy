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
} from 'react-native';
import {Input} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {action_Login_user} from '../Services/Actions/LoginAction';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-paper';
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
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.container}>
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
                primary: '#3eb2fa',
                background: 'white',
                underlineColor: 'transparent',
              },
            }}
            mode="outlined"
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
                primary: '#3eb2fa',
                background: 'white',
                underlineColor: 'transparent',
              },
            }}
            mode="outlined"
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
            padding: 10,
            marginBottom: 20,
          }}>
          <View style={{width: '100%', padding: 10}}>
            <TouchableHighlight
              style={styles.login}
              underlayColor="rgba(62, 178, 250, 0.5)"
              onPress={() => handleSubmit()}>
              <Text style={styles.submitText}>Login</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={{flex: 1, width: '100%', padding: 10, marginTop: 60}}>
          <Text style={{textAlign: 'center'}}>
            Not Yet Registered?{' '}
            <Text onPress={() => goToSignup()} style={{color: 'blue'}}>
              Sign Up
            </Text>
          </Text>
        </View>
        <View style={{flex: 1, width: '100%', padding: 10, marginTop: 5}}>
          <Text style={{textAlign: 'center'}}>
            <Text onPress={() => gotoreset()} style={{color: 'blue'}}>
              Forgot Password
            </Text>
          </Text>
        </View>
      </View>
      <View style={{marginVertical: 55}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  login: {
    marginTop: 10,
    paddingTop: 10,
    width: '70%',
    alignSelf: 'center',
    paddingBottom: 20,
    height: 50,
    backgroundColor: 'rgba(62, 178, 250, 0.2)',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'rgba(62, 178, 250, 0.5)',
  },
  signup: {
    marginTop: 10,
    paddingTop: 10,
    width: '100%',
    height: 50,
    paddingBottom: 20,
    backgroundColor: '#3eb2fa',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitText: {
    color: 'black',
    textAlign: 'center',
  },
  InputContainer: {
    width: '90%',
    height: 50,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100 + '%',
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
    margin: 20,
    width: '100%',
    height: 30 + '%',
  },

  textSubtitle: {
    fontFamily: 'Open-Sans',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  textShortTitle: {
    fontFamily: 'Open-Sans',
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 10,
  },
  textTitle: {
    fontFamily: 'Open-Sans',
    textAlign: 'center',
    fontSize: 30,
  },
});

export default LoginScreen;
