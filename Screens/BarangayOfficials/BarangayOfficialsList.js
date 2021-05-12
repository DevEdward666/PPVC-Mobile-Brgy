import React, {useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  ScrollView,
  View,
  Dimensions,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
import CardView from 'react-native-rn-cardview';
import {action_get_barangay_officials_list} from '../../Services/Actions/BarangayOfficialsActions';
import {useDispatch, useSelector} from 'react-redux';
import { ImageBackground } from 'react-native';
import { Card } from 'react-native-elements';
const BarangayOfficials = () => {
  const dispatch = useDispatch();

  const brgyofficiallist = useSelector(
    (state) => state.BarangayOfficialReducers.data_barangay,
  );
  useEffect(() => {
    let mounted = true;

    const getbrgyofficials = () => {
      dispatch(action_get_barangay_officials_list());
    };

    mounted && getbrgyofficials();
    return () => (mounted = false);
  }, [dispatch]);

  return (
    <ImageBackground
    style={{flex: 1}}
    source={require('../../assets/background/bgImage.jpg')}
    resizeMode="cover"
    blurRadius={20}>

    <SafeAreaView>
   
    
      <ScrollView style={{height: screenHeight, marginTop:50}}>
        {brgyofficiallist.map((items, index) => {
          return (
            <Card containerStyle={styles.plate} key={index}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginBottom: 50,
                  height: screenHeight - 800,
                }}>
                <View style={{width: screenWidth - 350}}>
                  <Image
                    source={{
                      uri: `data:image/png;base64,${items?.pic}`,
                    }}
                    style={{
                      marginTop: 5,
                      marginStart: 10,
                      width: 50,
                      height: 50,
                      borderRadius: 120 / 2,
                      overflow: 'hidden',
                      borderWidth: 3,
                    }}
                  />
                </View>
                <View style={{width: screenWidth -120}}>
                  <Text style={styles.containerNOTIFICATION}>
                    {items?.first_name} {items?.middle_name} {items?.last_name}{' '}
                    {items?.suffix}
                    {'\n'}
                    {items?.position}
                  </Text>
                </View>
              </View>
            </Card>
          );
        })}
      </ScrollView>

    </SafeAreaView>
    
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  containerNOTIFICATION: {
    paddingLeft: 5,
    paddingRight: 16,
    paddingVertical: 10,
    fontSize: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  plate:{
    flex:1,
    backgroundColor:"rgba(255,255,355,0.5)",
    borderColor:"rgba(255,255,355,0.5)",
    borderWidth:0.1,
    borderRadius:5
},
});
BarangayOfficials.propTypes = {};

export default BarangayOfficials;
