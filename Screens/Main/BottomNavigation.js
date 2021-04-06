import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';

import MeScreen from '../Me/MeScreen';
import {useDispatch, useSelector} from 'react-redux';
import {action_get_userinfo} from '../../Services/Actions/UserInfoActions';
import {View} from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// function NewsStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="News Feed"
//       screenOptions={{headerShown: false, headerLeft: null}}>
//       <Stack.Screen name="News Feed" component={NewsFeed} />
//     </Stack.Navigator>
//   );
// }
// function PostsStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Posts"
//       screenOptions={{headerShown: false, headerLeft: null}}>
//       <Stack.Screen name="Posts" component={Posts} />
//     </Stack.Navigator>
//   );
// }

// function BarangayStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Brgy. Officials"
//       screenOptions={{headerShown: false, headerLeft: null}}>
//       <Stack.Screen name="Brgy. Officials" component={BarangayOfficials} />
//     </Stack.Navigator>
//   );
// }

// function MeStack() {
//   return (
//     <Stack.Navigator initialRouteName="Me" screenOptions={{headerShown: false}}>
//       <Stack.Screen name="Me" component={MeScreen} />
//     </Stack.Navigator>
//   );
// }

// function SettingsStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Settings"
//       screenOptions={{
//         headerStyle: {backgroundColor: '#42f44b'},
//         headerTintColor: '#fff',
//         headerTitleStyle: {fontWeight: 'bold'},
//       }}>
//       <Stack.Screen
//         name="Settings"
//         component={SettingsScreen}
//         options={{title: 'Setting Page'}}
//       />
//       <Stack.Screen
//         name="Details"
//         component={DetailsScreen}
//         options={{title: 'Details Page'}}
//       />
//       <Stack.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{title: 'Profile Page'}}
//       />
//     </Stack.Navigator>
//   );
// }

function BottomNavigation() {
  const dispatch = useDispatch();
  AsyncStorage.getItem('tokenizer').then((item) => {
    if (item === null) {
      Actions.home();
    }
  });
  AsyncStorage.getItem('user_id').then((item) => {
    if (item === null) {
      Actions.home();
    } else {
      dispatch(action_get_userinfo());
    }
  });
  return (
    <View>
      <MeScreen />
    </View>
    // <NavigationContainer>
    //   <Tab.Navigator
    //     initialRouteName="Home"
    //     tabBarOptions={{
    //       activeTintColor: '#3b5998',
    //     }}>
    //     <Tab.Screen
    //       name="NewsStack"
    //       component={NewsStack}
    //       options={{
    //         tabBarLabel: 'News Feed',
    //         tabBarIcon: ({color, size}) => (
    //           <MaterialCommunityIcons
    //             name="compass"
    //             color={color}
    //             size={size}
    //           />
    //         ),
    //       }}
    //     />
    //     <Tab.Screen
    //       name="PostsStack"
    //       component={PostsStack}
    //       options={{
    //         tabBarLabel: 'Posts',
    //         tabBarIcon: ({color, size}) => (
    //           <MaterialCommunityIcons name="post" color={color} size={size} />
    //         ),
    //       }}
    //     />

    //     <Tab.Screen
    //       name="Brgy.Officials"
    //       component={BarangayStack}
    //       options={{
    //         tabBarLabel: 'Brgy.Officials',
    //         tabBarIcon: ({color, size}) => (
    //           <MaterialCommunityIcons
    //             name="account-cowboy-hat"
    //             color={color}
    //             size={size}
    //           />
    //         ),
    //       }}
    //     />

    //     <Tab.Screen
    //       name="MeStack"
    //       component={MeStack}
    //       options={{
    //         tabBarLabel: 'Me',
    //         tabBarIcon: ({color, size}) => (
    //           <MaterialCommunityIcons
    //             name="account"
    //             color={color}
    //             size={size}
    //           />
    //         ),
    //       }}
    //     />
    //   </Tab.Navigator>
    // </NavigationContainer>
  );
}
export default BottomNavigation;
