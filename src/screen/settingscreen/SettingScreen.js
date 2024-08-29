import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Assets } from '../../styles'
import Header from '../../components/Header'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import SwitchButton from '../../components/SwitchButton';
import { SettingStyle } from '../../styles/settingstyle/SettingStyle';

const LIGHT = 'light'
const DARK = 'dark'
const SettingScreen = () => {
  const [currentThemeMode, setCurrentThemeMode] = useState(LIGHT)
  return (
    <View style={SettingStyle.container}>
      <Header title="Settings"/>
      <TouchableOpacity style={SettingStyle.itemSettingContainer}>
        <FontAwesome6 name={Assets.icon.privacy} size={20} color={'black'} />
        <Text style={SettingStyle.title}>Privacy & Safety</Text>
      </TouchableOpacity>
      <TouchableOpacity style={SettingStyle.itemSettingContainer}>
        <FontAwesome6 name={Assets.icon.notification} size={20} color={'black'} />
        <Text style={SettingStyle.title}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={SettingStyle.itemSettingContainer}>
        <MaterialCommunityIcons name={Assets.icon.translate} size={20} color={'black'} />
        <Text style={SettingStyle.title}>Language</Text>
      </TouchableOpacity>
      <TouchableOpacity style={SettingStyle.itemSettingContainer}>
        <FontAwesome6 name={Assets.icon.notification} size={20} color={'black'} />
        <Text style={SettingStyle.title}>Privacy Policy</Text>
      </TouchableOpacity>
      <View style={SettingStyle.line}/>
      <TouchableOpacity style={SettingStyle.itemSettingContainer} onPress={() => setCurrentThemeMode(currentThemeMode === LIGHT ? DARK : LIGHT)}>
        <MaterialCommunityIcons name={Assets.icon.theme} size={20} color={'black'} />
        <Text style={SettingStyle.title}>Switch to dark mode</Text>
        <SwitchButton isOn={currentThemeMode === DARK} onPress={() => setCurrentThemeMode(currentThemeMode === LIGHT ? DARK : LIGHT)}/>
      </TouchableOpacity>
      <TouchableOpacity style={SettingStyle.itemSettingContainer}>
        <Feather name={Assets.icon.logout} size={20} color={'red'} />
        <Text style={SettingStyle.titleRed}>Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SettingScreen