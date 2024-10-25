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
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { InfomationTabStyle } from '../../styles/profileStyle/InformationTabStyle';
import Animated from 'react-native-reanimated';
import { APIGetInfList } from '../../store/api/InfAPI';
import { Assets } from '../../styles';

const InfomationTab = props => {
  const { scrollHandler, user_id_view } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [infAPI, setInfAPI] = useState('');
  const [infData, setInfData] = useState('');

  const infUI = [
    { key: 'gender', title: t('profileScreen.infomationTab.gender') },
    { key: 'dob', title: t('profileScreen.infomationTab.dob') },
    { key: 'natl', title: t('profileScreen.infomationTab.natl') },
    { key: 'htown', title: t('profileScreen.infomationTab.htown') },
    { key: 'zone', title: t('profileScreen.infomationTab.zone') },
    { key: 'job', title: t('profileScreen.infomationTab.job') },
    { key: 'edu', title: t('profileScreen.infomationTab.edu') },
    { key: 'zodiac', title: t('profileScreen.infomationTab.zodiac') },
    { key: 'hobby', title: t('profileScreen.infomationTab.hobby') },
    { key: 'rlts', title: t('profileScreen.infomationTab.rlts') },
  ];

  useFocusEffect(
    React.useCallback(() => {
      dispatch(APIGetInfList(user_id_view))
        .unwrap()
        .then(res => {
          setInfAPI(res?.data?.infomation);
        })
        .catch(err => {
          ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });
    }, [user_id_view]),
  );

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
