import {
  FlatList,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { InfomationTabStyle } from '../../styles/profileStyle/InformationTabStyle';
import Animated from 'react-native-reanimated';
import { APIGetInfList } from '../../store/api/InfAPI';
import { Assets } from '../../styles';

const InfomationTab = props => {
  const { scrollHandler, user_id_view } = props;
  const dispatch = useDispatch();

  const [infAPI, setInfAPI] = useState('');
  const [infData, setInfData] = useState('');

  const data = [
    {
      id: 1,
      title: 'Title',
      content: 'Content',
      icon: 'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
    },
    {
      id: 2,
      title: 'Title',
      content: 'Content',
      icon: 'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
    },
    {
      id: 3,
      title: 'Title',
      content: 'Content',
      icon: 'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
    },
    {
      id: 4,
      title: 'Title',
      content: 'Content',
      icon: 'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
    },
    {
      id: 5,
      title: 'Title',
      content: 'Content',
      icon: 'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
    },
    {
      id: 6,
      title: 'Title',
      content: 'Content',
      icon: 'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
    },
    {
      id: 7,
      title: 'Title',
      content: 'Content',
      icon: 'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
    },
    {
      id: 8,
      title: 'Title',
      content: 'Content',
      icon: 'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
    },
  ];
  const infUI = [
    { key: 'gender', title: 'Gender' },
    { key: 'dob', title: 'Day of birth' },
    { key: 'natl', title: 'Nationality' },
    { key: 'htown', title: 'Hometown' },
    { key: 'zone', title: 'Location' },
    { key: 'job', title: 'Job' },
    { key: 'edu', title: 'Education' },
    { key: 'zodiac', title: 'Zodiac' },
    { key: 'hobby', title: 'Hobby' },
    { key: 'rlts', title: 'Relationship status' },
  ];
  useEffect(() => {
    dispatch(APIGetInfList(user_id_view))
      .unwrap()
      .then(res => {
        setInfAPI(res?.data?.infomation);
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  }, []);

  useEffect(() => {
    if (infAPI.length !== 0) {
      const mergedArr = infUI.map(uiItem => {
        const apiItem = infAPI.find(apiItem => apiItem.key === uiItem.key);
        return {
          ...uiItem,
          ...apiItem,
        };
      });
      setInfData(mergedArr);
    }
  }, [infAPI]);

  const renderItem = ({ item }) => {
    if (!item.value) return null;
    if (item.privacy_status == 'private') return null;
    return (
      <View style={InfomationTabStyle.itemContainer}>
        <Image
          style={InfomationTabStyle.icon}
          source={Assets.icons[item.key]}
        />
        <Text style={InfomationTabStyle.title}>{item.title}</Text>
        <Text style={InfomationTabStyle.value}>{item.value}</Text>
      </View>
    );
  };

  return (
    <View style={InfomationTabStyle.container}>
      {!!infData ? (
        <Animated.FlatList
          onScroll={scrollHandler}
          data={infData}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
      ) : (
        <Text style={InfomationTabStyle.placeholder}>
          Thông tin đang ở chế độ riêng tư
        </Text>
      )}
    </View>
  );
};

export default InfomationTab;