import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Assets} from '../../styles';
import Header from '../../components/Header';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import SwitchButton from '../../components/SwitchButton';
import {SettingStyle} from '../../styles/settingstyle/SettingStyle';
import {stackName} from '../../navigations/screens';

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
        <FontAwesome6 name={Assets.icon.privacy} size={20} color={'black'} />
        <Text style={SettingStyle.title}>Privacy & Safety</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={SettingStyle.itemSettingContainer}
        onPress={() => {
          navigation.navigate(stackName.notificationSetting.name);
        }}>
        <FontAwesome6
          name={Assets.icon.notification}
          size={20}
          color={'black'}
        />
        <Text style={SettingStyle.title}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={SettingStyle.itemSettingContainer}
        onPress={() => {
          navigation.navigate(stackName.languageSetting.name);
        }}>
        <MaterialCommunityIcons
          name={Assets.icon.translate}
          size={20}
          color={'black'}
        />
        <Text style={SettingStyle.title}>Language</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={SettingStyle.itemSettingContainer}
        onPress={() => {
          navigation.navigate(stackName.privacyPolicy.name);
        }}>
        <FontAwesome6
          name={Assets.icon.notification}
          size={20}
          color={'black'}
        />
        <Text style={SettingStyle.title}>Privacy Policy</Text>
      </TouchableOpacity>
      <View style={SettingStyle.line} />
      {/* <TouchableOpacity
        style={SettingStyle.itemSettingContainer}
        onPress={() =>
          setCurrentThemeMode(currentThemeMode === LIGHT ? DARK : LIGHT)
        }>
        <MaterialCommunityIcons
          name={Assets.icon.theme}
          size={20}
          color={'black'}
        />
        <Text style={SettingStyle.title}>Switch to dark mode</Text>
        <SwitchButton
          isOn={currentThemeMode === DARK}
          onPress={() =>
            setCurrentThemeMode(currentThemeMode === LIGHT ? DARK : LIGHT)
          }
        />

      </TouchableOpacity> */}
          <TouchableOpacity
        style={SettingStyle.itemSettingContainer}
        onPress={() => {
          navigation.navigate(stackName.changePassword.name);
        }}>
        <FontAwesome6
          name={Assets.icon.notification}
          size={20}
          color={'black'}
        />
        <Text style={SettingStyle.title}>Change password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={SettingStyle.itemSettingContainer}>
        <Feather name={Assets.icon.logout} size={20} color={'red'} />
        <Text style={SettingStyle.titleRed}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingScreen;
