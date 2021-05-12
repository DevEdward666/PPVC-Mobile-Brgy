import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import Login from '../Screens/LoginScreen';
import SignUp from '../Screens/SignUpScreen';
import Index from '../Screens/Main/BottomNavigation';
import NewsFeed from '../Screens/News/NewsFeed';
import NewsInfo from '../Screens/News/NewsInfo';
import PostsInfo from '../Screens/Posts/PostsInfo';
import Complaints from '../Screens/Me/Complaints';
import ComplaintsInfo from '../Screens/Complaints/ComplaintsInfo';
import FADForm from '../Screens/FamilyAssesmentData/FADForm';
import MeInfo from '../Screens/Me/MeInfo';
import Posts from '../Screens/Posts/Posts';
import BarangayOfficials from '../Screens/BarangayOfficials/BarangayOfficialsList';
import ResetPassword from '../Screens/Me/ResetPassword';
import UpdateInfo from '../Screens/Me/UpdateInfo';
import Settings from '../Screens/Me/Settings';
import Family_Members from '../Screens/Me/Family/Family_Members';
const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene
        key="home"
        component={Login}
        title="Login"
        hideNavBar={true}
        renderBackButton={() => <View />}
      />
      <Scene key="signup" component={SignUp} title="Signup" hideNavBar={true}/>
      <Scene key="newsfeed" component={NewsFeed} title="News"  navTransparent={true} navBarButtonColor="white"  titleStyle={{ color: "#ffffff" }} />
      <Scene key="newsinfo" component={NewsInfo} title="News Info" navTransparent={true} titleStyle={{ color: "#ffffff" }} navBarButtonColor="white" />
      <Scene key="postsinfo" component={PostsInfo} title="Posts" navTransparent={true} titleStyle={{ color: "#ffffff" }} navBarButtonColor="white"/>
      <Scene key="posts" component={Posts} title="Posts" navTransparent={true} titleStyle={{ color: "#ffffff" }} navBarButtonColor="white"/>
      <Scene key="officials" component={BarangayOfficials} title="Officials" navTransparent={true} titleStyle={{ color: "#ffffff" }} navBarButtonColor="white"/>
      <Scene key="profile" component={MeInfo} title="My Profile" navTransparent={true} titleStyle={{ color: "#ffffff" }} navBarButtonColor="white" />
      <Scene
        key="resetpassword"
        component={ResetPassword}
        title="Reset Password"
        navTransparent={true} titleStyle={{ color: "#ffffff" }} navBarButtonColor="white"
      />
      <Scene
        key="updateinfo"
        component={UpdateInfo}
        title="Update Information"
      />
      <Scene
        key="family_member"
        component={Family_Members}
        title="My Family Members"
      />
      <Scene key="settings" component={Settings} title="Settings" navTransparent={true} titleStyle={{ color: "#ffffff" }} navBarButtonColor="white"/>
      <Scene key="fad" component={FADForm} title="Family Assesment Data Form" navTransparent={true} titleStyle={{ color: "#ffffff" }} navBarButtonColor="white"/>

      <Scene
        key="complaintsinfo"
        component={ComplaintsInfo}
        title="Complaint Info"
        navTransparent={true} titleStyle={{ color: "#ffffff" }} navBarButtonColor="white"
      />
      <Scene
        key="complaints"
        component={Complaints}
        title="List of Complaints"
        navTransparent={true} titleStyle={{ color: "#ffffff" }} navBarButtonColor="white"
      />
      <Scene key="index" component={Index} title="Home" initial="true" hideNavBar={true} />
    </Scene>
  </Router>
);
export default Routes;
