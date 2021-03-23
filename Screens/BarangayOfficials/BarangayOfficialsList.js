import React, {useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import CardView from 'react-native-rn-cardview';
import {action_get_barangay_officials_list} from '../../Services/Actions/BarangayOfficialsActions';
import {useDispatch, useSelector} from 'react-redux';
const BarangayOfficials = () => {
  const dispatch = useDispatch();

  const brgyofficiallist = useSelector(
    (state) => state.BarangayOfficialReducers.data_barangay,
  );
  useEffect(() => {
    dispatch(action_get_barangay_officials_list());
  }, [dispatch]);

  return (
    <SafeAreaView>
      <CardView>
        <Text style={{textAlign: 'center', fontSize: 22, height: 50}}>
          Barangay Officials
        </Text>
      </CardView>
      <ScrollView>
        {brgyofficiallist.map((items, index) => {
          return (
            <CardView key={index}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginBottom: 50,
                }}>
                <View style={{width: 50, height: 20}}>
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
                <View style={{width: 300, height: 20}}>
                  <Text style={styles.containerNOTIFICATION}>
                    {items?.first_name} {items?.middle_name} {items?.last_name}{' '}
                    {items?.suffix}
                    {'\n'}
                    {items?.position}
                  </Text>
                </View>
              </View>
            </CardView>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  containerNOTIFICATION: {
    paddingLeft: 5,
    paddingRight: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
BarangayOfficials.propTypes = {};

export default BarangayOfficials;
