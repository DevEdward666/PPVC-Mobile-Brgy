import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {Button, Snackbar} from 'react-native-paper';
const CustomSnackBar = ({show, message}) => {
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!show);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Snackbar duration={3000} visible={show} onDismiss={onDismissSnackBar}>
        {message}
      </Snackbar>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

CustomSnackBar.propTypes = {};

export default CustomSnackBar;
