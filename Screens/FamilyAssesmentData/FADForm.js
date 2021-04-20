import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native-gesture-handler';
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Button,
  Dimensions,
  TouchableNativeFeedback,
  Text,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import SearchableDropdown from 'react-native-searchable-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import {TextInput, Searchbar, Card} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import {Icon, Input} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome';
import CardView from 'react-native-rn-cardview';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import CustomBottomSheet from '../../Plugins/CustomBottomSheet';
import {useDispatch, useSelector} from 'react-redux';
import wait from '../../Plugins/waitinterval';
import {
  action_get_residents_list,
  action_addfamily,
  action_get_FAD_exist,
} from '../../Services/Actions/ResidentsActions';
import CustomAlert from '../../Plugins/CustomAlert';
import CustomSnackBar from '../../Plugins/CustomSnackBar';
import {Actions} from 'react-native-router-flux';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const FADForm = () => {
  const users_reducers = useSelector((state) => state.UserInfoReducers.data);
  const residents_list = useSelector(
    (state) => state.ResidentReducers.residents_list,
  );
  const residents_issuccess = useSelector(
    (state) => state.ResidentReducers.issuccess,
  );
  const residents_data_exist = useSelector(
    (state) => state.ResidentReducers.residents_exist_data,
  );
  const dispatch = useDispatch();
  const [qualityness, setQualityness] = useState('');
  const [Occationfortheland, setOccationfortheland] = useState('');
  const [Occationofthehouse, setOccationofthehouse] = useState('');
  const [submitmessage, setsubmitmessage] = useState('');
  const [isDisabled, setisDisabled] = useState(true);
  const [spinner, setspinner] = useState(false);

  const [relationship, setrelationship] = useState('');
  const [PeopleName, setpeoplename] = useState('');
  const [residentname, setresidentname] = useState('');
  const [peopleid, setpeopleid] = useState('');
  const [showsnackbar, setshowsnackbar] = useState(false);
  const [tickrefresh, settickrefresh] = useState(0);

  const [PeopleInsidetheHouse, setPeopleInsidetheHouse] = useState([]);
  const [ADDPeopleInsidetheHouse, setADDPeopleInsidetheHouse] = useState([]);
  const [fam_member, setfam_member] = useState([]);
  const [fam_member_add, setfam_member_add] = useState([]);
  const [structure, setStructure] = useState('');
  const [yearsstayed, setyearsstayed] = useState('');
  const [Alerttitle, setAlerttitle] = useState('');
  const [Alertmessage, setAlertmessage] = useState('');
  const [Alertshow, setAlertshow] = useState(false);
  const [searchvalue, setsearchvalue] = useState(' ');
  const [InfoError, setInfoError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const handleSubmit = useCallback(async () => {
    setspinner(true);

    await dispatch(
      action_addfamily(
        residents_data_exist[0]?.fam_pk,
        users_reducers.resident_pk,
        Occationofthehouse,
        structure,
        yearsstayed,
        Occationfortheland,
        qualityness,
        fam_member,
      ),
    );
    setspinner(false);
    if (residents_issuccess) {
      alert(
        'Your Application for Family Assesment Data has been submitted successfully',
      );

      wait(1000).then(() => {
        Actions.index();
        setAlertshow(false);
      });
    }
  }, [dispatch, fam_member, residents_issuccess]);

  const handleNextInfo = useCallback(
    async () => {
      setRefreshing(true);
      setPeopleInsidetheHouse([]);
      setfam_member([]);
      setRefreshing(false);
      dispatch(action_get_FAD_exist(users_reducers?.resident_pk));
      residents_data_exist[0]?.fam_members?.map((item) => {
        setPeopleInsidetheHouse((prev) => [
          ...prev,
          {
            PeopleName: item?.first_name + ' ' + item?.last_name,
            realationship: item?.rel,
          },
        ]);
        setfam_member((prev) => [
          ...prev,
          {
            PeopleName: item?.first_name + ' ' + item?.last_name,
            resident_pk: parseInt(item?.resident_pk),
            rel: item?.rel,
          },
        ]);
      });
      if (
        qualityness == undefined ||
        Occationfortheland == undefined ||
        Occationofthehouse == undefined ||
        yearsstayed == undefined ||
        structure == undefined
      ) {
        await setInfoError(true);
        alert('Please Fill All Fields');
      } else {
        await setInfoError(false);
      }
    },
    [
      qualityness,
      Occationfortheland,
      Occationofthehouse,
      yearsstayed,
      structure,
    ],
    [fam_member, PeopleInsidetheHouse, users_reducers?.resident_pk],
  );
  const onChangeSearch = useCallback(
    async (value) => {
      if (value === ' ') {
        await setsearchvalue(null);
      } else {
        await setsearchvalue(value);
        await dispatch(action_get_residents_list(searchvalue));
      }
    },
    [dispatch, searchvalue],
  );
  const handleOccationfortheland = useCallback((value) => {
    setOccationfortheland(value);
  });
  const handleOccationofthehouse = useCallback((value) => {
    setOccationofthehouse(value);
  });
  const handleQualityness = useCallback((value) => {
    setQualityness(value);
  });
  const handleStructure = useCallback((value) => {
    setStructure(value);
  });
  const handleYearsStayedChange = useCallback(
    (text) => {
      setyearsstayed(text);
    },
    [yearsstayed],
  );
  const hadnlePeopleName = useCallback(
    (value) => {
      // const getid = value.split('-')[0].trim();
      // const getname = value.split('-')[1].trim();

      setpeopleid(value.resident_pk);
      setpeoplename(value.first_name + ' ' + value.last_name);
      setresidentname(value.first_name + ' ' + value.last_name);
    },
    [PeopleName],
  );

  const handleRelationShip = useCallback(
    (text) => {
      setrelationship(text);
    },
    [relationship],
  );
  const handlePeopleLivingInsideTheHouse = useCallback((item) => {
    // console.log(item);
  });
  const handlePeopleAdd = useCallback(async () => {
    setIsVisible(false);
    let found = false;

    // if (residents_data_exist !== []) {
    //   ADDPeopleInsidetheHouse.map((item) => {
    //     console.log(item.resident_pk === peopleid + '' + item.resident_pk);
    //     if (item.resident_pk === peopleid) {
    //       found = true;
    //     }
    //   });
    //   if (!found) {
    //     setADDPeopleInsidetheHouse((prev) => [
    //       ...prev,
    //       {
    //         resident_pk: parseInt(peopleid),
    //         PeopleName: residentname,
    //         realationship: relationship,
    //       },
    //     ]);
    //     setfam_member((prev) => [
    //       ...prev,
    //       {resident_pk: parseInt(peopleid), rel: relationship},
    //     ]);
    //   } else {
    //     alert('Resident already exist in the list');
    //   }
    // } else {
    if (relationship === '') {
      await setAlertshow(true);
      await setAlertmessage('Please select relationship of the person');
      await setAlerttitle('Try Again');
      wait(1000).then(() => {
        setAlertshow(false);
      });
    } else {
      PeopleInsidetheHouse.map((item) => {
        // console.log(item.resident_pk === peopleid + '' + item.resident_pk);
        if (item.PeopleName === residentname) {
          found = true;
        }
      });
      if (!found) {
        if (residents_data_exist[0]?.fam_members === '') {
          setPeopleInsidetheHouse((prev) => [
            ...prev,
            {
              resident_pk: parseInt(peopleid),
              PeopleName: residentname,
              realationship: relationship,
            },
          ]);
          setfam_member((prev) => [
            ...prev,
            {
              PeopleName: residentname,
              resident_pk: parseInt(peopleid),
              rel: relationship,
            },
          ]);
        } else {
          setPeopleInsidetheHouse((prev) => [
            ...prev,
            {
              resident_pk: parseInt(peopleid),
              PeopleName: residentname,
              realationship: relationship,
            },
          ]);
          setfam_member((prev) => [
            ...prev,
            {
              PeopleName: residentname,
              resident_pk: parseInt(peopleid),
              rel: relationship,
            },
          ]);
        }
      } else {
        alert('Resident already exist in the list');
      }
    }
    // }
  }, [
    PeopleInsidetheHouse,
    fam_member_add,
    fam_member,
    PeopleName,
    parseInt(peopleid),
    relationship,
  ]);
  const handleAddPeople = useCallback(async () => {
    await setIsVisible(true);
  });

  const [gestureName, setgestureName] = useState('');
  const [list, updateList] = useState(PeopleInsidetheHouse);
  const handleRemoveItem = useCallback(
    (e) => {
      setPeopleInsidetheHouse(
        PeopleInsidetheHouse.filter((item) => item.PeopleName !== e.PeopleName),
      );
      setfam_member(
        fam_member.filter((item) => item.PeopleName !== e.PeopleName),
      );
    },
    [(fam_member, PeopleInsidetheHouse)],
  );
  console.log(fam_member);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPeopleInsidetheHouse([]);
    setfam_member([]);
    setRefreshing(false);
    dispatch(action_get_FAD_exist(users_reducers?.resident_pk));
    residents_data_exist[0]?.fam_members?.map((item) => {
      setPeopleInsidetheHouse((prev) => [
        ...prev,
        {
          PeopleName: item?.first_name + ' ' + item?.last_name,
          realationship: item?.rel,
        },
      ]);
      setfam_member((prev) => [
        ...prev,
        {
          PeopleName: item?.first_name + ' ' + item?.last_name,
          resident_pk: parseInt(item?.resident_pk),
          rel: item?.rel,
        },
      ]);
    });
  }, [dispatch, users_reducers?.resident_pk, PeopleInsidetheHouse, fam_member]);
  useEffect(() => {
    let mounted = true;
    const index = () => {
      dispatch(action_get_FAD_exist(users_reducers?.resident_pk));
    };
    mounted && index();
    return () => (mounted = false);
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const listofresident = async () => {
      if (searchvalue === '') {
        setsearchvalue(null);
      }
      setPeopleInsidetheHouse([]);
      dispatch(action_get_residents_list(searchvalue));

      if (residents_data_exist[0]?.kadugayon_pagpuyo === undefined) {
        setisDisabled(false);
      } else {
        setisDisabled(true);
        setspinner(true);
        setOccationofthehouse(residents_data_exist[0]?.okasyon_balay);
        setOccationfortheland(residents_data_exist[0]?.okasyon_yuta);
        setStructure(residents_data_exist[0]?.straktura);
        setQualityness(residents_data_exist[0]?.kaligon_balay);
        setyearsstayed('' + residents_data_exist[0]?.kadugayon_pagpuyo);

        setspinner(false);
        residents_data_exist[0]?.fam_members?.map((item) => {
          setPeopleInsidetheHouse((prev) => [
            ...prev,
            {
              PeopleName: item?.first_name + ' ' + item?.last_name,
              realationship: item?.rel,
            },
          ]);
          setfam_member((prev) => [
            ...prev,
            {
              PeopleName: item?.first_name + ' ' + item?.last_name,
              resident_pk: parseInt(item?.resident_pk),
              rel: item?.rel,
            },
          ]);
        });
      }
    };
    mounted && listofresident();
    return () => (mounted = false);
  }, [dispatch]);

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
    <ScrollView style={{height: screenHeight}}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.container}>
        <CustomAlert
          title={Alerttitle}
          message={Alertmessage}
          show={Alertshow}
        />
        <View style={{flex: 1, height: screenHeight - 90}}>
          <ProgressSteps>
            <ProgressStep
              label="Information"
              onNext={handleNextInfo}
              errors={InfoError}>
              <View style={styles.Inputcontainer}>
                <TextInput
                  disabled={true}
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="outlined"
                  label="First Name"
                  value={users_reducers.first_name}
                />
                <TextInput
                  disabled={true}
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="outlined"
                  label="Middle Name"
                  value={users_reducers.middle_name}
                />
                <TextInput
                  disabled={true}
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="outlined"
                  label="Last Name"
                  value={users_reducers.last_name}
                />

                <View style={styles.container}>
                  {/* <CardView
                    style={{
                      marginTop: 20,
                      marginBottom: 20,
                      textAlign: 'center',
                      height: 40,
                    }}>
                    <Text style={{textAlign: 'center'}}>
                      Family Assesment Data
                    </Text>
                  </CardView> */}
                  <Picker
                    selectedValue={Occationofthehouse}
                    // value={Occationofthehouse}
                    style={styles.PickerContainer}
                    onValueChange={(itemValue, itemIndex) =>
                      handleOccationofthehouse(itemValue)
                    }>
                    <Picker.Item key={0} label="Okasyon sa balay" />
                    <Picker.Item key={1} label="Tag-iya" value="Tag-iya" />
                    <Picker.Item key={2} label="Renta" value="Renta" />
                    <Picker.Item key={3} label="Boarder" value="Boarder" />
                    <Picker.Item
                      key={4}
                      label="Nangipon ug puyo"
                      value="Nangipon ug puyo"
                    />
                    <Picker.Item
                      key={5}
                      label="Nisumpay ug balay"
                      value="Nisumpay ug balay"
                    />
                  </Picker>
                  <Picker
                    selectedValue={Occationfortheland}
                    style={styles.PickerContainer}
                    onValueChange={(itemValue, itemIndex) =>
                      handleOccationfortheland(itemValue)
                    }>
                    <Picker.Item label="Okasyon sa Yuta" />
                    <Picker.Item
                      key={0}
                      label="Nanag-iya sa yuta"
                      value="Nanag-iya sa yuta"
                    />
                    <Picker.Item
                      key={1}
                      label="Nang arkila sa yuta"
                      value="Nang arkila sa yuta"
                    />
                    <Picker.Item
                      key={2}
                      label="Informal settler"
                      value="Informal settler"
                    />
                    <Picker.Item
                      key={3}
                      label="Tigbantay sa yuta"
                      value="Tigbantay sa yuta"
                    />
                  </Picker>
                  <TextInput
                    disabled={isDisabled}
                    theme={{
                      colors: {
                        primary: '#3eb2fa',
                        background: 'white',
                        underlineColor: 'transparent',
                      },
                    }}
                    keyboardType={'number-pad'}
                    onChangeText={(text) => handleYearsStayedChange(text)}
                    mode="outlined"
                    label="Kadugayon sa pagpuyo diha sa Barangay"
                    value={yearsstayed}
                  />

                  <Picker
                    selectedValue={structure}
                    style={styles.PickerContainer}
                    onValueChange={(itemValue, itemIndex) =>
                      handleStructure(itemValue)
                    }>
                    <Picker.Item label="Straktura sa Balay" />
                    <Picker.Item
                      key={0}
                      label="Binuhat sa kahoy"
                      value="Binuhat sa kahoy"
                    />
                    <Picker.Item
                      key={1}
                      label="Binuhat sa Semento"
                      value="Binuhat sa Semento"
                    />
                    <Picker.Item
                      key={2}
                      label="Kombinasyon sa kahoy ug semento"
                      value="Kombinasyon sa kahoy ug semento"
                    />
                    <Picker.Item
                      key={3}
                      label="Binuhat sa mga nilabay na materyales sama sa (karton,plastic,etc.)"
                      value="Binuhat sa mga nilabay na materyales sama sa (karton,plastic,etc.)"
                    />
                  </Picker>

                  <Picker
                    selectedValue={qualityness}
                    style={styles.PickerContainer}
                    onValueChange={(itemValue, itemIndex) =>
                      handleQualityness(itemValue)
                    }>
                    <Picker.Item key={0} label="Kalig-on sa balay" />
                    <Picker.Item key={1} label="Huyang" value="Huyang" />
                    <Picker.Item key={2} label="Lig-on" value="Lig-on" />
                  </Picker>
                </View>
              </View>
            </ProgressStep>
            <ProgressStep label="Sakop sa Panimalay" onSubmit={handleSubmit}>
              <View style={styles.Inputcontainer}>
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  style={{
                    height: screenHeight - 500,
                    padding: 10,
                    width: '100%',
                  }}
                  showsHorizontalScrollIndicator={false}>
                  {PeopleInsidetheHouse.map((item, index) => {
                    return (
                      <TouchableNativeFeedback
                        key={index}
                        name={item?.PeopleName}
                        onLongPress={() => handleRemoveItem(item)}
                        onPress={() => {
                          handlePeopleLivingInsideTheHouse(item);
                        }}>
                        <View style={styles.touchablecontainer}>
                          <CardView
                            style={{
                              marginTop: -5,
                              height: screenHeight - 720,
                              width: '100%',
                            }}
                            radius={1}>
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
                                  Relasyon: {item?.realationship}
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
                    color="rgba(0.5, 0.25, 0, 0.2)"
                    UI={
                      <View style={{padding: 10, height: screenHeight}}>
                        <View style={{marginBottom: 50, padding: 10}}>
                          {/* // items={residents_list?.map((item, index) => [
                            //   {
                            //     label: item?.first_name,
                            //     value: item?.resident_pk,
                            //   },
                            // ])} */}
                          <Searchbar
                            placeholder="Search Person"
                            onChangeText={onChangeSearch}
                            defaultValue={null}
                            value={searchvalue}
                          />
                          <ScrollView
                            style={{
                              marginBottom: 10,
                              padding: 5,
                              height: screenHeight - 600,
                            }}>
                            <SafeAreaView>
                              {residents_list.map((item, index) => (
                                <TouchableHighlight
                                  key={index}
                                  onPress={() => hadnlePeopleName(item)}
                                  ker={item.first_name}
                                  underlayColor="white">
                                  <CardView
                                    style={{
                                      textAlign: 'center',
                                      height: 40,

                                      padding: 5,
                                    }}>
                                    <Text
                                      styles={{
                                        height: screenHeight,

                                        padding: 5,
                                      }}>
                                      {item.first_name + ' ' + item.last_name}
                                    </Text>
                                  </CardView>
                                </TouchableHighlight>
                              ))}
                            </SafeAreaView>
                          </ScrollView>

                          <Text
                            styles={{
                              textAlign: 'center',
                              fontWeight: 'bold',
                              fontSize: 14,
                              padding: 5,
                            }}>
                            Selected Person: {residentname}
                          </Text>

                          {/* <Picker
                            selectedValue={PeopleName}
                            style={styles.PickerContainer}
                            onValueChange={(itemValue, itemIndex) =>
                              hadnlePeopleName(itemValue)
                            }>
                            <Picker.Item label="Pangalan" />
                            {residents_list.map((item, index) => (
                              <Picker.Item
                                key={index}
                                label={item.first_name + ' ' + item.last_name}
                                value={
                                  item.resident_pk +
                                  ' - ' +
                                  item.first_name +
                                  ' ' +
                                  item.last_name
                                }
                              />
                            ))}
                          </Picker> */}

                          {/* <DropDownPicker
                            items={residents_list.map((item, index) => [
                              {
                                value:
                                  item?.resident_pk +
                                  ' - ' +
                                  item?.first_name +
                                  ' ' +
                                  item?.last_name,
                                label: item?.first_name + ' ' + item?.last_name,
                              },
                            ])}
                            defaultValue={PeopleName}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa'}}
                            itemStyle={{
                              justifyContent: 'flex-start',
                            }}
                            searchable={true}
                            searchableError={() => <Text>Not Found</Text>}
                            searchablePlaceholder="Search Name"
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={(item) => console.log(item)}
                            onSearch={(text) => {
                              // Example
                              console.log(text);
                            }}
                          /> */}

                          <Picker
                            selectedValue={relationship}
                            style={styles.PickerContainer}
                            onValueChange={(itemValue, itemIndex) =>
                              handleRelationShip(itemValue)
                            }>
                            <Picker.Item label="Relasyon" />
                            <Picker.Item label="asawa" value="asawa" />
                            <Picker.Item label="bana" value="bana" />
                            <Picker.Item label="anak" value="anak" />
                            <Picker.Item label="igsuon" value="igsuon" />
                            <Picker.Item label="asawa" value="asawa" />
                            <Picker.Item label="inahan" value="inahan" />
                          </Picker>

                          <Button
                            icon={
                              <Icons
                                name="arrow-right"
                                size={20}
                                color="white"
                              />
                            }
                            title="Add to family"
                            onPress={() => handlePeopleAdd()}
                          />
                        </View>
                      </View>
                    }
                  />
                </GestureRecognizer>

                <Button
                  icon={<Icons name="arrow-right" size={20} color="white" />}
                  title="Add family members"
                  onPress={() => handleAddPeople()}>
                  Add People
                </Button>
              </View>
            </ProgressStep>
          </ProgressSteps>
        </View>
      </View>
      <>
        <CustomSnackBar show={showsnackbar} message={submitmessage} />
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    flex: 1,
    width: '100%',
    height: 300,
  },
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
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default FADForm;
