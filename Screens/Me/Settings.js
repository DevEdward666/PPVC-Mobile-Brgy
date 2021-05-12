import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native';
import {Text,StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Card} from 'react-native-elements';
import CardView from 'react-native-rn-cardview';
import {TouchableNativeFeedback} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { ImageBackground } from 'react-native';

const Settings = () => {
  const handlePressReset = useCallback(() => {
    Actions.resetpassword();
  }, []);
  const handlePressUpdateInfo = useCallback(() => {
    Actions.updateinfo();
  }, []);
  return (
    <ImageBackground
    style={{flex: 1}}
    source={require('../../assets/background/bgImage.jpg')}
    resizeMode="stretch"
    blurRadius={20}>
    
    <SafeAreaView style={{flex:1,marginTop:50,height:500}}>
    <Card containerStyle={styles.plate}> 
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
      </Card>   
    </SafeAreaView>
    
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

  plate:{
    flex:1,
    backgroundColor:"rgba(255,255,355,0.5)",
    borderColor:"rgba(255,255,355,0.5)",
    borderWidth:0.1,
    borderRadius:5
},
})
Settings.propTypes = {};

export default Settings;
