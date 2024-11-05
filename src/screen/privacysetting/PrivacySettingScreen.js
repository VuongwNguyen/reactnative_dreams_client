import {Text, View, ScrollView, ToastAndroid} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import AppHeader from '../../components/Header';
import {privacySettingStyle} from '../../styles/privacysetting/PrivacySettingStyle';
import PrivacySettingItem from './PrivacySettingItem';
import {APIGetInfList} from '../../store/api/InfAPI';
import {Assets} from '../../styles';

const PrivacySettingScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [infData, setInfData] = useState('');
  const [data, setData] = useState([]);
  const privacyArr = [
    {key: 'nick', title: t('profileScreen.infomationTab.nick')},
    {key: 'dob', title: t('profileScreen.infomationTab.dob')},
    {key: 'gender', title: t('profileScreen.infomationTab.gender')},
    {key: 'natl', title: t('profileScreen.infomationTab.natl')},
    {key: 'htown', title: t('profileScreen.infomationTab.htown')},
    {key: 'des', title: t('profileScreen.infomationTab.des')},
    {key: 'zone', title: t('profileScreen.infomationTab.zone')},
    {key: 'job', title: t('profileScreen.infomationTab.job')},
    {key: 'edu', title: t('profileScreen.infomationTab.edu')},
    {key: 'zodiac', title: t('profileScreen.infomationTab.zodiac')},
    {key: 'hobby', title: t('profileScreen.infomationTab.hobby')},
    {key: 'rlts', title: t('profileScreen.infomationTab.rlts')},
  ];

  useEffect(() => {
    dispatch(APIGetInfList())
      .unwrap()
      .then(res => {
        setInfData(res?.data?.infomation);
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  }, []);

  useEffect(() => {
    if (!!infData) {
      const infArr = privacyArr.map(item => {
        const apiItem = infData.find(apiItem => apiItem.key === item.key);
        return {
          ...item,
          ...apiItem,
        };
      });
      setData(infArr);
    }
  }, [infData]);

  const showPrivacyItem = () => {
    return (
      <View style={privacySettingStyle.infBox}>
        {data.map((item, index) => (
          <PrivacySettingItem
            key={index}
            title={item.title}
            icon={Assets.icons[item.key]}
            status={item.privacy_status ? item.privacy_status : 'public'}
            infKey={item.key}
          />
        ))}
      </View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={privacySettingStyle.scrollContainer}>
      <View style={privacySettingStyle.container}>
        <AppHeader title={t('privacySettingScreen.title')} />

        <View style={privacySettingStyle.bodyContainer}>
          <Text style={privacySettingStyle.desc}>
            {t('privacySettingScreen.desc')}
          </Text>
          {showPrivacyItem()}
        </View>
      </View>
    </ScrollView>
  );
};

export default PrivacySettingScreen;
