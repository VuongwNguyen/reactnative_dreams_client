import {
  Alert,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Assets} from '../../styles';
import Header from '../../components/Header';
import {SettingStyle} from '../../styles/settingstyle/SettingStyle';
import {stackName} from '../../navigations/screens';
import {AppHeaderStyle} from '../../styles/components/header/HeaderStyle';
import {useDispatch, useSelector} from 'react-redux';
import {APILogout} from '../../store/api/AccountAPI';
import {useSocket} from '../../contexts/SocketContext';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import SwitchButton from '../../components/SwitchButton';

const SettingScreen = props => {
  const {t} = useTranslation();
  const {navigation} = props;
  const dispatch = useDispatch();
  const {userBasicInfData} = useSelector(state => state.userBasicInf);
  const [notiStatus, setNotiStatus] = useState('true');
  const {socket} = useSocket();
  const SettingList = [
    {
      title: t('settingScreen.privacy_safety'),
      icon: Assets.icons.privacy,
      onClick: () => navigation.navigate(stackName.privacySetting.name),
    },
    {
      title: t('settingScreen.language'),
      icon: Assets.icons.translate,
      onClick: () => navigation.navigate(stackName.languageSetting.name),
    },
    {
      title: t('settingScreen.privacyPolicy'),
      icon: Assets.icons.term,
      onClick: () => navigation.navigate(stackName.privacyPolicy.name),
    },
    {
      title: t('settingScreen.password'),
      icon: Assets.icons.password,
      onClick: () => navigation.navigate(stackName.changePassword.name),
    },

    {
      title: t('settingScreen.logout'),
      icon: Assets.icons.logout,
      onClick: () => logout(),
    },
  ];

  const logout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      {
        text: 'cancel',
        style: 'cancel',
      },
      {
        text: 'logout',
        onPress: () =>
          dispatch(APILogout())
            .unwrap()
            .then(res => {
              socket?.disconnect();
              ToastAndroid.show('Logout success', 1000);
              return Promise.all([
                messaging().deleteToken(),
                AsyncStorage.removeItem('credential'),
              ]);
            })
            .then(() => {
              console.log(
                '[SettingScreen] revoke token and remove credential success',
              );
            })
            .catch(err =>
              ToastAndroid.show(
                'Something when wrong. please try again!',
                1000,
              ),
            ),
      },
    ]);
  };

  return (
    <View style={SettingStyle.container}>
      <Header title={t('settingScreen.title')} />
      <View style={SettingStyle.bodyContainer}>
        <TouchableOpacity
          style={SettingStyle.userTag}
          onPress={() => navigation.navigate(stackName.profile.name)}>
          <Image
            source={{
              uri: userBasicInfData?.avatar,
            }}
            style={{
              height: 60,
              width: 60,
              borderRadius: 40,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#d8d8d8',
              paddingBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {userBasicInfData?.fullname}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                }}>
                {userBasicInfData?.email}
              </Text>
            </View>
            <Image
              source={Assets.icons.arrowRight}
              style={{
                height: 20,
                width: 20,
                alignSelf: 'center',
              }}
            />
          </View>
        </TouchableOpacity>
        <View style={SettingStyle.notiRow}>
          <View style={SettingStyle.itemSettingContainer}>
            <Image source={Assets.icons.notification} />
            <Text style={SettingStyle.title}>
              {t('settingScreen.notification')}
            </Text>
          </View>

          <SwitchButton
            isOn={notiStatus}
            onPress={() => {
              setNotiStatus(!notiStatus);
            }}
          />
        </View>
        {SettingList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={SettingStyle.itemSettingContainer}
            onPress={item.onClick}>
            <Image source={item.icon} style={AppHeaderStyle.icon} />
            <Text
              style={[
                SettingStyle.title,
                {
                  color:
                    item.title === t('settingScreen.logout') ? 'red' : 'black',
                },
              ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SettingScreen;
