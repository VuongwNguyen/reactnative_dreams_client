import {Text, View, ScrollView} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import AppHeader from '../../components/Header';
import {Assets} from '../../styles';

import {privacySettingStyle} from '../../styles/privacysetting/PrivacySettingStyle';
import PrivacySettingItem from './PrivacySettingItem';
const privacyArr = [
  {
    icon: Assets.icons.user,
    title: 'title',
    content: 'content',
    status: 'private',
  },
  {
    icon: Assets.icons.user,
    title: 'title',
    content: 'content',
    status: 'public',
  },
  {
    icon: Assets.icons.user,
    title: 'title',
    content: 'content',
    status: 'public',
  },
  {
    icon: Assets.icons.user,
    title: 'title',
    content: 'content',
    status: 'public',
  },
  {
    icon: Assets.icons.user,
    title: 'title',
    content: 'content',
    status: 'private',
  },
  {
    icon: Assets.icons.user,
    title: 'title',
    content: 'content',
    status: 'public',
  },
  {
    icon: Assets.icons.user,
    title: 'title',
    content: 'content',
    status: 'public',
  },
  {
    icon: Assets.icons.user,
    title: 'title',
    content: 'content',
    status: 'public',
  },
];

const showPrivacyItem = () => {
  return (
    <View style={privacySettingStyle.infBox}>
      {privacyArr.map((item, index) => (
        <PrivacySettingItem
          key={index}
          title={item.title}
          content={item.content}
          status={item.status}
        />
      ))}
    </View>
  );
};

const PrivacySettingScreen = () => {
  const {t} = useTranslation();

  const goBackScreen = () => {};
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={privacySettingStyle.scrollContainer}>
      <View style={privacySettingStyle.container}>
        <AppHeader
          title={t('privacySettingScreen.title')}
          goBack={goBackScreen}
        />

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
