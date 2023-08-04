/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import store from './Services/Store';
import Routes from './components/Router';
import {Provider} from 'react-redux';
import GlobalFont from 'react-native-global-font';
const App = () => {
  useEffect(() => {
    let mounted = true;
    const globalfont = () => {
      let fontName = 'SFUIDisplay-Medium';
      GlobalFont.applyGlobal(fontName);
    };
    mounted && globalfont();
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
