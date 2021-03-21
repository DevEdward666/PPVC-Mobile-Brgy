import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useState} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {action_Login_user} from '../Services/Actions/LoginAction';
import {SafeAreaView} from 'react-native-safe-area-context';
const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const handleSubmit = useCallback(() => {
    dispatch(action_Login_user(username, password));
  });
  const goToSignup = useCallback(() => {
    Actions.signup();
  });
  AsyncStorage.getItem('tokenizer').then((item) => {
    if (item) {
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
          <Input
            style={styles.textInput}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            defaultValue={username}
          />
        </View>
        <View style={styles.InputContainer}>
          <Input
            style={styles.textInput}
            //onFocus={onFocusChange}
            placeholder="Password"
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            defaultValue={password}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
          <View style={{flex: 1, width: '90%', padding: 10}}>
            <Button
              onPress={handleSubmit}
              title="Login"
              accessibilityLabel="Log in your account"
            />
          </View>
          <View style={{flex: 1, width: '90%', padding: 10}}>
            <Button
              style={{borderRadius: 30}}
              onPress={goToSignup}
              title="Sign Up"
            />
          </View>
        </View>
      </View>
      <View style={{marginVertical: 55}} />
      <View style={{flexDirection: 'row', height: 50}}>
        <View style={{width: '100%', height: 50, justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              marginStart: 10,
              fontSize: 14,
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#c4c0c0',
            }}>
            {/* Powered by TUO @ 2021 */}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  InputContainer: {
    width: '90%',
    height: 50,
    borderRadius: 2,
    marginVertical: 5,
    borderWidth: 0.3,
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
  inputContainer: {
    borderBottomWidth: 0,
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
