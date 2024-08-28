import {Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/Header';
import SwitchButton from '../../components/SwitchButton';
import {NotificationSettingStyle} from '../../styles/notificationsettingstyle/NotificationSettingStyle';

const data = [
  {
    title: 'Setting 1',
    value: true,
  },
  {
    title: 'Setting 2',
    value: false,
  },
  {
    title: 'Setting 3',
    value: true,
  },
];

const NotificationSettingScreen = () => {
  const [settingList, setSettingList] = useState(data);
  const handleSave = (index,data) => {
    const newSettingList = [...data];
    newSettingList[index].value = !newSettingList[index].value;
    setSettingList(newSettingList);
  };

  return (
    <View style={NotificationSettingStyle.container}>
      <Header
        title={'Notification Settings'}
        rightButton={true}
        rightButtonTitle={'Save'}
      />
      <View style={NotificationSettingStyle.content}>
        {settingList.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleSave(index,settingList)} style={NotificationSettingStyle.row} >
          <Text style={NotificationSettingStyle.title}>
            {item.title}
          </Text>
          <SwitchButton isOn={item.value} onPress={() => handleSave(index,settingList)}/>
        </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default NotificationSettingScreen;
