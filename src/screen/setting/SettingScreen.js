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

const LIGHT = 'light';
const DARK = 'dark';
const SettingScreen = props => {
  const {navigation} = props;
  const [currentThemeMode, setCurrentThemeMode] = useState(LIGHT);
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.account);
  const {socket} = useSocket();

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
      <Header title="Settings" />
      <TouchableOpacity
        style={SettingStyle.itemSettingContainer}
        onPress={() => {
          navigation.navigate(stackName.privacySetting.name);
        }}>
        <Image source={Assets.icons.privacy} style={AppHeaderStyle.icon} />
        <Text style={SettingStyle.title}>Privacy & Safety</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={SettingStyle.itemSettingContainer}
        onPress={() => {
          navigation.navigate(stackName.notificationSetting.name);
        }}>
        <Image
          source={Assets.icons.notification}
          style={{width: 20, height: 20}}
        />
        <Text style={SettingStyle.title}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={SettingStyle.itemSettingContainer}
        onPress={() => {
          navigation.navigate(stackName.languageSetting.name);
        }}>
        <Image
          source={Assets.icons.translate}
          style={{width: 20, height: 20}}
        />
        <Text style={SettingStyle.title}>Language</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={SettingStyle.itemSettingContainer}
        onPress={() => {
          navigation.navigate(stackName.privacyPolicy.name);
        }}>
        <Image
          source={Assets.icons.notification}
          style={{width: 20, height: 20}}
        />
        <Text style={SettingStyle.title}>Privacy Policy</Text>
      </TouchableOpacity>
      <View style={SettingStyle.line} />
      <TouchableOpacity
        style={SettingStyle.itemSettingContainer}
        onPress={() => {
          navigation.navigate(stackName.changePassword.name);
        }}>
        <Image
          source={Assets.icons.notification}
          style={{width: 20, height: 20}}
        />
        <Text style={SettingStyle.title}>Change password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={loading}
        style={SettingStyle.itemSettingContainer}
        onPress={logout}>
        <Image source={Assets.icons.logout} style={{width: 20, height: 20}} />
        <Text style={SettingStyle.titleRed}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingScreen;
