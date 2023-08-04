import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import Login from '../Screens/LoginScreen';
import SignUp from '../Screens/SignUpScreen';
import Index from '../Screens/Main/BottomNavigation';
import NewsFeed from '../Screens/News/NewsFeed/NewsFeedMain';
import NewsInfo from '../Screens/News/NewsInfo';
import PostsInfo from '../Screens/Posts/PostInfo/PostInfoMain';
import Complaints from '../Screens/Complaints/ComplaintList/ComplaintListMain';
import ComplaintsInfo from '../Screens/Complaints/ComplaintInfo/ComplaintInfoMain';
import FADForm from '../Screens/FamilyAssesmentData/FADForm';
import FADMain from '../Screens/FamilyAssesmentData/FADMain';
import MeInfo from '../Screens/Me/MeInfo';
import Posts from '../Screens/Posts/PostsFeed/PostsMain';
import BarangayOfficials from '../Screens/BarangayOfficials/OfficialsMain';
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
      <Scene key="signup" component={SignUp} title="Signup" hideNavBar={true} />
      <Scene
        key="newsfeed"
        component={NewsFeed}
        title="News"
        navBarButtonColor="#623256"
        titleStyle={{color: '#623256'}}
      />
      <Scene
        key="newsinfo"
        component={NewsInfo}
        title="News Info"
        titleStyle={{color: '#623256'}}
        navBarButtonColor="#623256"
      />
      <Scene
        key="postsinfo"
        component={PostsInfo}
        title="Posts"
        titleStyle={{color: '#623256'}}
        navBarButtonColor="#623256"
      />
      <Scene
        key="posts"
        component={Posts}
        title="Posts"
        titleStyle={{color: '#623256'}}
        navBarButtonColor="#623256"
      />
      <Scene
        key="officials"
        component={BarangayOfficials}
        title="Officials"
        titleStyle={{color: '#623256'}}
        navBarButtonColor="#623256"
      />
      <Scene
        key="profile"
        component={MeInfo}
        title="My Profile"
        titleStyle={{color: '#623256'}}
        navBarButtonColor="#623256"
      />
      <Scene
        key="resetpassword"
        component={ResetPassword}
        title="Reset Password"
        titleStyle={{color: '#623256'}}
        navBarButtonColor="#623256"
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
      <Scene
        key="settings"
        component={Settings}
        title="Settings"
        titleStyle={{color: '#623256'}}
        navBarButtonColor="#623256"
      />
      <Scene
        key="fad"
        component={FADMain}
        title="Family Assesment Data Form"
        titleStyle={{color: '#623256'}}
        navBarButtonColor="#623256"
      />

      <Scene
        key="complaintsinfo"
        component={ComplaintsInfo}
        title="Complaint Info"
        titleStyle={{color: '#623256'}}
        navBarButtonColor="#623256"
      />
      <Scene
        key="complaints"
        component={Complaints}
        title="List of Complaints"
        titleStyle={{color: '#623256'}}
        navBarButtonColor="#623256"
      />
      <Scene
        key="index"
        component={Index}
        titleStyle={{color: '#623256'}}
        title="Home"
        initial
      />
    </Scene>
  </Router>
);
export default Routes;
