import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {privacySettingItemStyle} from '../../styles/privacysetting/PrivacySettingItemStyle';
import {Dropdown} from 'react-native-element-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import {Assets, Sizing} from '../../styles';
const PrivacySettingItem = props => {
  const {title, content, status} = props;
  const data = [
    {label: 'Public', value: 'public'},
    {label: 'Private', value: 'private'},
  ];
  const [value, setValue] = useState(data[0].value);
  return (
    <View style={privacySettingItemStyle.container}>
      <View style={privacySettingItemStyle.infContainer}>
        <Feather name={Assets.icon.user} size={Sizing.lg} color="black" />
        <View style={privacySettingItemStyle.contentContainer}>
          <Text style={privacySettingItemStyle.title}>{title}</Text>
          <Text style={privacySettingItemStyle.content}>{content}</Text>
        </View>
      </View>
      <Dropdown
        placeholderStyle={privacySettingItemStyle.dropdownText}
        selectedTextStyle={privacySettingItemStyle.dropdownText}
        data={data}
        labelField="label"
        valueField="value"
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <Feather
            color={'black'}
            name={status == 'public' ? Assets.icon.public : Assets.icon.privacy}
            size={20}
            style={privacySettingItemStyle.icon}
          />
        )}
        style={privacySettingItemStyle.dropdown}
      />
    </View>
  );
};

export default PrivacySettingItem;
