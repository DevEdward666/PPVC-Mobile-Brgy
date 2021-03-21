import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {ActionSheetIOS} from 'react-native';
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  ButtonGroup,
  Badge,
  Icon,
  withBadge,
} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import CardView from 'react-native-rn-cardview';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import wait from '../../Plugins/waitinterval';
import {
  action_get_news,
  action_get_news_comments,
  action_set_news_reactions,
  action_get_news_add_comment,
} from '../../Services/Actions/NewsActions';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
const UINews = () => {
  const news_reducers = useSelector((state) => state.NewsReducers.data);
  const base_url = useSelector((state) => state.NewsReducers.base_url);
  const [offset, setoffset] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [news_id, setnews_id] = useState('');

  const [spinner, setSpinner] = useState(false);
  const dispatch = useDispatch();

  // const news_reducers_url = useSelector((state) => state.News_Reducers.url);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
      dispatch(action_get_news());
    });
  }, [dispatch]);
  useEffect(() => {
    setSpinner(true);
    setInterval(() => {
      setSpinner(false);
    }, 1000);
    dispatch(action_get_news());
  }, [dispatch]);
  const loadmore = async () => {
    setSpinner(true);
    setInterval(() => {
      setSpinner(false);
    }, 1000);
    setoffset((prev) => prev + 10);
    await dispatch(action_get_news());
  };
  const gotonewsinfo = async (item) => {
    await AsyncStorage.setItem('news_id', item.news_pk.toString());

    Actions.newsinfo();
  };
  const updateIndex = useCallback(
    (item, index) => {
      setnews_id(item?.news_pk);
      dispatch(action_get_news_comments(item?.news_pk));
      if (index !== 0) {
        setisVisible(true);
      } else {
        dispatch(action_set_news_reactions(item?.news_pk, 'Like'));
        dispatch(action_get_news());
      }
    },
    [dispatch],
  );
  console.log(news_reducers[0]?.upload_files[0]?.file_path);
  const component1 = () => {
    return (
      <>
        <Text>
          <Icons name="thumbs-up" size={15} color="grey" /> Like
        </Text>
      </>
    );
  };
  const component2 = () => {
    return (
      <Text>
        <Icons name="comment" size={15} color="grey" /> Comment
      </Text>
    );
  };
  const buttons = [{element: component1}, {element: component2}];
  return (
    <SafeAreaView style={styles.flatlistcontainer}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
        data={news_reducers}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadmore}
        onEndReachedThreshold={0.1}
        renderItem={({item, index}) => (
          <TouchableHighlight
            onPress={() => gotonewsinfo(item)}
            underlayColor="white">
            <CardView
              style={{marginTop: -5}}
              radius={1}
              backgroundColor={'#ffffff'}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 300,
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={{
                    uri: `${base_url}/${item[index]?.upload_files[index]?.file_path}`,
                  }}
                  // source={{
                  //   uri:
                  //     'http://192.168.1.4:4050/src/Storage/Files/News/1613828094461images%20(2).jfif',
                  // }}
                  style={{
                    width: '100%',
                    height: '100%',
                    flex: 1,
                    resizeMode: 'cover',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                    }}>
                    <Text numberOfLines={6} style={styles.text}>
                      {item.title}
                      {'\n'}
                      {'\n'}
                      {item.body}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  height: 30,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                  }}>
                  <View style={{width: 30, marginBottom: -20, marginStart: 20}}>
                    <Icons name="thumbs-up" size={15} color="grey" />
                  </View>
                  <View style={{width: 80}}>
                    <Badge status="primary" value={item?.likes} />
                  </View>
                </View>
              </View>
              <ButtonGroup
                onPress={(index) => updateIndex(item, index)}
                buttons={buttons}
                containerStyle={{height: 35, marginBottom: 15}}
              />
            </CardView>
          </TouchableHighlight>
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    width: '100%',
  },

  text: {
    color: 'white',
    fontSize: 14,
    padding: 15,
    textAlign: 'justify',
    backgroundColor: '#000000a0',
  },
  flatlistcontainer: {
    backgroundColor: '#fafafa',
    flex: 1,
    paddingTop: 10,
  },
  flatlistitem: {
    marginStart: 30,
    fontSize: 14,
    fontFamily: 'Open-Sans',
    height: 10,
  },
  flatlistitemappointmentno: {
    marginStart: 30,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Open-Sans',
    height: 20,
  },
});
export default UINews;
