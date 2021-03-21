import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import Login from '../Screens/LoginScreen';
import SignUp from '../Screens/SignUpScreen';
import Index from '../Screens/Main/BottomNavigation';
import NewsFeed from '../Screens/News/NewsFeed';
import NewsInfo from '../Screens/News/NewsInfo';
import Complaints from '../Screens/Me/Complaints';
import ComplaintsInfo from '../Screens/Complaints/ComplaintsInfo';
import MeInfo from '../Screens/Me/MeInfo';
const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene
        key="home"
        component={Login}
        title="Login"
        renderBackButton={() => <View />}
      />
      <Scene key="signup" component={SignUp} title="Signup" />
      <Scene key="newsfeed" component={NewsFeed} title="News" />
      <Scene key="newsinfo" component={NewsInfo} title="News Info" />
      <Scene key="profile" component={MeInfo} title="My Profile" />

      <Scene
        key="complaintsinfo"
        component={ComplaintsInfo}
        title="Complaint Info"
      />
      <Scene
        key="complaints"
        component={Complaints}
        title="List of Complaints"
      />
      <Scene key="index" component={Index} title="Home" initial="true" />
    </Scene>
  </Router>
);
export default Routes;
