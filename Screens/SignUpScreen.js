import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';
import CardView from 'react-native-rn-cardview';
import {Picker} from '@react-native-community/picker';
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {TextInput} from 'react-native-paper';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  Button,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Icon, Input} from 'react-native-elements';
import * as ImagePicker from 'react-native-image-picker';
import CustomBottomSheet from '../Plugins/CustomBottomSheet';
import Icons from 'react-native-vector-icons/FontAwesome';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import {FlatList} from 'react-native-gesture-handler';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {action_SignUp_user} from '../Services/Actions/SignUpActions';
import {useDispatch, useSelector} from 'react-redux';
import CustomAlert from '../Plugins/CustomAlert';
import {Actions} from 'react-native-router-flux';
const SignUpScreen = () => {
  const dispatch = useDispatch();
  const [firstname, setfirstname] = useState('');
  const [middlename, setmiddlename] = useState('');
  const [lastname, setlastname] = useState('');
  const [gender, setgender] = useState('');
  const [suffix, setSuffix] = useState('');
  const [mobile, setmobile] = useState('63');
  const [email, setemail] = useState('');
  const [birthdate, setbirthdate] = useState('');
  const [city, setcity] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const [nationality, setnationality] = useState('');
  const [civilstatus, setcivilstatus] = useState('');
  const [dialect, setdialect] = useState('');
  const [disability, setdisablity] = useState('');
  const [jobspecs, setjobspecs] = useState('');
  const [isemployed, setisemployed] = useState('');
  const [purok, setpurok] = useState('');
  const [religion, setreligion] = useState('');
  const [tribe, setribe] = useState('');

  const [PeopleAge, setPeopleAge] = useState('');
  const [Peoplegender, setPeoplegender] = useState('');
  const [PeopleRelation, setPeopleRelation] = useState('');
  const [PeopleName, setPeopleName] = useState('');
  const [PeopleHealthStatus, setPeopleHealthStatus] = useState('');
  const [PeopleMonthlyIncome, setPeopleMonthlyIncome] = useState('');
  const [PeopleReligion, setPeopleReligion] = useState('');
  const [PeopleTribe, setPeopleTribe] = useState('');
  const [PeopleWork, setPeopleWork] = useState('');
  const [PeopleGraduted, setPeopleGraduted] = useState('');
  const [PeopleCivilStatus, setPeopleCivilStatus] = useState('');
  const [PeopleBirthdate, setPeopleBirthdate] = useState('');

  const [barangay, setbarangay] = useState('');
  const [fulladdress, setfulladdress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorUsernameMessage, setErrorMessageUsername] = useState('');
  const [emailErrorMessage, setemailErrorMessage] = useState(false);
  const [mobileErrorMessage, setmobileErrorMessage] = useState('');
  const [InfoError, setInfoError] = useState(false);
  const [AddressError, setAddressError] = useState(false);
  const [resourcePath, setresourcePath] = useState(null);
  const [resourcePathProfile, setresourcePathProfile] = useState(null);
  const [imageresponse, setimageresponse] = useState(null);
  const [profileimageresponse, setprofileimageresponse] = useState(null);
  const [showpass, setshowpass] = useState(true);
  const [iconpass, seticonpass] = useState(false);
  const [showconfirmpass, setshowconfirmpass] = useState(true);
  const [iconconfirmpass, seticonconfirmpass] = useState(false);
  const [stepError, setstepError] = useState(false);
  const [region, setregion] = useState('');
  const [province, setprovince] = useState('');
  const [yearsstayed, setyearsstayed] = useState('');
  const [CredentialsError, setCredentialsError] = useState(false);
  const [houseownedby, sethouseownedby] = useState('');
  const [VotingPrecint, setVotingPrecint] = useState('');
  const [HouseStatus, setHouseStatus] = useState('');

  const [alerttitle, setalerttitle] = useState('');
  const [alertmessage, setalertmessage] = useState('');
  const [alertshow, setalertshow] = useState(false);

  const [PeopleInsidetheHouse, setPeopleInsidetheHouse] = useState([]);
  const [PhotoSingleFile, setPhotoSingleFile] = useState('');
  const [PhotoResource, setPhotoResource] = useState('');
  const [HouseIncome, setHouseIncome] = useState('');
  const tableHead = ['Head', 'Head2', 'Head3', 'Head4'];

  const onChange = useCallback((event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    var today = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    var age_now = today.getFullYear() - currentDate.getFullYear();
    console.log(age_now);
    if (age_now < '-1') {
      alert('Age is invalid');
    } else {
      if (month <= 9 && day <= 9) {
        setbirthdate(year + '-0' + month + '-0' + day);
      } else if (month <= 9) {
        setbirthdate(year + '-0' + month + '-' + day);
      } else if (day <= 9) {
        setbirthdate(year + '-' + month + '-0' + day);
      } else {
        setbirthdate(year + '-' + month + '-' + day);
      }
    }

    //console.log(year + '-' + month + '-' + day);
  });
  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      setPhotoSingleFile(results);
      setPhotoResource(results.uri);

      // Setting the state to show single file attributes
    } catch (err) {
      setPhotoSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const handlePassword = (password) => {
    setPassword(password);
    if (password != confirmpassword) {
      // setErrorMessage('Password mismatch');
      setErrorMessage(true);
      setstepError(true);
    } else {
      let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (reg.test(password) === false) {
        setErrorMessage(true);
        // setErrorMessage(
        //   'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:',
        // );
      } else {
        setmobileErrorMessage();
        setstepError(false);
        setErrorMessage(false);
      }
    }
  };
  const handleConfirmPassword = (confirmpassword) => {
    setconfirmpassword(confirmpassword);
    if (password != confirmpassword) {
      // setErrorMessage('Password mismatch');
      setErrorMessage(true);
      setstepError(true);
    } else {
      let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (reg.test(password) === false) {
        // setErrorMessage(
        //   'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:',
        // );
        setErrorMessage(true);
      } else {
        setmobileErrorMessage();
        setstepError(false);
        setErrorMessage('');
      }
    }
  };
  const showMode = useCallback((currentMode) => {
    setShow(true);
    setMode(currentMode);
  });
  const showpassword = useCallback(() => {
    if (showpass == true) {
      setshowpass(false);
      seticonpass(true);
    } else {
      setshowpass(true);
      seticonpass(false);
    }
  }, [showpass, iconpass]);
  const showconfirmpassword = useCallback(() => {
    if (showconfirmpass == true) {
      setshowconfirmpass(false);
      seticonconfirmpass(true);
    } else {
      setshowconfirmpass(true);
      seticonconfirmpass(false);
    }
  }, [showconfirmpass, iconconfirmpass]);
  const handleNationality = useCallback((pickNationality) => {
    setnationality(pickNationality);
  });
  const handlehouseownedby = useCallback(
    (picked) => {
      sethouseownedby(picked);
    },
    [houseownedby],
  );

  const handleVotingPrecint = useCallback(
    (picked) => {
      setVotingPrecint(picked);
    },
    [VotingPrecint],
  );
  const handleHouseStatus = useCallback(
    (picked) => {
      setHouseStatus(picked);
    },
    [HouseStatus],
  );
  const handleRegionChange = useCallback((pickregion) => {
    setregion(pickregion);
    setprovince('');
    setcity('');
    setbarangay('');
  });
  const handleProvinceChange = useCallback((pickprovince) => {
    setprovince(pickprovince);
  });
  const handleCityChange = useCallback((pickcity) => {
    setcity(pickcity);
  });
  const handleBarangayChange = useCallback((pickBarangay) => {
    setbarangay(pickBarangay);
  });
  const showDatepicker = useCallback(() => {
    showMode('date');
  }, []);
  const handleNextInfo = useCallback(async () => {
    if (
      firstname == '' ||
      middlename == '' ||
      lastname == '' ||
      gender == '' ||
      birthdate == ''
    ) {
      await setInfoError(true);
      alert('Please Fill All Fields');
    } else if (PhotoSingleFile == '') {
      await setInfoError(true);
      await alert('Please Take Profile Image');
    } else {
      await setInfoError(false);
    }
  }, [PhotoSingleFile, firstname, middlename, lastname, gender, birthdate]);
  const handleNextAddress = useCallback(() => {
    if (
      nationality == '' ||
      religion == '' ||
      civilstatus == '' ||
      dialect == '' ||
      tribe == '' ||
      disability == '' ||
      purok == '' ||
      jobspecs == '' ||
      HouseIncome == '' ||
      HouseStatus == '' ||
      VotingPrecint == '' ||
      houseownedby == ''
    ) {
      setAddressError(true);
      alert('Please Fill All Fields');
    } else {
      setAddressError(false);
    }
  }, [
    nationality,
    religion,
    civilstatus,
    dialect,
    tribe,
    disability,
    purok,
    jobspecs,
    HouseIncome,
    HouseStatus,
    VotingPrecint,
    houseownedby,
  ]);
  const handleNextCredentials = useCallback(() => {
    // if (
    //   nationality == '' ||
    //   region == '' ||
    //   province == '' ||
    //   city == '' ||
    //   barangay == '' ||
    //   fulladdress == ''
    // ) {
    //   setAddressError(true);
    //   alert('Please Fill All Fields');
    // } else {
    //   setAddressError(false);
    // }
    setCredentialsError(false);
  }, [nationality, region, province, city, barangay, fulladdress]);
  const handleYearsStayedChange = useCallback(
    (text) => {
      setyearsstayed(text);
      // if (
      //   nationality == '' ||
      //   region == '' ||
      //   province == '' ||
      //   city == '' ||
      //   barangay == '' ||
      //   fulladdress == ''
      // ) {
      //   setAddressError(true);
      //   alert('Please Fill All Fields');
      // } else {
      //   setAddressError(false);
      // }
      setCredentialsError(false);
    },
    [nationality, region, province, city, barangay, fulladdress],
  );
  const validate = (email) => {
    setemail(email);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      setemailErrorMessage(true);
    } else {
      setemailErrorMessage(false);
      setemail(email);
    }
  };
  const handleCivilStatus = useCallback((value) => {
    setcivilstatus(value);
  });
  const handleDialect = useCallback((value) => {
    setdialect(value);
  });
  const handleDisablity = useCallback((value) => {
    setdisablity(value);
  });
  const handleJobSpecs = useCallback((value) => {
    if (value.lenght > 4) {
      setisemployed('y');
    } else {
      setisemployed('n');
    }
    setjobspecs(value);
  });
  const handlePurok = useCallback((value) => {
    setpurok(value);
  });
  const handleRegligion = useCallback((value) => {
    setreligion(value);
  });
  const handleTribe = useCallback((value) => {
    setribe(value);
  });

  const handleHouseIncome = useCallback((value) => {
    setHouseIncome(value);
  });

  const handleAddPeople = useCallback(() => {
    setIsVisible(true);
  });

  const handlePeopleAdd = useCallback(() => {
    setIsVisible(false);

    setPeopleInsidetheHouse((prev) => [
      ...prev,
      {
        PeopleName: PeopleName,
        PeopleAge: PeopleAge,
        PeopleRelation: PeopleRelation,
        Peoplegender: Peoplegender,
        PeopleBirthdate: PeopleBirthdate,
        PeopleCivilStatus: PeopleCivilStatus,
        PeopleReligion: PeopleReligion,
        PeopleTribe: PeopleTribe,
        PeopleGraduted: PeopleGraduted,
        PeopleWork: PeopleWork,
        PeopleMonthlyIncome: PeopleMonthlyIncome,
        PeopleHealthStatus: PeopleHealthStatus,
      },
    ]);
  }, [
    PeopleInsidetheHouse,
    PeopleName,
    PeopleAge,
    PeopleRelation,
    Peoplegender,
    PeopleBirthdate,
    PeopleCivilStatus,
    PeopleReligion,
    PeopleTribe,
    PeopleGraduted,
    PeopleWork,
    PeopleMonthlyIncome,
    PeopleHealthStatus,
  ]);

  const handlePeopleGender = useCallback((value) => {
    setPeoplegender(value);
  }, []);

  const handlePeopleName = useCallback((value) => {
    setPeopleName(value);
  }, []);

  const handlePeopleRelation = useCallback((value) => {
    setPeopleRelation(value);
  }, []);
  const handlePeopleAge = useCallback((value) => {
    setPeopleAge(value);
  }, []);

  const handlePeopleBirthdate = useCallback((value) => {
    setPeopleBirthdate(value);
  }, []);

  const handlePeopleCivilStatus = useCallback((value) => {
    setPeopleCivilStatus(value);
  }, []);
  const handlePeopleReligion = useCallback((value) => {
    setPeopleReligion(value);
  }, []);

  const handlePeopleTribe = useCallback((value) => {
    setPeopleTribe(value);
  }, []);

  const handlePeopleGraduted = useCallback((value) => {
    setPeopleGraduted(value);
  }, []);

  const handlePeopleWork = useCallback((value) => {
    setPeopleWork(value);
  }, []);
  const handlePeopleMonthlyIncome = useCallback((value) => {
    setPeopleMonthlyIncome(value);
  }, []);
  const handlePeopleHealthStatus = useCallback((value) => {
    setPeopleHealthStatus(value);
  }, []);
  const handlePeopleLivingInsideTheHouse = useCallback(
    (value) => {
      setIsVisible(true);
      setPeopleName(value.PeopleName);
      setPeopleAge(value.PeopleAge);
      setPeopleRelation(value.PeopleRelation);
      setPeoplegender(value.Peoplegender);
      setPeopleBirthdate(value.PeopleBirthdate);
      setPeopleCivilStatus(value.PeopleCivilStatus);
      setPeopleReligion(value.PeopleReligion);
      setPeopleTribe(value.PeopleTribe);
      setPeopleGraduted(value.PeopleGraduted);
      setPeopleWork(value.PeopleWork);
      setPeopleMonthlyIncome(value.PeopleMonthlyIncome);
      setPeopleHealthStatus(value.PeopleHealthStatus);
    },
    [
      PeopleName,
      PeopleAge,
      PeopleRelation,
      Peoplegender,
      PeopleBirthdate,
      PeopleCivilStatus,
      PeopleReligion,
      PeopleTribe,
      PeopleGraduted,
      PeopleWork,
      PeopleMonthlyIncome,
      PeopleHealthStatus,
    ],
  );

  const tomarFoto = useCallback(() => {
    ImagePicker.launchCamera({maxWidth: 1280, maxHeight: 720}, (response) => {
      console.log('Request =', response);
      setresourcePath(response.uri); // update the local state, this will rerender your TomarFoto component with the photo uri path.
      if (response.didCancel) {
        alert('Action cancelled ');
      } else if (response.error) {
        alert('Error : ', response.error);
      } else {
        const source = {uri: response.uri};
        console.log(response.uri);
        setimageresponse(response);
        //    dispatch(action_POST_FileImage(response));
      }
    });
  }, [setresourcePath]);
  const profileImage = useCallback(() => {
    let options = {
      title: 'You can choose one image',
      maxWidth: 1280,
      maxHeight: 720,
      includeBase64: true,
      base64: true,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log(response.base64);
      setresourcePathProfile(response.uri); // update the local state, this will rerender your TomarFoto component with the photo uri path.
      setPhotoSingleFile(response.base64); // update the local state, this will rerender your TomarFoto component with the photo uri path.

      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log(response.uri);
        setprofileimageresponse(response);
      }
    });
  }, [setresourcePathProfile, PhotoSingleFile]);
  const handleSubmitCredentials = useCallback(async () => {
    if (stepError == false) {
      dispatch(
        action_SignUp_user(
          PhotoSingleFile,
          firstname,
          middlename,
          lastname,
          suffix,
          gender,
          birthdate,
          nationality,
          religion,
          civilstatus,
          purok,
          mobile,
          email,
          dialect,
          tribe,
          disability,
          isemployed,
          jobspecs,
          HouseIncome,
          HouseStatus,
          VotingPrecint,
          houseownedby,
          username,
          password,
        ),
      );
      await setalertshow(true);
      await setalertmessage('Registered Successfully');
      await setalerttitle('User Registration');
      await Actions.home();
    } else {
      alert('Please Provide Valid Data');
    }
  }, [
    PhotoSingleFile,
    firstname,
    middlename,
    lastname,
    suffix,
    gender,
    birthdate,
    nationality,
    religion,
    civilstatus,
    purok,
    mobile,
    email,
    dialect,
    tribe,
    disability,
    isemployed,
    jobspecs,
    HouseIncome,
    HouseStatus,
    VotingPrecint,
    houseownedby,
    username,
    password,
  ]);
  const [isVisibles, setIsVisibles] = useState(false);
  const [gestureName, setgestureName] = useState('');
  const [list, updateList] = useState(PeopleInsidetheHouse);
  const handleRemoveItem = useCallback((e) => {
    setPeopleInsidetheHouse(
      PeopleInsidetheHouse.filter((item) => item.PeopleName !== e.PeopleName),
    );
  });
  const onSwipe = useCallback((gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setgestureName({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        // setopen(true);
        break;
      case SWIPE_DOWN:
        setIsVisible(false);

        break;
      case SWIPE_LEFT:
        // setgestureName({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        // setgestureName({backgroundColor: 'yellow'});
        break;
    }
  });
  const config = {
    velocityThreshold: 0.5,
    directionalOffsetThreshold: 80,
  };
  return (
    <ScrollView style={{backgroundScrollViewColor: 'white'}}>
      <View style={styles.container}>
        <CustomAlert
          title={alerttitle}
          message={alertmessage}
          show={alertshow}
        />
        <View style={{flex: 1}}>
          <ProgressSteps>
            <ProgressStep
              label="Information"
              onNext={handleNextInfo}
              errors={InfoError}>
              {resourcePathProfile ? (
                <TouchableHighlight
                  onPress={profileImage}
                  style={{
                    width: '100%',
                    height: 180,
                    resizeMode: 'contain',
                    alignContent: 'flex-start',
                  }}
                  underlayColor="white">
                  <ImageBackground
                    style={styles.avatar}
                    source={{
                      uri: resourcePathProfile,
                    }}>
                    <Text style={styles.text}>Choose Image</Text>
                  </ImageBackground>
                </TouchableHighlight>
              ) : (
                <TouchableHighlight
                  onPress={profileImage}
                  style={{
                    width: '100%',
                    height: 180,
                    resizeMode: 'contain',
                    alignContent: 'flex-start',
                  }}
                  underlayColor="white">
                  <ImageBackground
                    style={styles.avatar}
                    source={{
                      uri: 'https://bootdey.com/img/Content/avatar/avatar6.png',
                    }}>
                    <Text style={styles.text}>Choose Image</Text>
                  </ImageBackground>
                </TouchableHighlight>
              )}

              <View style={styles.Inputcontainer}>
                <TextInput
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="outlined"
                  onChangeText={(text) => setfirstname(text)}
                  label="First Name"
                  value={firstname}
                />
                {/* <Input
                  style={styles.textInput}
                  placeholder="First Name"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  onChangeText={(text) => setfirstname(text)}
                  defaultValue={firstname}
                /> */}
                <TextInput
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="outlined"
                  onChangeText={(text) => setmiddlename(text)}
                  label="Middle Name"
                  value={middlename}
                />
                {/* <Input
                  style={styles.textInput}
                  placeholder="Middle Name"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  onChangeText={(text) => setmiddlename(text)}
                  defaultValue={middlename}
                /> */}
                <TextInput
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="outlined"
                  onChangeText={(text) => setlastname(text)}
                  label="Last Name"
                  value={lastname}
                />
                {/* <Input
                  style={styles.textInput}
                  placeholder="Last Name"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  onChangeText={(text) => setlastname(text)}
                  defaultValue={lastname}
                /> */}
                <TextInput
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="outlined"
                  onChangeText={(text) => setSuffix(text)}
                  label="Suffix"
                  value={suffix}
                />
                {/* <Input
                  style={styles.textInput}
                  placeholder="Suffix"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  onChangeText={(text) => setSuffix(text)}
                  defaultValue={suffix}
                /> */}

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      width: '85%',
                      height: '100%',
                    }}>
                    <TextInput
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          underlineColor: 'transparent',
                          background: 'white',
                        },
                      }}
                      disabled={true}
                      mode="outlined"
                      inputContainerStyle={styles.inputContainer}
                      inputStyle={styles.inputText}
                      onChangeText={(text) => setSuffix(text)}
                      label="Birthdate"
                      value={birthdate}
                    />
                    {/* <Input
                      style={styles.textInput}
                      placeholder="Birthdate"
                    
                      defaultValue={birthdate}
                    /> */}
                  </View>
                  <View
                    style={{
                      width: '15%',
                      height: '100%',
                    }}>
                    <TouchableHighlight
                      underlayColor="white"
                      style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 55,
                        height: 65,
                        backgroundColor: '#fff',
                        borderRadius: 50,
                      }}
                      onPress={showDatepicker}>
                      <Image
                        style={{
                          height: 60,
                          width: '100%',
                          resizeMode: 'center',
                          alignContent: 'flex-start',
                        }}
                        source={require('../assets/icons/ic_calendar_prem-playstore.png')}
                      />
                    </TouchableHighlight>
                    {/* <Button
                      onPress={showDatepicker}
                      title="Birthdate"
                      style={{borderRadius: 30}}
                    /> */}
                  </View>
                </View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
                <View>
                  <Picker
                    selectedValue={gender}
                    style={styles.PickerContainer}
                    onValueChange={(itemValue, itemIndex) =>
                      setgender(itemValue)
                    }>
                    <Picker.Item label="Gender" />
                    <Picker.Item label="Male" value="m" />
                    <Picker.Item label="Female" value="f" />
                  </Picker>
                </View>
              </View>
            </ProgressStep>
            <ProgressStep
              label="Part 2"
              onNext={handleNextAddress}
              errors={AddressError}>
              <View style={styles.Inputcontainer}>
                <TextInput
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="outlined"
                  onChangeText={(text) => handleNationality(text)}
                  label="Nationality"
                  value={nationality}
                />
                {/* <Input
                  style={styles.textInput}
                  placeholder="Nationality"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  onChangeText={(text) => handleNationality(text)}
                  defaultValue={nationality}
                /> */}
                <TextInput
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="outlined"
                  onChangeText={(text) => handleRegligion(text)}
                  label="Religion"
                  value={religion}
                />
                {/* <Input
                  style={styles.textInput}
                  placeholder="Religion"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  onChangeText={(text) => handleRegligion(text)}
                  defaultValue={religion}
                /> */}
                <Picker
                  selectedValue={civilstatus}
                  style={styles.PickerContainer}
                  onValueChange={(itemValue, itemIndex) =>
                    handleCivilStatus(itemValue)
                  }>
                  <Picker.Item label="Civil Status" />
                  <Picker.Item label="Single" value="single" />
                  <Picker.Item label="Married" value="married" />
                  <Picker.Item label="Annulled" value="annulled" />
                  <Picker.Item label="Divorced" value="divorced" />
                </Picker>
                <TextInput
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="outlined"
                  onChangeText={(text) => handleDialect(text)}
                  label="Dialect"
                  value={dialect}
                />
                {/* <Input
                  style={styles.textInput}
                  placeholder="Dialect"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  onChangeText={(text) => handleDialect(text)}
                  defaultValue={dialect}
                /> */}
                <TextInput
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="outlined"
                  onChangeText={(text) => handleTribe(text)}
                  label="Tribe"
                  value={tribe}
                />
                {/* <Input
                  style={styles.textInput}
                  placeholder="Tribe"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  onChangeText={(text) => handleTribe(text)}
                  defaultValue={tribe}
                /> */}

                <Picker
                  selectedValue={disability}
                  style={styles.PickerContainer}
                  onValueChange={(itemValue, itemIndex) =>
                    handleDisablity(itemValue)
                  }>
                  <Picker.Item label="Disabled Person" />
                  <Picker.Item label="Yes" value="y" />
                  <Picker.Item label="No" value="n" />
                </Picker>
                <TextInput
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="outlined"
                  onChangeText={(text) => handlePurok(text)}
                  label="Purok"
                  value={purok}
                />
                {/* <Input
                  style={styles.textInput}
                  placeholder="Purok"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  onChangeText={(text) => handlePurok(text)}
                  defaultValue={purok}
                /> */}
                <TextInput
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="outlined"
                  onChangeText={(text) => handleJobSpecs(text)}
                  label="Job Specification"
                  value={jobspecs}
                />
                {/* <Input
                  style={styles.textInput}
                  placeholder="Job Specification"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  onChangeText={(text) => handleJobSpecs(text)}
                  defaultValue={jobspecs}
                /> */}
                <TextInput
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="outlined"
                  keyboardType="number-pad"
                  onChangeText={(text) => handleHouseIncome(text)}
                  label="House Income"
                  value={HouseIncome}
                />
                {/* <Input
                  style={styles.textInput}
                  placeholder="House Income"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  onChangeText={(text) => handleHouseIncome(text)}
                  defaultValue={HouseIncome}
                /> */}
                <TextInput
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="outlined"
                  onChangeText={(text) => handleHouseStatus(text)}
                  label="House Status"
                  value={HouseStatus}
                />
                {/* <Input
                  style={styles.textInput}
                  placeholder="House Status"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  onChangeText={(text) => handleHouseStatus(text)}
                  defaultValue={HouseStatus}
                /> */}
                <TextInput
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="outlined"
                  onChangeText={(text) => handleVotingPrecint(text)}
                  label="Voting Precint"
                  value={VotingPrecint}
                />
                {/* <Input
                  style={styles.textInput}
                  placeholder="Voting Precint"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  onChangeText={(text) => handleVotingPrecint(text)}
                  defaultValue={VotingPrecint}
                /> */}
                <Picker
                  selectedValue={houseownedby}
                  style={styles.PickerContainer}
                  onValueChange={(itemValue, itemIndex) =>
                    handlehouseownedby(itemValue)
                  }>
                  <Picker.Item label="Okasyon sa balay" />
                  <Picker.Item label="Family Owned" value="Tag-iya" />
                  <Picker.Item label="Renta" value="Renta" />
                  <Picker.Item label="Boarder" value="Boarder" />
                  <Picker.Item label="Live In" value="Nangipon ug puyo" />
                </Picker>
              </View>
            </ProgressStep>
            <ProgressStep
              label="Credentials"
              onSubmit={handleSubmitCredentials}>
              <View style={styles.Inputcontainer}>
                <TextInput
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="outlined"
                  error={emailErrorMessage}
                  onChangeText={(text) => validate(text)}
                  label="Email"
                  value={email}
                />
                {/* <Input
                  style={styles.textInput}
                  placeholder="Email"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  errorMessage={emailErrorMessage}
                  onChangeText={(text) => validate(text)}
                  defaultValue={email}
                /> */}
                <TextInput
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="outlined"
                  onChangeText={(text) => setmobile(text)}
                  label="Mobile No."
                  value={mobile}
                />
                {/* <Input
                  style={styles.textInput}
                  placeholder="Mobile No."
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  //errorMessage={mobileErrorMessage}
                  onChangeText={(text) => setmobile(text)}
                  defaultValue={mobile}
                /> */}
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      width: '85%',
                    }}>
                    <TextInput
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="outlined"
                      onChangeText={(text) => handlePassword(text)}
                      label="Password"
                      secureTextEntry={showpass}
                      error={errorMessage}
                      value={password}
                    />
                    {/* <Input
                      style={styles.textInput}
                      placeholder="Password"
                      inputContainerStyle={styles.inputContainer}
                      inputStyle={styles.inputText}
                      secureTextEntry={showpass}
                      errorMessage={errorMessage}
                      onChangeText={(text) => handlePassword(text)}
                      defaultValue={password}
                    /> */}
                  </View>
                  <View
                    style={{
                      width: '25%',
                    }}>
                    <TouchableHighlight
                      underlayColor="white"
                      style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 55,
                        height: 55,
                        backgroundColor: '#fff',
                        borderRadius: 50,
                      }}
                      onPress={showpassword}>
                      {iconpass ? (
                        <Icon name="visibility" />
                      ) : (
                        <Icon name="visibility-off" />
                      )}
                    </TouchableHighlight>
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      width: '85%',
                    }}>
                    <TextInput
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="outlined"
                      onChangeText={(text) => handleConfirmPassword(text)}
                      label="Confirm Password"
                      secureTextEntry={showconfirmpass}
                      error={errorMessage}
                      value={confirmpassword}
                    />
                    {/* <Input
                      style={styles.textInput}
                      placeholder="Confirm Password"
                      inputContainerStyle={styles.inputContainer}
                      inputStyle={styles.inputText}
                      errorMessage={errorMessage}
                      secureTextEntry={showconfirmpass}
                      onChangeText={(text) => handleConfirmPassword(text)}
                      defaultValue={confirmpassword}
                    /> */}
                  </View>
                  <View
                    style={{
                      width: '25%',
                    }}>
                    <TouchableHighlight
                      underlayColor="white"
                      style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 55,
                        height: 55,
                        backgroundColor: '#fff',
                        borderRadius: 50,
                      }}
                      onPress={showconfirmpassword}>
                      {iconconfirmpass ? (
                        <Icon name="visibility" />
                      ) : (
                        <Icon name="visibility-off" />
                      )}
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </ProgressStep>
            {/* <ProgressStep label="FAD" onSubmit={handleSubmitCredentials}>
              <View style={styles.Inputcontainer}>
                <CardView
                  style={{marginBottom: 20, textAlign: 'center', height: 40}}>
                  <Text style={{textAlign: 'center'}}>
                    Family Assesment Data
                  </Text>
                </CardView>
                <Picker
                  selectedValue={gender}
                  style={styles.PickerContainer}
                  onValueChange={(itemValue, itemIndex) =>
                    handleOccationofthehouse(itemValue)
                  }>
                  <Picker.Item label="Okasyon sa balay" />
                  <Picker.Item label="Tag-iya" value="Tag-iya" />
                  <Picker.Item label="Renta" value="Renta" />
                  <Picker.Item label="Boarder" value="Boarder" />
                  <Picker.Item
                    label="Nangipon ug puyo"
                    value="Nangipon ug puyo"
                  />
                  <Picker.Item
                    label="Nisumpay ug balay"
                    value="Nisumpay ug balay"
                  />
                </Picker>
                <Picker
                  selectedValue={gender}
                  style={styles.PickerContainer}
                  onValueChange={(itemValue, itemIndex) =>
                    handleOccationfortheland(itemValue)
                  }>
                  <Picker.Item label="Okasyon sa Yuta" />
                  <Picker.Item
                    label="Nanag-iya sa yuta"
                    value="Nanag-iya sa yuta"
                  />
                  <Picker.Item
                    label="Nang arkila sa yuta"
                    value="Nang arkila sa yuta"
                  />
                  <Picker.Item
                    label="Informal settler"
                    value="Informal settler"
                  />
                  <Picker.Item
                    label="Tigbantay sa yuta"
                    value="Tigbantay sa yuta"
                  />
                </Picker>

                <Input
                  style={styles.textInput}
                  placeholder="Kadugayon sa pagpuyo diha sa Barangay"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  onChangeText={(text) => handleYearsStayedChange(text)}
                  defaultValue={yearsstayed}
                />
                <Picker
                  selectedValue={gender}
                  style={styles.PickerContainer}
                  onValueChange={(itemValue, itemIndex) =>
                    handleStructure(itemValue)
                  }>
                  <Picker.Item label="Straktura sa Balay" />
                  <Picker.Item
                    label="Binuhat sa kahoy"
                    value="Binuhat sa kahoy"
                  />
                  <Picker.Item
                    label="Binuhat sa Semento"
                    value="Binuhat sa Semento"
                  />
                  <Picker.Item
                    label="Kombinasyon sa kahoy ug semento"
                    value="Kombinasyon sa kahoy ug semento"
                  />
                  <Picker.Item
                    label="Binuhat sa mga nilabay na materyales sama sa (karton,plastic,etc.)"
                    value="Binuhat sa mga nilabay na materyales sama sa (karton,plastic,etc.)"
                  />
                </Picker>

                <Picker
                  selectedValue={gender}
                  style={styles.PickerContainer}
                  onValueChange={(itemValue, itemIndex) =>
                    handleQualityness(itemValue)
                  }>
                  <Picker.Item label="Kalig-on sa balay" />
                  <Picker.Item label="Huyang" value="Huyang" />
                  <Picker.Item label="Lig-on" value="Lig-on" />
                </Picker>
                <Text style={styles.Titletext}>
                  People living inside the house
                </Text>
                <ScrollView
                  style={{
                    height: 200,
                  }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {PeopleInsidetheHouse.map((item, index) => {
                    return (
                      <TouchableNativeFeedback
                        name={item?.PeopleName}
                        onLongPress={() => handleRemoveItem(item)}
                        onPress={() => {
                          handlePeopleLivingInsideTheHouse(item);
                        }}>
                        <View style={styles.touchablecontainer}>
                          <CardView
                            style={{
                              marginTop: -5,
                            }}
                            radius={1}
                            key={index}>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                              }}>
                              <View
                                style={{
                                  width: '100%',
                                  height: 200,
                                  padding: 20,
                                }}>
                                <Text
                                  numberOfLines={1}
                                  style={styles.peopletext}>
                                  Name: {item?.PeopleName}
                                </Text>
                                <Text
                                  numberOfLines={1}
                                  style={styles.peopletext}>
                                  Age: {item?.PeopleAge}
                                </Text>
                                <Text
                                  numberOfLines={1}
                                  style={styles.peopletext}>
                                  Gender: {item?.Peoplegender}
                                </Text>
                                <Text
                                  numberOfLines={1}
                                  style={styles.peopletext}>
                                  Relationship: {item?.PeopleRelation}
                                </Text>
                                <Text style={styles.peopletext}>
                                  Birthdate: {item?.PeopleBirthdate}
                                </Text>
                                <Text style={styles.peopletext}>
                            Civil Status: {item?.PeopleCivilStatus}
                          </Text>
                          <Text style={styles.peopletext}>
                            Religion: {item?.PeopleReligion}
                          </Text>
                          <Text style={styles.peopletext}>
                            Tribe: {item?.PeopleTribe}
                          </Text>
                          <Text style={styles.peopletext}>
                            Highest Attainment: {item?.PeopleGraduted}
                          </Text>
                          <Text style={styles.peopletext}>
                            Job: {item?.PeopleWork}
                          </Text>
                          <Text style={styles.peopletext}>
                            Monthly Income {item?.PeopleMonthlyIncome}
                          </Text>
                          <Text style={styles.peopletext}>
                            Health Status: {item?.PeopleHealthStatus}
                          </Text>
                              </View>
                            </View>
                          </CardView>
                        </View>
                      </TouchableNativeFeedback>
                    );
                  })}
                </ScrollView>
                <GestureRecognizer
                  onSwipe={(direction, state) => onSwipe(direction, state)}
                  config={config}
                  style={{
                    flex: 1,
                  }}>
                  <CustomBottomSheet
                    isVisible={isVisible}
                    color="white"
                    UI={
                      <ScrollView style={{padding: 10}}>
                        <Input
                          style={styles.textInput}
                          placeholder="Name"
                          inputContainerStyle={styles.inputContainer}
                          inputStyle={styles.inputText}
                          onChangeText={(text) => handlePeopleName(text)}
                          defaultValue={PeopleName}
                        />
                        <Input
                          style={styles.textInput}
                          placeholder="Age"
                          inputContainerStyle={styles.inputContainer}
                          inputStyle={styles.inputText}
                          onChangeText={(text) => handlePeopleAge(text)}
                          defaultValue={PeopleAge}
                        />
                        <Picker
                          selectedValue={Peoplegender}
                          style={styles.PickerContainer}
                          onValueChange={(itemValue, itemIndex) =>
                            handlePeopleGender(itemValue)
                          }>
                          <Picker.Item label="Gender" />
                          <Picker.Item label="Male" value="M" />
                          <Picker.Item label="Female" value="F" />
                        </Picker>
                        <Input
                          style={styles.textInput}
                          placeholder="Relationhip"
                          inputContainerStyle={styles.inputContainer}
                          inputStyle={styles.inputText}
                          onChangeText={(text) => handlePeopleRelation(text)}
                          defaultValue={PeopleRelation}
                        />
                        <Input
                          style={styles.textInput}
                          placeholder="Civil Status"
                          inputContainerStyle={styles.inputContainer}
                          inputStyle={styles.inputText}
                          onChangeText={(text) => handlePeopleCivilStatus(text)}
                          defaultValue={PeopleCivilStatus}
                        />
                        <Input
                          style={styles.textInput}
                          placeholder="Religion"
                          inputContainerStyle={styles.inputContainer}
                          inputStyle={styles.inputText}
                          onChangeText={(text) => handlePeopleReligion(text)}
                          defaultValue={PeopleReligion}
                        />
                        <Input
                          style={styles.textInput}
                          placeholder="Tribe"
                          inputContainerStyle={styles.inputContainer}
                          inputStyle={styles.inputText}
                          onChangeText={(text) => handlePeopleTribe(text)}
                          defaultValue={PeopleTribe}
                        />
                        <Input
                          style={styles.textInput}
                          placeholder="Highest grade/year completed"
                          inputContainerStyle={styles.inputContainer}
                          inputStyle={styles.inputText}
                          onChangeText={(text) => handlePeopleGraduted(text)}
                          defaultValue={PeopleGraduted}
                        />
                        <Input
                          style={styles.textInput}
                          placeholder="Job Description"
                          inputContainerStyle={styles.inputContainer}
                          inputStyle={styles.inputText}
                          onChangeText={(text) => handlePeopleWork(text)}
                          defaultValue={PeopleWork}
                        />
                        <Input
                          style={styles.textInput}
                          placeholder="Monthly Income"
                          inputContainerStyle={styles.inputContainer}
                          inputStyle={styles.inputText}
                          onChangeText={(text) =>
                            handlePeopleMonthlyIncome(text)
                          }
                          defaultValue={PeopleMonthlyIncome}
                        />
                        <Input
                          style={styles.textInput}
                          placeholder="Health Status E.g(pregnant,handicapped,etc.)"
                          inputContainerStyle={styles.inputContainer}
                          inputStyle={styles.inputText}
                          onChangeText={(text) =>
                            handlePeopleHealthStatus(text)
                          }
                          defaultValue={PeopleHealthStatus}
                        />
                        <Button
                          icon={
                            <Icons name="arrow-right" size={20} color="white" />
                          }
                          title="Add People"
                          onPress={() => handlePeopleAdd()}>
                          Add
                        </Button>
                      </ScrollView>
                    }
                  />
                </GestureRecognizer>
                <Button
                  icon={<Icons name="arrow-right" size={20} color="white" />}
                  title="Add People"
                  onPress={() => handleAddPeople()}>
                  Add People
                </Button>
              </View>
            </ProgressStep>
          */}
          </ProgressSteps>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  touchablecontainer: {
    flex: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  text: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    width: '100%',
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: '#fafafaa0',
  },
  peopletext: {
    color: 'black',
    padding: 2,
    fontSize: 16,
    width: '100%',
    textAlign: 'justify',
    backgroundColor: '#fafafaa0',
  },
  avatar: {
    width: 180,
    height: 180,
    borderColor: 'white',
    alignSelf: 'center',
    resizeMode: 'cover',
    flex: 1,
  },
  PickerContainer: {
    flex: 1,
    width: '100%',
    padding: 30,
    height: 70,
  },
  Inputcontainer: {
    flex: 1,
    padding: 30,
    width: '100%',
  },
  Titletext: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 15,
    textAlign: 'justify',
  },
  imagecontainer: {
    flex: 1,
    padding: 30,
    width: '100%',
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SignUpScreen;
