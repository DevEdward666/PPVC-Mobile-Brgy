import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, View, ScrollView} from 'react-native';
import {BottomSheet} from 'react-native-elements/dist/bottomSheet/BottomSheet';
import {Card} from 'react-native-elements/dist/card/Card';
import CardView from 'react-native-rn-cardview';

const CustomBottomSheet = ({isVisible, color, UI, Footer}) => {
  //  const  onSwipeUp = useCallback((gestureState) {
  //     this.setState({myText: 'You swiped up!'});
  //   })

  //  const onSwipeDown  = useCallback((gestureState) {
  //     this.setState({myText: 'You swiped down!'});
  //   })

  //   const onSwipeLeft  = useCallback((gestureState) {
  //     this.setState({myText: 'You swiped left!'});
  //   })

  //   const onSwipeRight = useCallback((gestureState) {
  //     this.setState({myText: 'You swiped right!'});
  //   })

  return (
    <BottomSheet
      isVisible={isVisible}
      modalProps={{animationType: 'slide'}}
      containerStyle={{backgroundColor: color}}>
      <CardView>{UI}</CardView>

      <CardView>{Footer}</CardView>
    </BottomSheet>
  );
};

CustomBottomSheet.propTypes = {};

export default CustomBottomSheet;
