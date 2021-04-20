import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native';
import {Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Card} from 'react-native-paper';
import CardView from 'react-native-rn-cardview';
import {TouchableNativeFeedback} from 'react-native';
import {Actions} from 'react-native-router-flux';

const Settings = () => {
  const handlePressReset = useCallback(() => {
    Actions.resetpassword();
  }, []);
  const handlePressUpdateInfo = useCallback(() => {
    Actions.updateinfo();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <TouchableNativeFeedback onPress={() => handlePressUpdateInfo()}>
          <CardView style={{width: '100%', height: 70, padding: 20}}>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'left',
                fontWeight: 'bold',
              }}>
              Update Info
            </Text>
          </CardView>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => handlePressReset()}>
          <CardView style={{width: '100%', height: 70, padding: 20}}>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'left',
                fontWeight: 'bold',
              }}>
              Reset Password
            </Text>
          </CardView>
        </TouchableNativeFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

Settings.propTypes = {};

export default Settings;
