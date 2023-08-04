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
  ImageBackground,
} from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import Spinner from 'react-native-loading-spinner-overlay';
import {CheckBox} from 'react-native-elements';
import {HelperText} from 'react-native-paper';
import SearchableDropdown from 'react-native-searchable-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import {TextInput, Searchbar} from 'react-native-paper';
import {Card} from 'react-native-elements';
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
  action_updatefamily,
  action_get_FAD_form,
  action_set_reset,
} from '../../Services/Actions/ResidentsActions';
import CustomAlert from '../../Plugins/CustomAlert';
import CustomSnackBar from '../../Plugins/CustomSnackBar';
import {Actions} from 'react-native-router-flux';
import styles from './style';
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
  const resident_form = useSelector(
    (state) => state.ResidentReducers.resident_form,
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

  const [waterconnection, setwaterconnection] = useState([]);
  const [waterconnectionsaver, setwaterconnectionsaver] = useState([]);

  const [hasComfortRoom, sethasComfortRoom] = useState([]);
  const [hasComfortRoomsaver, sethasComfortRoomsaver] = useState([]);

  const [hasLightConnection, sethasLightConnection] = useState([]);
  const [hasLightConnectionsaver, sethasLightConnectionsaver] = useState([]);

  const [wastemanagement, setwastemanagement] = useState([]);
  const [wastemanagementsaver, setwastemanagementsaver] = useState([]);

  const [victimofabuse, setvictimofabuse] = useState([]);
  const [victimofabusesaver, setvictimofabusesaver] = useState([]);

  const [serbisyo, setserbisyo] = useState([]);
  const [serbisyosaver, setserbisyosaver] = useState([]);

  const [skilltraining, setskilltraining] = useState('');
  const [daycareservice, setdaycareservice] = useState('');
  const [Employment, setEmployment] = useState('');
  const [medicalngatabang, setmedicalngatabang] = useState('');
  const [lingap, setlingap] = useState('');
  const [houseing, sethouseing] = useState('');
  const [fourps, setfourps] = useState('');
  const [livelihood, setlivelihood] = useState('');
  const [financial, setfinancial] = useState('');
  const [scholarship, setscholarship] = useState('');

  const [kahimtangsakomunidad, setkahimtangsakomunidad] = useState([]);
  const [kahimtangsakomunidadsaver, setkahimtangsakomunidadsaver] = useState(
    [],
  );

  const [checked, setChecked] = useState({});

  const [checkedwaterconnection, setCheckedWaterConnection] = useState({});
  const [checkedkasilyas, setCheckedKasilyas] = useState({});
  const [checkedkuryente, setCheckedKuryente] = useState({});
  const [checkedbasura, setCheckedBasura] = useState({});
  const [checkedpangabuso, setCheckedPangabuso] = useState({});
  const [checkedserbisyo, setCheckSerbisyo] = useState({});
  const kahimtangsakomunidadcheck = [
    {
      label: 'kawad-on/kulang sa panginabuhian',
      value: 'kawad-on/kulang sa panginabuhian',
    },
    {
      label: 'Walay Igong o layo sa eskewlahan',
      value: 'Walay Igong o layo sa eskewlahan',
    },
    {
      label: 'Presensya sa mga nagkalin-laing krimen/bisyo o pang-abuso',
      value: 'Presensya sa mga nagkalin-laing krimen/bisyo o pang-abuso',
    },
    {
      label: 'Walay maayong agianan/kanal sa tubig',
      value: 'Walay maayong agianan/kanal sa tubig',
    },
    {label: 'Demolisyon', value: 'Demolisyon'},
    {
      label: 'Kulang sa Pasilidad sa Kuryente',
      value: 'Kulang sa Pasilidad sa Kuryente',
    },
    {
      label: 'Kulang sa Pasilidad sa Tubig',
      value: 'Kulang sa Pasilidad sa Tubig',
    },
    {
      label: 'Kulang sa Pasilidad sa Balay Tamabalanan',
      value: 'Kulang sa Pasilidad sa Balay Tamabalanan',
    },
    {label: 'Dulaana sa mga bata', value: 'Dulaana sa mga bata'},
  ];

  const waterconnectionchecked = [
    {label: 'Walay connection sa tubig', value: 'Walay connection sa tubig'},
    {label: 'bomba', value: 'bomba'},
    {label: 'Ulan', value: 'Ulan'},
    {label: 'Barangay Water Work', value: 'Barangay Water Work'},
    {label: 'Tubod', value: 'Tubod'},
    {label: 'balon', value: 'balon'},
    {label: 'DCWD', value: 'DCWD'},
  ];

  const Kasilyaschecked = [
    {label: 'Walay Kasilyas', value: 'Walay Kasilyas'},
    {label: 'Antipolo', value: 'Antipolo'},
    {label: 'Buhos', value: 'Buhos'},
    {label: 'Water-Seated', value: 'Water-Seated'},
  ];

  const kuryentechecked = [
    {label: 'Walay Koneksyon', value: 'Walay Koneksyon'},
    {label: 'Lamapara (gas)', value: 'Lamapara (gas)'},
    {label: 'Kandila', value: 'Kandila'},
    {label: 'Petromaks', value: 'Petromaks'},
    {label: 'Davao Light', value: 'Davao Light'},
  ];

  const basuracheckedf = [
    {
      label: 'Ginalain ang Mabulok ug dili mabulok',
      value: 'Ginalain ang Mabulok ug dili mabulok',
    },
    {
      label: 'Gikolekta sa CENRO or Barangay',
      value: 'Gikolekta sa CENRO or Barangay',
    },
    {label: 'Ginalubong', value: 'Ginalubong'},
    {label: 'Ginalabay', value: 'Ginalabay'},
  ];

  const pangabusocheked = [
    {label: 'Gibeya-an', value: 'Gibeya-an'},
    {label: 'Pangulata', value: 'Pangulata'},
    {
      label: 'Ginabaligya/Illegal Rekroter',
      value: 'Ginabaligya/Illegal Rekroter',
    },
    {label: 'Krime', value: 'Krime'},
    {label: 'Droga', value: 'Droga'},
  ];

  const serbisyochecked = [
    {label: 'Scholarship', value: 'Scholarship'},
    {label: 'Livelihood', value: 'Livelihood'},
    {label: 'Housing', value: 'Housing'},
    {label: 'Financial', value: 'Financial'},
    {label: 'Lingap', value: 'Lingap'},
    {label: 'Medical nga tabang', value: 'Medical nga tabang'},
    {label: 'Day Care Service', value: 'Day Care Service'},
    {label: 'Skill Training', value: 'Skill Training'},
    {label: 'Employment', value: 'Employment'},
  ];
  const handleSubmit = useCallback(async () => {
    setspinner(true);

    if (residents_data_exist?.data.length > 0) {
      dispatch(
        action_updatefamily(
          residents_data_exist?.data[0]?.fam_pk,
          users_reducers.resident_pk,
          Occationofthehouse,
          structure,
          yearsstayed,
          Occationfortheland,
          qualityness,
          waterconnectionsaver,
          hasComfortRoomsaver,
          hasLightConnectionsaver,
          wastemanagementsaver,
          kahimtangsakomunidadsaver,
          victimofabusesaver,
          serbisyosaver,
          fam_member,
        ),
      );
      // setspinner(false);
      // if (await residents_issuccess) {
      //   alert(
      //     'Your Application for Family Assesment Data has been submitted successfully',
      //   );

      //   setspinner(false);
      //   wait(1000).then(() => {
      //     Actions.index();
      //     setAlertshow(false);
      //   });
      // }
    } else if (!residents_data_exist?.data.length > 0) {
      dispatch(
        action_addfamily(
          users_reducers.resident_pk,
          Occationofthehouse,
          structure,
          yearsstayed,
          Occationfortheland,
          qualityness,
          waterconnectionsaver,
          hasComfortRoomsaver,
          hasLightConnectionsaver,
          wastemanagementsaver,
          kahimtangsakomunidadsaver,
          victimofabusesaver,
          serbisyosaver,
          fam_member,
        ),
      );
      // if (residents_issuccess) {
      //   alert(
      //     'Your Application for Family Assesment Data has been submitted successfully',
      //   );

      //   setspinner(false);
      //   wait(1000).then(() => {
      //     Actions.index();
      //     setAlertshow(false);
      //   });
      // }
    }
  }, [
    dispatch,
    fam_member,
    residents_issuccess,
    serbisyosaver,
    victimofabusesaver,
    kahimtangsakomunidadsaver,
    wastemanagementsaver,
    hasLightConnectionsaver,
    hasComfortRoomsaver,
    waterconnectionsaver,
    users_reducers.resident_pk,
    residents_data_exist?.data,
  ]);
  useEffect(() => {
    let mounted = true;
    const getifsuccesssubmit = () => {
      if (mounted) {
        if (residents_issuccess) {
          alert(
            'Your Application for Family Assesment Data has been submitted successfully',
          );

          setspinner(false);
          wait(1000).then(() => {
            Actions.index();
            setAlertshow(false);
          });
          dispatch(action_set_reset(false));
        }
      }
    };
    mounted && getifsuccesssubmit();
    return () => {
      mounted = false;
    };
  }, [dispatch, residents_issuccess]);
  const handleSecondInfo = useCallback(async () => {}, []);
  const handleThirdInfo = useCallback(async () => {
    await setInfoError(false);
  }, []);
  const handleFourthInfo = useCallback(async () => {
    await setInfoError(false);
  }, []);
  const handleNextInfo = useCallback(async () => {
    // setRefreshing(true);
    setPeopleInsidetheHouse([]);
    setfam_member([]);
    // setRefreshing(false);
    // dispatch(action_get_FAD_exist(users_reducers?.resident_pk));

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
  }, [
    qualityness,
    Occationfortheland,
    Occationofthehouse,
    yearsstayed,
    structure,
  ]);

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

  const handleCheckBoxKahitang = useCallback(
    async (selection, item) => {
      let mounted = true;
      let found = false;
      if (mounted) {
        {
          kahimtangsakomunidad.map((items) => {
            if (items.label === item.label) {
              setkahimtangsakomunidad(
                kahimtangsakomunidad.filter(
                  (item) => item.label !== items.label,
                ),
              );
              setkahimtangsakomunidadsaver(
                kahimtangsakomunidadsaver.filter(
                  (item) => item !== items.label,
                ),
              );
              found = true;
            }
          });
        }
        if (!found) {
          await setkahimtangsakomunidad((prev) => [
            ...prev,
            {label: item.label, value: item.label},
          ]);
          await setkahimtangsakomunidadsaver((prev) => [...prev, item.label]);
        }
      }
      return () => {
        mounted = false;
      };
    },
    [kahimtangsakomunidad],
  );

  const handleCheckBoxwaterConntection = useCallback(
    async (selections, item) => {
      let mounted = true;
      let found = false;
      if (mounted) {
        {
          waterconnection.map((items) => {
            if (items.label === item.label) {
              setwaterconnection(
                waterconnection.filter((item) => item.label !== items.label),
              );
              setwaterconnectionsaver(
                waterconnectionsaver.filter((item) => item !== items.label),
              );
              found = true;
            }
          });
        }
        if (!found) {
          await setwaterconnection((prev) => [
            ...prev,
            {label: item.label, value: item.label},
          ]);
          await setwaterconnectionsaver((prev) => [...prev, item.label]);
        }
      }
      return () => {
        mounted = false;
      };
    },
    [waterconnection],
  );
  const handleCheckBoxKasilyas = useCallback(
    async (selection, item) => {
      let mounted = true;
      let found = false;
      if (mounted) {
        {
          hasComfortRoom.map((items) => {
            if (items.label === item.label) {
              sethasComfortRoom(
                hasComfortRoom.filter((item) => item.label !== items.label),
              );
              sethasComfortRoomsaver(
                hasComfortRoomsaver.filter((item) => item !== items.label),
              );
              found = true;
            }
          });
        }
        if (!found) {
          await sethasComfortRoom((prev) => [
            ...prev,
            {label: item.label, value: item.label},
          ]);
          await sethasComfortRoomsaver((prev) => [...prev, item.label]);
        }
      }
      return () => {
        mounted = false;
      };
    },
    [hasComfortRoom],
  );

  const handleCheckBoxKuryente = useCallback(
    async (selection, item) => {
      let mounted = true;
      let found = false;
      if (mounted) {
        {
          hasLightConnection.map((items) => {
            if (items.label === item.label) {
              sethasLightConnection(
                hasLightConnection.filter((item) => item.label !== items.label),
              );
              sethasLightConnectionsaver(
                hasLightConnectionsaver.filter((item) => item !== items.label),
              );
              found = true;
            }
          });
        }
        if (!found) {
          await sethasLightConnection((prev) => [
            ...prev,
            {label: item.label, value: item.label},
          ]);
          await sethasLightConnectionsaver((prev) => [...prev, item.label]);
        }
      }
      return () => {
        mounted = false;
      };
    },
    [hasLightConnection],
  );

  const handleCheckBoxBasura = useCallback(
    async (selection, item) => {
      let mounted = true;
      let found = false;
      if (mounted) {
        {
          wastemanagement.map((items) => {
            if (items.label === item.label) {
              setwastemanagement(
                wastemanagement.filter((item) => item.label !== items.label),
              );
              setwastemanagementsaver(
                wastemanagementsaver.filter((item) => item !== items.label),
              );
              found = true;
            }
          });
        }
        if (!found) {
          await setwastemanagement((prev) => [
            ...prev,
            {label: item.label, value: item.label},
          ]);
          await setwastemanagementsaver((prev) => [...prev, item.label]);
        }
      }
      return () => {
        mounted = false;
      };
    },
    [wastemanagement],
  );

  const handleCheckBoxPangabuso = useCallback(
    async (selection, item) => {
      let mounted = true;
      let found = false;
      if (mounted) {
        {
          victimofabuse.map((items) => {
            if (items.label === item.label) {
              setvictimofabuse(
                victimofabuse.filter((item) => item.label !== items.label),
              );
              setvictimofabusesaver(
                victimofabusesaver.filter((item) => item !== items.label),
              );
              found = true;
            }
          });
        }
        if (!found) {
          await setvictimofabuse((prev) => [
            ...prev,
            {label: item.label, value: item.label},
          ]);
          await setvictimofabusesaver((prev) => [...prev, item.label]);
        }
      }
      return () => {
        mounted = false;
      };
    },
    [victimofabuse],
  );

  const handleCheckBoxSerbisyo = useCallback(
    async (selection, item) => {
      let mounted = true;
      let found = false;
      let agency = 'TBD';
      if (mounted) {
        {
          serbisyo.map((items) => {
            if (items.label === item.label) {
              setserbisyo(
                serbisyo.filter((item) => item.label !== items.label),
              );
              setserbisyosaver(
                serbisyosaver.filter((item) => item.programa !== items.label),
              );
              found = true;
            }
          });
        }
        if (!found) {
          if (item.label === 'Scholarship') {
            agency = scholarship;
          } else if (item.label === 'Livelihood') {
            agency = livelihood;
          } else if (item.label === 'Housing') {
            agency = houseing;
          } else if (item.label === 'Financial') {
            agency = financial;
          } else if (item.label === 'Lingap') {
            agency = lingap;
          } else if (item.label === 'Medical nga Tabang') {
            agency = medicalngatabang;
          } else if (item.label === 'Day Care Service') {
            agency = daycareservice;
          } else if (item.label === 'Skill Training') {
            agency = skilltraining;
          } else if (item.label === 'Employment') {
            agency = Employment;
          } else {
            agency = 'TBD';
          }
          await setserbisyo((prev) => [
            ...prev,
            {label: item.label, value: item.label},
          ]);
          await setserbisyosaver((prev) => [
            ...prev,
            {programa: item.label, ahensya: agency},
          ]);
        }
      }
      return () => {
        mounted = false;
      };
    },
    [serbisyo],
  );
  console.log(serbisyosaver);
  const handleOccationfortheland = useCallback((value) => {
    setOccationfortheland(value);
  });

  // const handlehasComfortRoom = useCallback((value) => {
  //   sethasComfortRoom(value);
  // }, []);

  // const handlekahimtangsakomunidad = useCallback((value) => {
  //   setkahimtangsakomunidad(value);
  // }, []);

  // const handlewastemanagement = useCallback((value) => {
  //   setwastemanagement(value);
  // }, []);

  // const handlevictimofabuse = useCallback((value) => {
  //   setvictimofabuse(value);
  // }, []);

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
        if (residents_data_exist?.data[0]?.fam_members === '') {
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
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPeopleInsidetheHouse([]);
    setfam_member([]);
    setRefreshing(false);
    dispatch(action_get_FAD_exist(users_reducers?.resident_pk));
    residents_data_exist?.data[0]?.fam_members?.map((item) => {
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

    const listofresident = async () => {
      if (mounted) {
        setspinner(true);
        await setwaterconnection([]);
        await setwaterconnectionsaver([]);

        await sethasLightConnection([]);
        await sethasLightConnectionsaver([]);

        await sethasComfortRoom([]);
        await sethasComfortRoomsaver([]);

        await setwastemanagement([]);
        await setwastemanagementsaver([]);

        await setvictimofabuse([]);
        await setvictimofabusesaver([]);

        await setkahimtangsakomunidad([]);
        await setkahimtangsakomunidadsaver([]);

        await setserbisyo([]);
        await setserbisyosaver([]);

        await setCheckedWaterConnection({});

        if (searchvalue === '') {
          await setsearchvalue(null);
        }
        await setPeopleInsidetheHouse([]);
        await dispatch(action_get_residents_list(searchvalue));

        if (residents_data_exist?.data[0]?.kadugayon_pagpuyo === undefined) {
          setspinner(false);
          setisDisabled(false);
        } else {
          await setisDisabled(true);
          setspinner(true);
          if (residents_data_exist?.loading) {
            await setOccationofthehouse(
              residents_data_exist?.data[0].okasyon_balay,
            );
            await setOccationfortheland(
              residents_data_exist?.data[0].okasyon_yuta,
            );
            await setStructure(residents_data_exist?.data[0].straktura);
            await setQualityness(residents_data_exist?.data[0].kaligon_balay);
            await setyearsstayed(
              '' + residents_data_exist?.data[0].kadugayon_pagpuyo,
            );

            await resident_form?.data?.tinubdan_tubig?.map((item) => {
              // const isChecked = checkedwaterconnection[item];
              // setCheckedWaterConnection({...checkedwaterconnection,[item] :!isChecked})
              setwaterconnection((prev) => [
                ...prev,
                {label: item, value: item},
              ]);
              setwaterconnectionsaver((prev) => [...prev, item]);
            });
            resident_form?.data?.pasilidad_kuryente?.map((item) => {
              sethasLightConnection((prev) => [
                ...prev,
                {label: item, value: item},
              ]);
              sethasLightConnectionsaver((prev) => [...prev, item]);
            });
            resident_form?.data?.matang_kasilyas?.map((item) => {
              sethasComfortRoom((prev) => [
                ...prev,
                {label: item, value: item},
              ]);
              sethasComfortRoomsaver((prev) => [...prev, item]);
            });
            resident_form?.data?.matang_basura?.map((item) => {
              setwastemanagement((prev) => [
                ...prev,
                {label: item, value: item},
              ]);
              setwastemanagementsaver((prev) => [...prev, item]);
            });
            resident_form?.data?.biktima_pangabuso?.map((item) => {
              setvictimofabuse((prev) => [...prev, {label: item, value: item}]);
              setvictimofabusesaver((prev) => [...prev, item]);
            });

            resident_form?.data?.kahimtanang_komunidad?.map((item) => {
              setkahimtangsakomunidad((prev) => [
                ...prev,
                {label: item, value: item},
              ]);
              setkahimtangsakomunidadsaver((prev) => [...prev, item]);
            });

            resident_form?.data?.serbisyo_nadawat?.map((item) => {
              let agency = '';
              if (item.programa === 'Scholarship') {
                setscholarship(item.ahensya);
              } else if (item.programa === 'Livelihood') {
                setlivelihood(item.ahensya);
              } else if (item.programa === 'Housing') {
                sethouseing(item.ahensya);
              } else if (item.programa === 'Financial') {
                setfinancial(item.ahensya);
              } else if (item.programa === 'Lingap') {
                setlingap(item.ahensya);
              } else if (item.programa === 'Medical nga Tabang') {
                setmedicalngatabang(item.ahensya);
              } else if (item.programa === 'Day Care Service') {
                setdaycareservice(item.ahensya);
              } else if (item.programa === 'Skill Training') {
                setskilltraining(item.ahensya);
              } else if (item.programa === 'Employment') {
                setEmployment(item.ahensya);
              }
              setserbisyo((prev) => [
                ...prev,
                {label: item.programa, value: item.programa},
              ]);
              setserbisyosaver((prev) => [
                ...prev,
                {programa: item.programa, ahensya: item.ahensya},
              ]);
            });

            // await sethasLightConnection(
            //   residents_data_exist?.data[0]?.pasilidad_kuryente,
            // );
            // await sethasComfortRoom(
            //   residents_data_exist?.data[0]?.matang_kasilyas,
            // );
            // await setwastemanagement(
            //   residents_data_exist?.data[0]?.matang_basura,
            // );
            // await setvictimofabuse(
            //   residents_data_exist?.data[0]?.biktima_pangabuso,
            // );
            // await setkahimtangsakomunidad(
            //   residents_data_exist?.data[0]?.kahimtang_komunidad,
            // );

            await setspinner(false);
            await residents_data_exist?.data[0]?.fam_members?.map((item) => {
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
            setspinner(false);
          }
        }
      }
    };
    mounted && listofresident();
    return () => {
      mounted = false;
    };
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
    // <ImageBackground
    // style={{flex: 1}}
    // source={require('../../assets/background/bgImage.jpg')}
    // resizeMode="cover"
    // blurRadius={20}>
    // <Card containerStyle={styles.plate}>
    <Card containerStyle={styles.plate}>
      <ScrollView style={{height: screenHeight}} nestedScrollEnabled={true}>
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
            <ProgressSteps
              labelFontSize={8}
              activeLabelColor="#623256"
              activeStepNumColor="#623256"
              activeStepIconBorderColor="#623256"
              completedProgressBarColor="#623256"
              completedLabelColor="#623256"
              completedStepNumColor="#623256"
              completedStepIconColor="#623256">
              <ProgressStep
                nextBtnTextStyle={styles.buttonStyle}
                previousBtnTextStyle={styles.buttonStyle}
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
                    mode="flat"
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
                    mode="flat"
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
                    mode="flat"
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
                      mode="flat"
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
              <ProgressStep
                label="Ikaduhang bahin"
                nextBtnTextStyle={styles.buttonStyle}
                previousBtnTextStyle={styles.buttonStyle}
                onNext={handleSecondInfo}
                errors={InfoError}>
                <ScrollView style={styles.Inputcontainer}>
                  <Text
                    style={{
                      color: '#623256',
                      fontWeight: '700',
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                    Tinubdan sa Tubig
                  </Text>
                  <SelectMultiple
                    items={waterconnectionchecked}
                    selectedItems={waterconnection}
                    onSelectionsChange={(selections, item) =>
                      handleCheckBoxwaterConntection(selections, item)
                    }
                  />

                  <Text
                    style={{
                      color: '#623256',
                      fontWeight: '700',
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                    Matang sa Kasilyas
                  </Text>
                  <SelectMultiple
                    items={Kasilyaschecked}
                    selectedItems={hasComfortRoom}
                    onSelectionsChange={(selections, item) =>
                      handleCheckBoxKasilyas(selections, item)
                    }
                  />

                  <Text
                    style={{
                      color: '#623256',
                      fontWeight: '700',
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                    Pasilidad sa Kuryente
                  </Text>
                  <SelectMultiple
                    items={kuryentechecked}
                    selectedItems={hasLightConnection}
                    onSelectionsChange={(selections, item) =>
                      handleCheckBoxKuryente(selections, item)
                    }
                  />

                  <Text
                    style={{
                      color: '#623256',
                      fontWeight: '700',
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                    Matang sa Panghipos sa Basura
                  </Text>
                  <SelectMultiple
                    items={basuracheckedf}
                    selectedItems={wastemanagement}
                    onSelectionsChange={(selections, item) =>
                      handleCheckBoxBasura(selections, item)
                    }
                  />

                  <Text
                    style={{
                      color: '#623256',
                      fontWeight: '700',
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                    Biktima sa Pang Abuso
                  </Text>
                  <SelectMultiple
                    items={pangabusocheked}
                    selectedItems={victimofabuse}
                    onSelectionsChange={(selections, item) =>
                      handleCheckBoxPangabuso(selections, item)
                    }
                  />
                </ScrollView>
              </ProgressStep>
              <ProgressStep
                label="Ikatulong bahin"
                nextBtnTextStyle={styles.buttonStyle}
                previousBtnTextStyle={styles.buttonStyle}
                onNext={handleThirdInfo}
                errors={InfoError}>
                <SelectMultiple
                  items={kahimtangsakomunidadcheck}
                  selectedItems={kahimtangsakomunidad}
                  onSelectionsChange={(selections, item) =>
                    handleCheckBoxKahitang(selections, item)
                  }
                />
              </ProgressStep>
              <ProgressStep
                label="Ikaupat bahin"
                nextBtnTextStyle={styles.buttonStyle}
                previousBtnTextStyle={styles.buttonStyle}
                onNext={handleFourthInfo}
                errors={InfoError}>
                <Text
                  style={{
                    color: '#623256',
                    fontWeight: '700',
                    fontSize: 14,
                    textAlign: 'left',
                  }}>
                  Note: Palihug ug sulat daan sa ahensya bag.o i tuplok ang
                  serbisyo
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        color: '#623256',
                        fontWeight: '700',
                        fontSize: 14,
                        textAlign: 'center',
                      }}>
                      Serbisyo
                    </Text>
                    <SelectMultiple
                      items={serbisyochecked}
                      selectedItems={serbisyo}
                      onSelectionsChange={(selections, item) =>
                        handleCheckBoxSerbisyo(selections, item)
                      }
                    />
                  </View>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        color: '#623256',
                        fontWeight: '700',
                        fontSize: 14,
                        textAlign: 'center',
                      }}>
                      Ahensya
                    </Text>
                    <TextInput
                      style={{height: 55}}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      onChangeText={(text) => setscholarship(text)}
                      label="Scholarship"
                      value={scholarship}
                    />
                    <TextInput
                      style={{height: 55}}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      onChangeText={(text) => setlivelihood(text)}
                      label="Livelihood"
                      value={livelihood}
                    />
                    <TextInput
                      style={{height: 55}}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      onChangeText={(text) => sethouseing(text)}
                      label="Housing"
                      value={houseing}
                    />
                    <TextInput
                      style={{height: 55}}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      onChangeText={(text) => setfinancial(text)}
                      label="Financial"
                      value={financial}
                    />
                    <TextInput
                      style={{height: 55}}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      onChangeText={(text) => setlingap(text)}
                      label="Lingap"
                      value={lingap}
                    />
                    <TextInput
                      style={{height: 55}}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      onChangeText={(text) => setmedicalngatabang(text)}
                      label="Medical nga Tabang"
                      value={medicalngatabang}
                    />
                    <TextInput
                      style={{height: 55}}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      onChangeText={(text) => setdaycareservice(text)}
                      label="Day Care Service"
                      value={daycareservice}
                    />
                    <TextInput
                      style={{height: 55}}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      onChangeText={(text) => setskilltraining(text)}
                      label="Skill Training"
                      value={skilltraining}
                    />
                    <TextInput
                      style={{height: 55}}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      onChangeText={(text) => setEmployment(text)}
                      label="Employment"
                      value={Employment}
                    />
                  </View>
                </View>
              </ProgressStep>
              <ProgressStep
                nextBtnTextStyle={styles.buttonStyle}
                previousBtnTextStyle={styles.buttonStyle}
                label="Sakop sa Panimalay"
                onSubmit={() => handleSubmit()}>
                <View style={styles.Inputcontainer}>
                  <ScrollView
                    nestedScrollEnabled={true}
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
                              nestedScrollEnabled={true}
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
                                    underlayColor="#623256">
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
                                  color="#623256"
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
                    icon={
                      <Icons name="arrow-right" size={20} color="#623256" />
                    }
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
    </Card>
    // </ImageBackground>
  );
};

export default FADForm;
