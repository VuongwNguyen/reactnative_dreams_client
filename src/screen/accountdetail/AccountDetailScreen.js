import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import React from 'react';
import {accountDetailStyle} from '../../styles/accountdetail/AccountDetailStyle';
import {useTranslation} from 'react-i18next';
import AppHeader from '../../components/Header';
import TagInf from './TagInf';
import {Assets} from '../../styles';
const basicInfArr = [
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
];
const otherInfArr = [
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
];
const showBasicInf = () => {
  return (
    <View style={accountDetailStyle.infBox}>
      {basicInfArr.map((item, index) => (
        <TagInf
          key={index}
          tagTitle={item.title}
          content={item.content}
          icon={item.icon}
        />
      ))}
    </View>
  );
};

const showOtherInf = () => {
  return (
    <View style={accountDetailStyle.infBox}>
      {otherInfArr.map((item, index) => (
        <TagInf
          key={index}
          tagTitle={item.title}
          content={item.content}
          icon={item.icon}
        />
      ))}
    </View>
  );
};

const AccountDetailScreen = () => {
  const {t} = useTranslation();

  const goBackScreen = () => {};
  const onSave = () => {};
  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <View style={accountDetailStyle.container}>
        <AppHeader
          title={t('accountDetailScreen.infTitle')}
          goBack={goBackScreen}
        />

        <View style={accountDetailStyle.bodyContainer}>
          <View style={accountDetailStyle.avtContainer}>
            <Image source={Assets.image.avt} style={accountDetailStyle.avt} />
            <TouchableOpacity style={accountDetailStyle.changeAvtButton}>
              <Image source={Assets.image.ic_change} />
            </TouchableOpacity>
          </View>

          <View style={accountDetailStyle.groupInfContainer}>
            <Text style={accountDetailStyle.typeInf}>
              {t('accountDetailScreen.basic')}
            </Text>
            {showBasicInf()}
          </View>
          <View style={accountDetailStyle.groupInfContainer}>
            <Text style={accountDetailStyle.typeInf}>
              {t('accountDetailScreen.other')}
            </Text>
            {showOtherInf()}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountDetailScreen;
