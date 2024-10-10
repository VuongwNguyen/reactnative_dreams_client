import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Assets} from '../../styles';
import Header from '../../components/Header';
import {SettingStyle} from '../../styles/settingstyle/SettingStyle';
import {stackName} from '../../navigations/screens';
import {AppHeaderStyle} from '../../styles/components/header/HeaderStyle';

const LIGHT = 'light';
const DARK = 'dark';
const SettingScreen = props => {
  const {navigation} = props;
  const [currentThemeMode, setCurrentThemeMode] = useState(LIGHT);
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
      <TouchableOpacity style={SettingStyle.itemSettingContainer}>
        <Image source={Assets.icons.logout} style={{width: 20, height: 20}} />
        <Text style={SettingStyle.titleRed}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingScreen;
